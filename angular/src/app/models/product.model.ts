import { Category } from './category.model';
export interface Product {
    id: number;
    name: string;
    barcode: string;
    brand: string;
    raison: string;
    alternative: string;
    alternativeSourceLink: string;
    category : Category;
}

  