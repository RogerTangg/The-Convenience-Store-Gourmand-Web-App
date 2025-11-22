
import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

export const GeneratingPage: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  const messages = [
    "主廚正在審視微波爐的瓦數...",
    "正在計算茶葉蛋的裂痕美學...",
    "正在挑選最優雅的塑膠湯匙...",
    "正在解構御飯糰的海苔...",
    "正在尋找保存期限最完美的泡麵...",
    "正在擺盤...",
    "正在為醬包剪出完美的開口..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] animate-fade-in text-center px-4">
      <div className="relative mb-12">
        {/* Outer Ring */}
        <div className="w-32 h-32 rounded-full border border-white/10 animate-[spin_10s_linear_infinite]"></div>
        
        {/* Inner Spinner */}
        <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-12 h-12 text-gold animate-spin" />
        </div>

        {/* Decorative Particles */}
        <div className="absolute top-0 left-1/2 w-1 h-1 bg-gold rounded-full animate-ping"></div>
      </div>

      <h2 className="font-serif text-3xl text-white mb-6 tracking-wide">
        {messages[messageIndex]}
      </h2>
      
      <p className="text-gold/50 text-xs uppercase tracking-[0.3em] animate-pulse">
        Preparing Your Michelin Experience
      </p>

      <div className="mt-12 w-64 h-[1px] bg-white/10 relative overflow-hidden">
        <div className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-transparent via-gold to-transparent animate-[translateX_1.5s_ease-in-out_infinite] transform -translate-x-full"></div>
      </div>
    </div>
  );
};
