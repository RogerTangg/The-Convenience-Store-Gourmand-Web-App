
export enum StoreType {
  SEVEN_ELEVEN = '7-ELEVEN',
  FAMILY_MART = 'FamilyMart'
}

export enum CuisineStyle {
  FRENCH = '法式優雅 (French Elegant)',
  JAPANESE = '日式懷石 (Japanese Kaiseki)',
  AMERICAN = '美式豪邁 (American Bold)',
  DECADENT = '深夜頹廢 (Midnight Decadence)'
}

export interface Ingredient {
  name: string;
  price: number;
  notes?: string;
}

export interface MenuData {
  title: string;
  description: string;
  ingredients: Ingredient[];
  plating_guide: string[];
  total_price: number;
  chef_comment: string;
}

export interface UserConfig {
  budget: number;
  store: StoreType;
  style: CuisineStyle;
}
