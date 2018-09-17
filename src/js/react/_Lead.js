import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import _LeadHome from './_LeadHome';
import _Empty from './_404';

const _Lead = ({ match }) => (
    <Switch>
        <Route path={`${match.path}`} component={_LeadHome} exact />
        <Route component={_Empty} />
    </Switch>
);

_Lead.propTypes = {
    match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default _Lead;
