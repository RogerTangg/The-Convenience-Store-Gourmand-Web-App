
interface MenuRequest {
    budget: number;
    store: string;
    style: string;
}

interface Ingredient {
    name: string;
    price: number;
    notes?: string;
}

interface MenuData {
    title: string;
    description: string;
    ingredients: Ingredient[];
    plating_guide: string[];
    total_price: number;
    chef_comment: string;
}

// CORS headers
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        // Get API key from environment (secure server-side storage)
        let apiKey = Deno.env.get('GEMINI_API_KEY');
        if (!apiKey) {
            console.error("Missing GEMINI_API_KEY");
            throw new Error('GEMINI_API_KEY not configured');
        }

        // Sanitize API key (remove whitespace/newlines that cause URL errors)
        apiKey = apiKey.trim();

        // Parse request body
        let body;
        try {
            body = await req.json();
        } catch (e) {
            console.error("Failed to parse request body:", e);
            return new Response(JSON.stringify({ error: 'Invalid JSON body' }), { status: 400, headers: corsHeaders });
        }

        const { budget, store, style } = body as MenuRequest;

        // Input validation
        if (!budget || budget < 50 || budget > 500) {
            return new Response(
                JSON.stringify({ error: '預算必須在 50-500 TWD 之間' }),
                {
                    status: 400,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                }
            );
        }

        if (!store || !style) {
            return new Response(
                JSON.stringify({ error: '商店和風格為必填欄位' }),
                {
                    status: 400,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                }
            );
        }

        const prompt = `
      You are a pretentious, avant-garde Michelin-star chef who specializes in "Convenience Store Fine Dining". 
      Your task is to take a budget of ${budget} TWD and create a high-end, multi-course (or single exquisite dish) menu using ONLY items available at ${store} in Taiwan.
      
      The style must be: ${style}.
      
      Requirements:
      1. **Title**: Create a concise, poetic, and minimalist title (MUST be under 15 characters). It should sound extremely high-end and mysterious (e.g., "時間之河的凝視", "深夜的虛無主義"). Do NOT make it long.
      2. **Description**: Write a sensory-evoking, flowery description that makes cheap food sound luxurious. Use words like "essence", "foam", "reduction", "textures".
      3. **Ingredients**: List real items found in Taiwan convenience stores with estimated prices. The total must be close to or under ${budget} TWD.
      4. **Plating Guide**: Break down the plating process into 4-6 distinct, actionable steps. Return them as a list of strings. Instructions should be detailed on how to arrange the food to look like fine dining (e.g., "Smear the sauce with the back of a plastic spoon").
      5. **Chef's Comment**: A short, slightly arrogant but encouraging remark.
      
      Response MUST be in Traditional Chinese (Taiwan).
    `;

        // Call Gemini API directly using fetch
        // Use v1beta API with correct model name: gemini-1.5-flash (without -latest suffix)
        const modelId = "gemini-1.5-flash";
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${apiKey}`;

        // Log URL (masked) for debugging
        console.log(`Calling Gemini API: ${url.replace(apiKey, '***')}`);

        const payload = {
            contents: [{
                parts: [{ text: prompt }]
            }],
            generationConfig: {
                temperature: 1.0,
                topP: 0.95,
                topK: 40,
                maxOutputTokens: 8192,
                responseMimeType: "application/json",
                responseSchema: {
                    type: "OBJECT",
                    properties: {
                        title: { type: "STRING" },
                        description: { type: "STRING" },
                        ingredients: {
                            type: "ARRAY",
                            items: {
                                type: "OBJECT",
                                properties: {
                                    name: { type: "STRING" },
                                    price: { type: "NUMBER" },
                                    notes: { type: "STRING" }
                                }
                            }
                        },
                        plating_guide: {
                            type: "ARRAY",
                            items: { type: "STRING" }
                        },
                        total_price: { type: "NUMBER" },
                        chef_comment: { type: "STRING" }
                    },
                    required: ["title", "description", "ingredients", "plating_guide", "total_price", "chef_comment"]
                }
            }
        };

        const apiResponse = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!apiResponse.ok) {
            const errorText = await apiResponse.text();
            console.error("Gemini API Error:", errorText);
            throw new Error(`Gemini API returned ${apiResponse.status}: ${errorText}`);
        }

        const result = await apiResponse.json();

        // Extract text from Gemini response structure
        // Structure: candidates[0].content.parts[0].text
        const responseText = result.candidates?.[0]?.content?.parts?.[0]?.text;

        if (responseText) {
            try {
                const menuData = JSON.parse(responseText) as MenuData;

                return new Response(
                    JSON.stringify(menuData),
                    {
                        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                    }
                );
            } catch (parseError) {
                console.error("JSON parsing failed:", parseError);
                throw new Error("無法解析 API 回應");
            }
        }

        throw new Error("API 未回傳有效資料");

    } catch (error) {
        console.error("Edge Function error:", error);

        return new Response(
            JSON.stringify({
                error: '菜單生成失敗，請稍後再試',
                message: error instanceof Error ? error.message : '未知錯誤'
            }),
            {
                status: 500,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
        );
    }
});
