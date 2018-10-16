import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actionAccount from '../redux/action/actionAccount';
import { ACCOUNT_CHECK_REQUEST, PROFILE_LOAD_REQUEST } from '../redux/type';
import { findByString, removeStatus } from '../filter';
import * as path from '../path';
import { PrivateRoute, PublicRoute } from '../access';
import _Private from './_Private';
import ResetPassword from './ResetPassword';
import Login from './Login';
import Register from './Register';
import CampaignView from './CampaignView';
import Home from './Home';
import Empty from './404';
import Header from './region/Header';
import Footer from './region/Footer';
import Compass from './widget/Compass';
import Loader from './unit/Loader';

class Root extends Component {
    constructor(props) {
        super(props);
        this.onLogOut = this.onLogOut.bind(this);
    }
    componentDidMount() {
        const { actionAccount } = this.props;
        this.accountCheckEnd = actionAccount.accountCheck();
    }
    componentWillUnmount() {
        this.accountCheckEnd();
    }
    onLogOut() {
        const { actionAccount } = this.props;
        actionAccount.accountLogOut();
    }
    render() {
        const { loadingAccount, loadingProfile, account, profile } = this.props;
        const authenticated = account.authenticated && profile.id && profile.email ? true : false;
        return account.initialized === false || loadingAccount || loadingProfile ? (
            <Loader position="exact-center fixed" label={loadingProfile ? 'Loading profile' : 'Initializing'} />
        ) : (
            <Router>
                <Fragment>
                    <Compass />
                    <Header authenticated={authenticated} profile={profile} onLogOut={this.onLogOut} />

                    <Switch>
                        <PrivateRoute path={path._Private} component={_Private} authenticated={authenticated} />
                        <PublicRoute path={path.ResetPassword} component={ResetPassword} authenticated={authenticated} />
                        <PublicRoute path={path.Login} component={Login} authenticated={authenticated} />
                        <PublicRoute path={path.Register} component={Register} authenticated={authenticated} />
                        <Route path={path.CampaignView} component={CampaignView} />
                        <Route path={path.Root} component={Home} exact />
                        <Route component={Empty} />
                    </Switch>

                    <Footer />
                </Fragment>
            </Router>
        );
    }
}

Root.propTypes = {
    loadingAccount: PropTypes.bool.isRequired,
    loadingProfile: PropTypes.bool.isRequired,
    account: PropTypes.objectOf(PropTypes.any).isRequired,
    profile: PropTypes.objectOf(PropTypes.any).isRequired,
    actionAccount: PropTypes.objectOf(PropTypes.func).isRequired,
};

function mapStateToProps({ account, profile, calls }) {
    return {
        loadingAccount: findByString(calls, removeStatus(ACCOUNT_CHECK_REQUEST)),
        loadingProfile: findByString(calls, removeStatus(PROFILE_LOAD_REQUEST)),
        account,
        profile,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actionAccount: bindActionCreators(actionAccount, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Root);
