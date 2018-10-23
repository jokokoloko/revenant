import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as path from '../path';
import _CampaignEdit from './_CampaignEdit';
import _CampaignHome from './_CampaignHome';
import _Empty from './_404';

const _Campaign = ({ match }) => (
    <Switch>
        <Route path={`${match.path}${path._CampaignAdd}`} component={_CampaignEdit} />
        <Route path={`${match.path}${path._CampaignEdit}`} component={_CampaignEdit} />
        <Route path={`${match.path}`} component={_CampaignHome} exact />
        <Route component={_Empty} />
    </Switch>
);

_Campaign.propTypes = {
    match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default _Campaign;
