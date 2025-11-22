
import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { ChefHat } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { view, setView } = useAppStore();

  return (
    <nav className="absolute top-0 left-0 w-full px-6 py-6 z-50 flex justify-between items-center">
      <div 
        onClick={() => setView('hero')}
        className="cursor-pointer flex items-center gap-3 group"
      >
        <ChefHat className="w-6 h-6 text-gold group-hover:rotate-12 transition-transform duration-300" strokeWidth={1.5} />
        <div className="flex flex-col">
             <span className="font-serif font-bold text-white tracking-wide text-sm leading-none group-hover:text-gold transition-colors">超商米其林</span>
             <span className="text-[8px] text-gray-500 uppercase tracking-[0.2em] leading-none mt-1">The CS Gourmand</span>
        </div>
      </div>

      <div className="flex items-center gap-6 md:gap-8">
        {view !== 'hero' && (
          <button 
            onClick={() => setView('hero')} 
            className="text-[11px] font-bold text-gray-500 hover:text-gold transition-colors uppercase tracking-[0.2em]"
          >
            首頁
          </button>
        )}
        
        {view === 'result' && (
             <button 
              onClick={() => setView('config')} 
              className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold border border-gold/30 px-4 py-2 hover:bg-gold hover:text-black transition-all"
            >
              創作新菜單
            </button>
        )}
      </div>
    </nav>
  );
};
