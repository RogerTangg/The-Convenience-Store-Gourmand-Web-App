import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { StoreType } from '../types';
import { ArrowRight } from 'lucide-react';

export const MyCreations: React.FC = () => {
  const { savedMenus, setMenuData, setView } = useAppStore();

  const handleView = (menu: any) => {
    setMenuData(menu);
    setView('result');
  };

  return (
    <div className="max-w-6xl mx-auto w-full px-6 py-16 animate-slide-up">
      <div className="text-center mb-20">
        <h2 className="font-serif text-4xl md:text-5xl text-white mb-4 tracking-wide">您的美食收藏</h2>
        <p className="font-sans text-xs text-gold uppercase tracking-[0.3em]">Culinary Collection</p>
      </div>
      
      {savedMenus.length === 0 ? (
        <div className="text-center py-32 border border-dashed border-white/10 bg-white/[0.02] rounded-sm">
          <p className="font-serif text-xl text-gray-400 italic mb-8 tracking-wide">"主廚，您的餐盤目前是空的。"</p>
          <button 
            onClick={() => setView('config')} 
            className="text-gold hover:text-white transition-colors text-sm uppercase tracking-widest border-b border-gold/50 pb-1 hover:border-white"
          >
            創作您的第一道菜
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {savedMenus.map((menu) => (
            <div 
              key={menu.id}
              onClick={() => handleView(menu)}
              className="group bg-[#111] border border-white/10 hover:border-gold/50 overflow-hidden cursor-pointer transition-all duration-500 flex flex-col h-full relative shadow-lg hover:shadow-gold/10"
            >
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

              <div className="p-8 flex flex-col h-full z-10">
                <div className="flex justify-between items-center mb-6">
                    <span className={`text-[10px] font-bold uppercase tracking-[0.15em] ${menu.store === StoreType.SEVEN_ELEVEN ? 'text-store-seven' : 'text-store-family'}`}>
                        {menu.store === StoreType.SEVEN_ELEVEN ? '7-Eleven' : 'FamilyMart'}
                    </span>
                    <span className="font-mono text-[10px] text-gray-500">
                        {new Date(menu.created_at).toLocaleDateString('zh-TW', { month: 'short', day: 'numeric' })}
                    </span>
                </div>
                
                <h3 className="font-serif text-2xl text-gray-200 group-hover:text-gold transition-colors duration-300 leading-tight mb-5 italic tracking-wide">
                  {menu.title}
                </h3>
                
                <p className="font-sans text-gray-400 text-sm leading-relaxed line-clamp-3 mb-8 flex-grow font-light">
                    {menu.description}
                </p>
                
                <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
                    <div className="flex items-center text-gray-300 font-serif">
                        <span className="text-gold text-sm mr-1">$</span>
                        <span className="text-lg">{menu.total_price}</span>
                    </div>
                    <div className="flex items-center text-[10px] uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">
                        查看菜單 <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};