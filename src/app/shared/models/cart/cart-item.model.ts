export interface CartItem {
  id?: string;
  user_id?: number;
  product_id: number;
  quantity: number;
  created?: string;
  modified?: string;
}
