import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import * as path from '../path';
import _Home from './_Home';
import _Empty from './_404';

const _Private = ({ match }) => (
    <Fragment>
        <aside className="jumbotron">Toolbar</aside>

        <Switch>
            <Route path={`${match.path}${path._Post}`} component={_Home} />
            <Route path={`${match.path}`} component={_Home} exact />
            <Route component={_Empty} />
        </Switch>
    </Fragment>
);

_Private.propTypes = {
    match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default _Private;
