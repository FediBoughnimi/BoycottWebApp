import { Product } from './product.model';
export interface ImageProduct {
    id: number;
    name: string;
    picByte: string; 
    product: Product;
  }