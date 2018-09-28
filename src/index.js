import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import service from './service';
import Root from './js/react/Root';
import configureStore from './js/redux/store';
import '../node_modules/toastr/build/toastr.min.css'; // 6 kb
import './css/theme.css';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <Root />
    </Provider>,
    document.getElementById('root'),
);
service();
