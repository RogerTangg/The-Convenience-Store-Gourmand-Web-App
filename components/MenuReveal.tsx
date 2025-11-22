
import React, { useRef, useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import { Button } from './Button';
import { RefreshCcw, Quote } from 'lucide-react';

export const MenuReveal: React.FC = () => {
  const { currentMenu, setView } = useAppStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  if (!currentMenu) return null;

  return (
    <div ref={scrollRef} className="max-w-7xl mx-auto w-full px-4 py-8 md:py-12 animate-slide-up pb-24">
      
      <div className="text-center mb-8 md:mb-12 animate-fade-in">
        <span className="text-gold/70 text-xs uppercase tracking-[0.4em] font-medium">Your Course is Served</span>
      </div>

      {/* The Menu Card - Horizontal Layout */}
      <div className="bg-[#0c0c0c] relative overflow-hidden shadow-[0_0_100px_rgba(212,175,55,0.1)] border border-white/5">
        
        {/* Paper Texture Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.03] pointer-events-none"></div>
        
        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[800px]">
            
            {/* LEFT COLUMN: The Concept */}
            <div className="relative p-8 md:p-16 border-b lg:border-b-0 lg:border-r border-gold/20 flex flex-col justify-between bg-gradient-to-br from-[#0f0f0f] to-black">
                {/* Corner Accents */}
                <div className="absolute top-4 left-4 w-3 h-3 border-t border-l border-gold/60"></div>
                <div className="absolute bottom-4 right-4 w-3 h-3 border-b border-r border-gold/60"></div>

                <div>
                    <h3 className="font-sans text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-8">
                        Le Menu Dégustation
                    </h3>
                    <h1 className="font-serif text-4xl md:text-5xl font-bold leading-relaxed text-gold mb-8 drop-shadow-sm tracking-wide text-balance">
                        {currentMenu.title}
                    </h1>
                    
                    <div className="h-[1px] w-12 bg-gold/30 mb-8"></div>

                    <p className="font-serif text-lg md:text-xl text-gray-200 leading-loose font-light tracking-wider">
                        {currentMenu.description}
                    </p>
                </div>

                <div className="mt-12 lg:mt-24 relative">
                    <div className="absolute -top-4 -left-2 text-6xl text-white/5 font-serif">“</div>
                    <p className="font-serif italic text-gray-400 text-base leading-loose pl-6 border-l border-gold/20">
                        {currentMenu.chef_comment}
                    </p>
                    <div className="mt-4 pl-6 font-sans text-[10px] uppercase tracking-[0.2em] text-gold/40">
                        - The Executive AI Chef
                    </div>
                </div>
            </div>


            {/* RIGHT COLUMN: The Execution */}
            <div className="relative p-8 md:p-16 bg-[#0a0a0a]">
                 {/* Corner Accents */}
                 <div className="absolute top-4 right-4 w-3 h-3 border-t border-r border-gold/60"></div>
                 <div className="absolute bottom-4 left-4 w-3 h-3 border-b border-l border-gold/60"></div>

                {/* Ingredients */}
                <div className="mb-12">
                    <h4 className="font-sans text-xs uppercase tracking-[0.2em] text-gold/80 mb-6 font-bold flex items-center gap-3">
                        <div className="h-[1px] w-6 bg-gold/30"></div>
                        食材 (Ingredients)
                    </h4>
                    <ul className="space-y-3 font-serif text-gray-300">
                        {currentMenu.ingredients.map((item, idx) => (
                            <li key={idx} className="flex items-baseline justify-between group border-b border-white/5 pb-2">
                                <span className="text-gray-300 group-hover:text-gold transition-colors tracking-wide">{item.name}</span>
                                <span className="text-sm text-gray-500 font-sans tabular-nums">${item.price}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-6 text-right">
                        <span className="font-serif text-xl text-white border-b border-gold/30 pb-1">
                            Total: ${currentMenu.total_price}
                        </span>
                    </div>
                </div>

                {/* Plating Guide */}
                <div>
                    <h4 className="font-sans text-xs uppercase tracking-[0.2em] text-gold/80 mb-10 font-bold flex items-center gap-3">
                        <div className="h-[1px] w-6 bg-gold/30"></div>
                        擺盤儀式 (The Ritual)
                    </h4>
                    <div className="space-y-8">
                        {currentMenu.plating_guide.map((step, i) => (
                            <div key={i} className="relative pl-6 group">
                                {/* Vertical Line */}
                                <div className="absolute left-0 top-2 bottom-0 w-[1px] bg-white/10 group-last:bg-transparent"></div>
                                
                                {/* Number Indicator */}
                                <div className="absolute -left-[5px] top-0 w-3 h-3 rounded-full border border-gold bg-[#0a0a0a] flex items-center justify-center">
                                    <div className="w-1 h-1 bg-gold rounded-full"></div>
                                </div>

                                <h5 className="font-sans text-[10px] text-gold uppercase tracking-widest mb-2 opacity-80">Step {i + 1}</h5>
                                <p className="font-serif text-lg text-gray-300 font-light leading-loose">
                                    {step}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
      </div>

      {/* Footer Action */}
      <div className="flex justify-center mt-12">
        <Button 
            onClick={() => setView('config')} 
            className="text-xs tracking-widest"
        >
          <RefreshCcw className="w-4 h-4" />
          再次生成 (Generate Another)
        </Button>
      </div>

    </div>
  );
};
