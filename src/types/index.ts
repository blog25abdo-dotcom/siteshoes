export interface Product {
  id: string;
  name: string;
  description: string;
  descriptionImage?: string;
  price: number;
  images: string[];
  category: string;
  weight?: string;
  type?: string;
  packaging?: string;
  features: string[];
  sizes?: ProductSize[];
  inStock: boolean;
  createdAt: Date;
  discount?: number; // Pourcentage de réduction (0-100)
  originalPrice?: number; // Prix original avant réduction
}

export interface ProductSize {
  size: string;
  available: boolean;
  stock?: number;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  image?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  productId?: string;
  createdAt: Date;
  read: boolean;
  orderStatus?: 'pending' | 'sent' | 'received' | 'cancelled';
  orderPrice?: number;
}

export interface User {
  username: string;
  isAuthenticated: boolean;
}

export interface CartItem {
  id: string;
  product: Product;
  selectedSize?: string;
  quantity: number;
  addedAt: Date;
}