
import { supabase } from "./supabaseClient";
import { UserConfig, MenuData } from "../types";

export const generateMenu = async (config: UserConfig): Promise<MenuData> => {
  try {
    console.log("Sending request with config:", config);

    // Call Supabase Edge Function instead of direct Gemini API
    const { data, error } = await supabase.functions.invoke('generate-menu', {
      body: {
        budget: config.budget,
        store: config.store,
        style: config.style
      }
    });

    if (error) {
      console.error("Supabase Function error:", error);
      throw new Error("廚房現在有點忙亂，請稍後再試。");
    }

    if (!data) {
      throw new Error("廚師拒絕烹飪。");
    }

    console.log("Received menu data:", data);

    // Return the menu data
    return data as MenuData;

  } catch (err) {
    console.error("Menu generation failed:", err);
    if (err instanceof Error) {
      throw err;
    }
    throw new Error("無法生成菜單，請稍後再試。");
  }
};
