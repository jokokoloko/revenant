import React, { PropTypes } from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateArea = ({ component: Area, authenticated, ...rest }) => <Route {...rest} render={(props) => authenticated === true && <Area {...props} />} />;

export const PrivateRoute = ({ component: Page, authenticated, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            authenticated === true ? (
                <Page {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: '/login',
                        state: {
                            from: props.location,
                        },
                    }}
                />
            )
        }
    />
);

export const PublicRoute = ({ component: Page, authenticated, ...rest }) => <Route {...rest} render={(props) => (authenticated === false ? <Page {...props} /> : <Redirect to="/dashboard" />)} />;

PrivateArea.propTypes = {
    component: PropTypes.func.isRequired,
    authenticated: PropTypes.bool.isRequired,
};

PrivateRoute.propTypes = {
    component: PropTypes.func.isRequired,
    authenticated: PropTypes.bool.isRequired,
    location: PropTypes.objectOf(PropTypes.any),
};

PrivateRoute.defaultProps = {
    location: undefined,
};

PublicRoute.propTypes = {
    component: PropTypes.func.isRequired,
    authenticated: PropTypes.bool.isRequired,
};
