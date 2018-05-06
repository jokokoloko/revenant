import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ProfileHome from './_ProfileHome';
import _Empty from './_404';

const _Profile = ({ match }) => (
    <Switch>
        <Route path={`${match.path}`} component={_ProfileHome} exact />
        <Route component={_Empty} />
    </Switch>
);

_Profile.propTypes = {
    match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default _Profile;
