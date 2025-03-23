export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    email: string;
    name: string;
  };
}

export interface Collection {
  id: number;
  name: string;
  description: string;
  products: Product[];
  createdAt: string;
  updatedAt: string;
}

export interface CollectionResponse {
  data: Product[];
}

export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  order?: number;
}

export interface ProductResponse {
  data: Product[];
}

export interface Filter {
  id: string;
  name: string;
  values: FilterValue[];
}

export interface FilterValue {
  id: string;
  value: string;
  selected?: boolean;
}

export interface FilterResponse {
  data: Filter[];
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
} 