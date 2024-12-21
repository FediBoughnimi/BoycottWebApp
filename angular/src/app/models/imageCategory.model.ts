import { Category } from './category.model';
export interface ImageCategory {
    id: number;
    name: string;
    picByte: string; 
    category: Category;
  }