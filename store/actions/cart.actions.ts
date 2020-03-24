import { Product } from '../../models/product.class';

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export const addToCart = (product: Product) => {
    return { type: ADD_TO_CART, product };
};

export const removeFromCart = (pid: string) => {
    return { type: REMOVE_FROM_CART, pid };
};