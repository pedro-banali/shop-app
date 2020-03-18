
import { AnyAction } from 'redux';
import { Product } from '../../models/product.class';
import { HashMap } from '../../shared/HashMap';
import { IProduct } from '../../models/iproduct';
import { ADD_TO_CART } from '../actions/cart.actions';

export interface CartItem extends IProduct {
    totalPrice: number;
    quantity: number;
}

interface CartState {
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
                console.log(state);
                return {
                    ...state, items: {
                        ...items,
                        [product.id]: {
                            ...selectedProduct,
                            quantity: selectedProduct.quantity + 1,
                            totalSum: selectedProduct.price * (selectedProduct.quantity + 1)
                        },
                    },
                    totalAmount: state.totalAmount + selectedProduct.price
                };
            }
            console.log(state);

            return {
                ...state, items: {
                    ...items
                    , [product.id]: {
                        ...product,
                        quantity: 1,
                        totalSum: product.price
                    },
                },
                totalAmount: state.totalAmount + product.price
            };
        default:
            return state;
    }
};