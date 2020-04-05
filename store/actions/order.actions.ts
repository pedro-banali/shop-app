import { HashMap } from '../../shared/HashMap';
import { CartItem } from '../reducers/cart.reducer';
import { Order } from '../../models/order';

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

export const fetchOrders = () => {
    return async dispatch => {
        try {
            const response = await fetch('https://shopapp-3d9df.firebaseio.com/orders/u1.json');
            const resData = await response.json();

            if (!response.ok) {
                throw new Error('Something went wrong');
            }

            if (resData === null) {
                return dispatch({
                    type: SET_ORDERS, payload: {
                        orders: {}
                    }
                });

            }
            Object.keys(resData).forEach(key => {
                resData[key].id = key;
                // resData[key].date = Date.parse(resData[key].date);
            });


            dispatch({
                type: SET_ORDERS, payload: {
                    orders: resData
                }
            });
        } catch (error) {

        }
    };

};


export const addOrder = (orderItems: HashMap<CartItem>, orderTotal: number) => {

    return async dispatch => {

        const orderDate = Date.now();

        const response = await fetch('https://shopapp-3d9df.firebaseio.com/orders/u1.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ orderItems, orderTotal, orderDate })
        });

        if (!response.ok) {
            throw new Error('Something went wrong!');
        }

        const resData = await response.json();

        dispatch({
            type: ADD_ORDER, orderData: {
                id: resData.name,
                orderItems,
                orderDate,
                orderTotal
            } as Order
        });
    };

};