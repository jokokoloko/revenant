import { ACCOUNT_LOG_IN_SUCCESS, ACCOUNT_LOG_OUT_SUCCESS, ACCOUNT_CHECK_SUCCESS } from '../type';
import initial from '../initial';

export default function reducerAccount(state = initial.account, action) {
    switch (action.type) {
        case ACCOUNT_LOG_IN_SUCCESS:
            return Object.assign({}, state, {
                authenticated: true,
            });
        case ACCOUNT_LOG_OUT_SUCCESS:
            return Object.assign({}, state, {
                authenticated: false,
            });
        case ACCOUNT_CHECK_SUCCESS:
            return Object.assign({}, state, {
                initialized: true,
            });
        default:
            return state;
    }
}
