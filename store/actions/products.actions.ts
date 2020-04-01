import { HashMap } from './../../shared/HashMap';
import { Product } from '../../models/product.class';
import { Dispatch } from 'react';

export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';


export const fetchProducts = () => {
    return async dispatch => {
        const response = await fetch('https://shopapp-3d9df.firebaseio.com/products.json');
        const resData: HashMap<Product> = await response.json();
        Object.keys(resData).forEach(key => {
            resData[key].id = key;
            resData[key].ownerId = 'u1';
        });

        dispatch({
            type: SET_PRODUCTS, payload: {
                products: resData
            }
        });
    };
};

export const createProduct = ({ title, description, imageUrl, price }: Partial<Product>) => {
    return async (dispatch) => {
        const product = { title, description, imageUrl, price };
        const response = await fetch('https://shopapp-3d9df.firebaseio.com/products.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product)
        });

        const resData = await response.json();

        dispatch({ type: CREATE_PRODUCT, payload: { product: { ...product, id: resData.name } } });
    };
};

export const updateProduct = ({ id, title, description, imageUrl }: Partial<Product>) => {
    return {
        type: UPDATE_PRODUCT, payload: {
            id,
            product: { title, description, imageUrl }
        }
    };
};

export const deleteProduct = (productId: string) => {
    return { type: DELETE_PRODUCT, payload: { productId } };
}; 