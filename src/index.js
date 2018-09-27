import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import service from './service';
import Root from './js/react/Root';
import configureStore from './js/redux/store';
import { usersLoad } from './js/redux/action/actionUser';
import { postsLoad } from './js/redux/action/actionPost';
import { leadsLoad } from './js/redux/action/actionLead';
import '../node_modules/toastr/build/toastr.min.css'; // 6 kb
import './css/theme.css';

const store = configureStore();
store.dispatch(usersLoad(true));
store.dispatch(postsLoad(true));
store.dispatch(leadsLoad(true));

ReactDOM.render(
    <Provider store={store}>
        <Root />
    </Provider>,
    document.getElementById('root'),
);
service();
