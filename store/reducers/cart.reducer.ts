import { REMOVE_FROM_CART } from './../actions/cart.actions';

import { AnyAction } from 'redux';
import { Product } from '../../models/product.class';
import { HashMap } from '../../shared/HashMap';
import { IProduct } from '../../models/iproduct';
import { ADD_TO_CART } from '../actions/cart.actions';

export interface CartItem extends IProduct {
    totalPrice: number;
    quantity: number;
}

export interface CartState {
    items: HashMap<CartItem>,
    totalAmount: number;
}

const initialState: CartState = {
    items: {},
    totalAmount: 0
};

export default (state: CartState = initialState, action: AnyAction) => {
    switch (action.type) {
        case ADD_TO_CART:
            const { product } = action;
            const { items } = state;
            const selectedProduct = items[product.id];

            if (selectedProduct) {
                return {
                    ...state, items: {
                        ...items,
                        [product.id]: {
                            ...selectedProduct,
                            quantity: selectedProduct.quantity + 1,
                            totalPrice: selectedProduct.price * (selectedProduct.quantity + 1)
                        },
                    },
                    totalAmount: state.totalAmount + selectedProduct.price
                };
            }

            return {
                ...state, items: {
                    ...items
                    , [product.id]: {
                        ...product,
                        quantity: 1,
                        totalPrice: product.price
                    },
                },
                totalAmount: state.totalAmount + product.price
            };
        case REMOVE_FROM_CART: {
            const { items } = state;
            const curQnt = items[action.pid].quantity;
            if (curQnt > 1) {
                const { [action.pid]: selectedCartItem, ...rest } = items;
                return {
                    ...state, items: {
                        ...items
                        , [selectedCartItem.id]: {
                            ...selectedCartItem,
                            quantity: selectedCartItem.quantity - 1,
                            totalPrice: selectedCartItem.totalPrice - selectedCartItem.price
                        },
                    },
                    totalAmount: state.totalAmount - selectedCartItem.price
                };
            }
            const { [action.pid]: deleted, ...rest } = items;
            return {
                ...state, items: rest,
                totalAmount: state.totalAmount - deleted.price
            };

        }
        default:
            return state;
    }
};