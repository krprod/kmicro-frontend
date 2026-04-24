import { type UserReview } from "./user-review";

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  rating?: number;
  reviewCount: number;
  inStock: boolean;
  category: string;
  reviews?: UserReview[];
}

export interface ProductDTO {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  rating?: number;
  quantity: number;
  reviewCount: number;
  inStock: boolean;
   isActive: boolean;
  category: string;
}

export interface ProductsProp{
  products: Product[] | null
}

export interface ProductListingResponse {
    content: Product[]
    metadata: {
      last: true
      numberOfElements: number
      page: number
      size: number
      totalElements: number
      totalPages: number
    }
}

export interface AdminProductApiResponse {
    content: ProductDTO[]
    metadata: {
      last: true
      numberOfElements: number
      page: number
      size: number
      totalElements: number
      totalPages: number
    }
}
