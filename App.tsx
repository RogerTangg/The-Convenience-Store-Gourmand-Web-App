
import React from 'react';
import { useAppStore } from './store/useAppStore';
import { Hero } from './components/Hero';
import { ConfigPanel } from './components/ConfigPanel';
import { MenuReveal } from './components/MenuReveal';
import { GeneratingPage } from './components/GeneratingPage';
import { Navbar } from './components/Navbar';

function App() {
  const { view } = useAppStore();

  return (
    <div className="min-h-screen bg-background text-text-main font-sans selection:bg-gold selection:text-background flex flex-col">
      
      <Navbar />

      {/* Main Content Area */}
      <main className="container mx-auto pt-20 pb-10 flex-grow flex flex-col">
        
        {view === 'hero' && (
            <Hero onStart={() => useAppStore.getState().setView('config')} />
        )}
        
        {view === 'config' && (
           <div className="flex-grow flex items-center justify-center">
             <ConfigPanel />
           </div>
        )}

        {view === 'generating' && (
            <div className="flex-grow flex items-center justify-center">
                <GeneratingPage />
            </div>
        )}
        
        {view === 'result' && (
          <MenuReveal />
        )}

      </main>

      <footer className="py-6 text-center text-xs text-gray-700 border-t border-white/5">
        <p>&copy; 2025 The Convenience Store Gourmand. AI Generated Content.</p>
      </footer>

      {/* Background Texture Overlay */}
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')] opacity-40 pointer-events-none z-[-1] mix-blend-overlay"></div>
      <div className="fixed inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none z-[-1]"></div>
    </div>
  );
}

export default App;
