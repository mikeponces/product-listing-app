export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    inStock: boolean;
    rating: number;
    imageUrl?: string;
    tags: string[];
    dateAdded: string;
}