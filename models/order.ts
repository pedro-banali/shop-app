import { Product } from './product.class';
import { HashMap } from '../shared/HashMap';
import { CartItem } from '../store/reducers/cart.reducer';

export interface Order {
    id: string;
    orderItems: HashMap<CartItem>;
    orderDate: number;
    orderTotal: number;
}