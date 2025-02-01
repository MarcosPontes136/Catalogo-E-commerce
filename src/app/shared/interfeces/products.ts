export interface Product {
  id: string;
  price: number;
  status: string;
  discounted: string;
  discount: number;
  name: string;
  description: string;
  image: string;
}

export interface ApiResponse<T> {
  message: string;
  data: T;
  success: boolean;
}
