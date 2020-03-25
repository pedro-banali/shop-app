import { HashMap } from '../../shared/HashMap';
import { CartItem } from '../reducers/cart.reducer';
import { Order } from '../../models/order';

export const ADD_ORDER = 'ADD_ORDER';
export const addOrder = (orderItems: HashMap<CartItem>, orderTotal: number) => {
    return {
        type: ADD_ORDER, orderData: {
            id: Date.now().toString(),
            orderItems,
            orderDate: Date.now(),
            orderTotal
        } as Order
    };
};