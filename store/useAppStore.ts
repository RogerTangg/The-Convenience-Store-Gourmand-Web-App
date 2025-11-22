
import { create } from 'zustand';
import { UserConfig, MenuData, StoreType, CuisineStyle } from '../types';

interface AppState {
  view: 'hero' | 'config' | 'generating' | 'result';
  config: UserConfig;
  currentMenu: MenuData | null;
  
  // Actions
  setView: (view: AppState['view']) => void;
  setConfig: (config: Partial<UserConfig>) => void;
  setMenuData: (data: MenuData | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  view: 'hero',
  config: {
    budget: 200,
    store: StoreType.SEVEN_ELEVEN,
    style: CuisineStyle.FRENCH
  },
  currentMenu: null,

  setView: (view) => set({ view }),
  
  setConfig: (newConfig) => set((state) => ({
    config: { ...state.config, ...newConfig }
  })),

  setMenuData: (data) => set({ currentMenu: data }),
}));
