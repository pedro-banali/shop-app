import { AnyAction } from 'redux';
import { HashMap } from '../../shared/HashMap';
import { Order } from '../../models/order';
import { ADD_ORDER, SET_ORDERS } from '../actions/order.actions';

export interface OrderState {
    orders: HashMap<Order>;
}

const initialState: OrderState = {
    orders: {}
};

export default (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case ADD_ORDER:
            return {
                ...state, orders: {
                    ...state.orders,
                    [action.orderData.id]: action.orderData
                }
            };
        case SET_ORDERS: {
            return { ...state, orders: action.payload.orders };
        }
    }
    return state;
};