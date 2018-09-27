import { combineReducers } from 'redux';
import account from './reducer/reducerAccount';
import profile from './reducer/reducerProfile';
import view from './reducer/reducerView';
import calls from './reducer/reducerCall';
import users from './reducer/reducerUser';
import posts from './reducer/reducerPost';
import leads from './reducer/reducerLead';

export default combineReducers({
    account,
    profile,
    view,
    calls,
    users,
    posts,
    leads,
});
