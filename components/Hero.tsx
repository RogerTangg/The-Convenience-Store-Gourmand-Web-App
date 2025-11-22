
import React from 'react';
import { Button } from './Button';
import { ChefHat } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] text-center px-6 relative overflow-hidden z-10">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none opacity-30">
        <div className="absolute top-[10%] left-[20%] w-64 h-64 bg-gold/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[20%] w-96 h-96 bg-store-seven/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="space-y-10 max-w-5xl mx-auto mt-10">
        <div className="flex justify-center mb-8 opacity-80">
           <ChefHat className="w-16 h-16 md:w-24 md:h-24 text-gold animate-fade-in" strokeWidth={0.8} />
        </div>
        
        <div className="space-y-6 animate-slide-up">
          <h2 className="font-sans text-gold/80 text-xs md:text-sm tracking-[0.4em] uppercase font-medium">
            Fine Dining Reimagined
          </h2>
          <h1 className="font-serif text-5xl md:text-8xl font-medium text-white tracking-tight leading-[1.1]">
            <span className="block">超商米其林</span>
            <span className="block text-gold italic bg-clip-text text-transparent bg-gradient-to-b from-gold-light via-gold to-gold-dim text-4xl md:text-7xl mt-2">
              The Convenience Store Gourmand
            </span>
          </h1>
          <p className="font-serif text-lg md:text-2xl text-gray-300 mt-6 font-light tracking-wide">
            將平價微波食品，昇華為星級餐飲體驗
          </p>
        </div>
      </div>

      <div className="mt-16 max-w-4xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <p className="font-sans text-gray-400 text-sm md:text-base leading-loose border-y border-white/10 py-8 px-4 italic whitespace-nowrap overflow-hidden text-ellipsis">
          <span className="not-italic text-gold pr-2 text-xl">“</span>
          只要有微波爐，人人都能成為食神。在這裡，我們不談性價比，只談擺盤與儀式感。
          <span className="not-italic text-gold pl-2 text-xl">”</span>
        </p>
      </div>

      <div className="pt-16 animate-slide-up" style={{ animationDelay: '0.4s' }}>
        <Button onClick={onStart} className="text-sm md:text-base px-12 py-4 tracking-[0.2em] font-medium">
          開始您的饗宴
        </Button>
      </div>
    </div>
  );
};
