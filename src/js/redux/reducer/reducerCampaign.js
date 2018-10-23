import initial from '../initial';
import { CAMPAIGNS_LOAD_SUCCESS, CAMPAIGNS_VOID } from '../type';

export default function(state = initial.campaigns, action) {
    switch (action.type) {
        case CAMPAIGNS_LOAD_SUCCESS:
            return action.campaigns || initial.campaigns;
        case CAMPAIGNS_VOID:
            return initial.campaigns;
        default:
            return state;
    }
}
