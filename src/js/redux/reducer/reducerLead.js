import initial from '../initial';
import { LEADS_LOAD_SUCCESS, LEADS_VOID } from '../type';

export default function(state = initial.leads, action) {
    switch (action.type) {
        case LEADS_LOAD_SUCCESS:
            return action.leads || initial.leads;
        case LEADS_VOID:
            return initial.leads;
        default:
            return state;
    }
}
