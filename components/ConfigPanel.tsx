
import React from 'react';
import { StoreType, CuisineStyle } from '../types';
import { useAppStore } from '../store/useAppStore';
import { Button } from './Button';
import { Utensils, ShoppingBag, Wallet, Wine } from 'lucide-react';
import { generateMenu } from '../services/geminiService';

export const ConfigPanel: React.FC = () => {
  const { config, setConfig, setMenuData, setView } = useAppStore();

  const handleGenerate = async () => {
    // 1. Go to generating page immediately
    setView('generating');

    try {
      // 2. Call API
      const data = await generateMenu(config);
      
      // 3. On success, set data and show result
      setMenuData(data);
      setView('result');
    } catch (err: any) {
      console.error(err);
      alert("廚房現在有點忙亂 (API Error)，請稍後再試。");
      setView('config'); // Go back to config on error
    }
  };

  return (
    <div className="max-w-3xl mx-auto w-full px-6 py-12 animate-slide-up">
      <div className="bg-[#0f0f0f] border border-white/10 p-8 md:p-12 relative shadow-2xl">
        
        {/* Minimalist Corners */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-gold/40"></div>
        <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-gold/40"></div>
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-gold/40"></div>
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-gold/40"></div>

        <div className="text-center space-y-3 mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-white tracking-tight">主廚設定</h2>
          <p className="font-sans text-gold/60 text-xs uppercase tracking-[0.3em] font-medium">Chef's Configuration</p>
          <div className="flex items-center justify-center gap-4 text-gold/50 pt-2">
             <div className="h-[1px] w-12 bg-gold/30"></div>
             <span className="text-[10px] uppercase tracking-widest text-gray-500">打造您的專屬菜單</span>
             <div className="h-[1px] w-12 bg-gold/30"></div>
          </div>
        </div>

        {/* Budget Slider */}
        <div className="mb-14 group">
           <div className="flex items-end justify-between mb-6">
            <label className="font-sans text-xs uppercase tracking-[0.2em] text-gold font-bold flex items-center gap-2">
              預算限制 <span className="text-[10px] font-normal text-gray-500 opacity-60 tracking-normal">(Budget)</span>
            </label>
            <div className="font-serif text-3xl text-white">
              ${config.budget} <span className="text-sm text-gray-400 font-sans">TWD</span>
            </div>
          </div>
          
          <div className="relative h-12 flex items-center">
             <input
              type="range"
              min="50"
              max="500"
              step="10"
              value={config.budget}
              onChange={(e) => setConfig({ budget: Number(e.target.value) })}
              className="w-full h-[2px] bg-white/20 rounded-none appearance-none cursor-pointer accent-gold hover:bg-white/30 transition-colors"
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 uppercase tracking-widest font-sans mt-2">
             <span>經濟實惠 ($50)</span>
             <span>極致奢華 ($500)</span>
          </div>
        </div>

        {/* Store Selection */}
        <div className="mb-14">
          <label className="font-sans text-xs uppercase tracking-[0.2em] text-gold font-bold block mb-6">
            食材來源 <span className="text-[10px] font-normal text-gray-500 opacity-60 tracking-normal ml-1">(Sourcing)</span>
          </label>
          <div className="grid grid-cols-2 gap-6">
            {(Object.values(StoreType) as StoreType[]).map((s) => (
              <button
                key={s}
                onClick={() => setConfig({ store: s })}
                className={`
                  relative py-6 px-4 border transition-all duration-500 group
                  ${config.store === s 
                    ? 'border-gold bg-gold/5 text-white shadow-[0_0_30px_rgba(212,175,55,0.1)]' 
                    : 'border-white/10 text-gray-400 hover:border-white/30 hover:bg-white/[0.02]'
                  }
                `}
              >
                <span className={`
                    font-serif text-xl block mb-2 transition-colors tracking-wide
                    ${config.store === s ? 'text-gold' : 'group-hover:text-gray-200'}
                `}>
                    {s === StoreType.SEVEN_ELEVEN ? '7-Eleven' : 'FamilyMart'}
                </span>
                <span className="text-[11px] uppercase tracking-widest opacity-60 font-sans">
                    {s === StoreType.SEVEN_ELEVEN ? '統一超商' : '全家便利商店'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Style Selection */}
        <div className="mb-16">
          <label className="font-sans text-xs uppercase tracking-[0.2em] text-gold font-bold block mb-6">
            用餐情境 <span className="text-[10px] font-normal text-gray-500 opacity-60 tracking-normal ml-1">(Atmosphere)</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(Object.values(CuisineStyle) as CuisineStyle[]).map((st) => {
                const chineseName = st.split(' (')[0]; 
                const englishName = st.match(/\(([^)]+)\)/)?.[1] || "";

                let Icon = Utensils;
                if (st.includes('Japanese')) Icon = ShoppingBag;
                if (st.includes('American')) Icon = Wallet;
                if (st.includes('Decadent')) Icon = Wine;

                return (
                  <button
                    key={st}
                    onClick={() => setConfig({ style: st })}
                    className={`
                      p-5 text-left border transition-all duration-300 flex items-start gap-5
                      ${config.style === st 
                        ? 'border-gold bg-gradient-to-r from-gold/10 to-transparent' 
                        : 'border-white/10 hover:border-white/30 hover:bg-white/[0.02]'
                      }
                    `}
                  >
                    <Icon strokeWidth={1} className={`w-5 h-5 mt-1 shrink-0 ${config.style === st ? 'text-gold' : 'text-gray-500'}`} />
                    <div>
                        <span className={`block font-serif text-lg tracking-wide ${config.style === st ? 'text-white' : 'text-gray-400'}`}>
                            {chineseName}
                        </span>
                        <span className="text-[10px] uppercase tracking-widest text-gray-600 block mt-1 font-sans group-hover:text-gray-500 transition-colors">
                            {englishName}
                        </span>
                    </div>
                  </button>
                )
            })}
          </div>
        </div>

        {/* Action */}
        <div className="flex justify-center">
          <Button 
            fullWidth 
            onClick={handleGenerate} 
            className="h-16 text-sm tracking-[0.25em]"
          >
               生成主廚菜單
          </Button>
        </div>

      </div>
    </div>
  );
};
