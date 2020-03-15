import { HASHED_PRODUCTS, HASHED_PRODUCTS_BY_OWNER_ID } from './../../data/dummy-data';
import { AnyAction } from 'redux';
import { Product } from '../../models/product.class';
import { HashMap } from '../../shared/HashMap';



export interface ProductState {
    availableProducts: HashMap<Product>;
    userProducts: HashMap<Product>;
}
const initialState: ProductState = {
    availableProducts: HASHED_PRODUCTS,
    userProducts: HASHED_PRODUCTS_BY_OWNER_ID('u1')
};

export default (state = initialState, action: AnyAction) => {
    return state;
};