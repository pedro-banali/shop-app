import { availableProductsAsList } from './../selectors/products.selectors';
import { CREATE_PRODUCT, UPDATE_PRODUCT } from './../actions/products.actions';
import { HASHED_PRODUCTS, HASHED_PRODUCTS_BY_OWNER_ID } from './../../data/dummy-data';
import { AnyAction } from 'redux';
import { Product } from '../../models/product.class';
import { HashMap } from '../../shared/HashMap';
import { DELETE_PRODUCT } from '../actions/products.actions';



export interface ProductState {
    availableProducts: HashMap<Product>;
    userProducts: HashMap<Product>;
}
const initialState: ProductState = {
    availableProducts: HASHED_PRODUCTS,
    userProducts: HASHED_PRODUCTS_BY_OWNER_ID('u1')
};

export default (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case CREATE_PRODUCT:
            const { product: newProductData } = action.payload;
            const newCreatedProduct = {
                id: Date.now().toString(),
                ownerId: 'u1',
                title: newProductData.title,
                description: newProductData.description,
                imageUrl: newProductData.imageUrl,
                price: newProductData.price
            };
            return {
                ...state,
                availableProducts: {
                    ...state.availableProducts,
                    [newCreatedProduct.id]: newCreatedProduct
                },
                userProducts: {
                    ...state.userProducts,
                    [newCreatedProduct.id]: newCreatedProduct
                }
            };
        case UPDATE_PRODUCT:
            const { product: updatedProductData, id } = action.payload;
            const updatedProduct = {
                title: updatedProductData.title,
                description: updatedProductData.description,
                imageUrl: updatedProductData.imageUrl,
            };
            return {
                ...state,
                availableProducts: { ...state.availableProducts, [id]: { ...state.availableProducts[id], ...updatedProduct } },
                userProducts: { ...state.userProducts, [id]: { ...state.userProducts[id], ...updatedProduct } }
            };
        case DELETE_PRODUCT:
            const { [action.payload.productId]: userProductRemoved, ...userProducts } = state.userProducts;
            const { [action.payload.productId]: availableProductRemoved, ...availableProducts } = state.availableProducts;
            return { ...state, userProducts, availableProducts };
    };
    return state;
};