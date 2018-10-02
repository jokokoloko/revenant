import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as path from '../path';
import { PrivateRoute } from '../access';
import _Campaign from './_Campaign';
import _Lead from './_Lead';
import _Post from './_Post';
import _User from './_User';
import _Profile from './_Profile';
import _Home from './_Home';
import _Empty from './_404';
import Toolbar from './region/Toolbar';

const _Private = ({ match, authenticated }) => (
    <Fragment>
        <Toolbar match={match} />

        <Switch>
            <PrivateRoute path={`${match.path}${path._Profile}`} component={_Profile} authenticated={authenticated} />
            <Route path={`${match.path}${path._Campaign}`} component={_Campaign} />
            <Route path={`${match.path}${path._Lead}`} component={_Lead} />
            <Route path={`${match.path}${path._Post}`} component={_Post} />
            <Route path={`${match.path}${path._User}`} component={_User} />
            <Route path={`${match.path}`} component={_Home} exact />
            <Route component={_Empty} />
        </Switch>
    </Fragment>
);

_Private.propTypes = {
    match: PropTypes.objectOf(PropTypes.any).isRequired,
    authenticated: PropTypes.bool.isRequired,
};

export default _Private;
