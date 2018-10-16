import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actionCampaign from '../redux/action/actionCampaign';
import { CAMPAIGNS_LOAD_REQUEST } from '../redux/type';
import { findByString, removeStatus } from '../filter';
import * as path from '../path';
import Basic from './section/Basic';
import Loader from './unit/Loader';

class _CampaignHome extends Component {
    componentDidMount() {
        const { actionCampaign } = this.props;
        actionCampaign.campaignsLoad();
    }
    render() {
        const { match, loadingCampaigns, profile, campaigns } = this.props;
        const item = 'campaign';
        const empty = '-';
        const labelCampaign = ['Title', 'Author', 'Action'];
        const loopCampaign = campaigns.map((campaign, index) => {
            const count = campaigns.length - index;
            return (
                <tr key={campaign.id} id={campaign.id} className={`${item} ${item}-${count}`}>
                    <th className={`${item}-title`} scope="row">
                        {campaign.title || empty}
                    </th>
                    <td className={`${item}-user`}>{campaign.user || empty}</td>
                    <td className={`${item}-action`}>
                        <Link to={`/${campaign.id}`}>View</Link>
                        {profile.id === campaign.user && (
                            <Fragment>
                                <span className="separator"> - </span>
                                <Link to={`${match.path}/${campaign.id}`}>Edit</Link>
                            </Fragment>
                        )}
                    </td>
                </tr>
            );
        });
        return (
            <main id="main" role="main">
                <div className="container-fluid">
                    <Basic container="container-fluid" space="space-xs-50 space-lg-80">
                        <header className="d-flex align-items-end node-xs-50">
                            <h1>Campaigns</h1>
                            <Link className="btn btn-default to-add" to={`${match.path}${path._CampaignAdd}`}>
                                Add New
                            </Link>
                            <p className="ml-auto">Total: {campaigns.length}</p>
                        </header>

                        <section className="node-xs-50">
                            {loadingCampaigns ? (
                                <Loader position="exact-center fixed" label="Loading campaigns" />
                            ) : (
                                <div className="table-container table-responsive-sm">
                                    <table className={`table table-striped table-bordered table-style table-size-80 table-${item}`}>
                                        <thead>
                                            <tr className="label-row">
                                                {labelCampaign.map((name, index) => {
                                                    const count = index + 1;
                                                    return (
                                                        <th key={`label-${count}`} className={`label label-${count}`} scope="col">
                                                            {name}
                                                        </th>
                                                    );
                                                })}
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {campaigns.length > 0 ? (
                                                loopCampaign
                                            ) : (
                                                <tr className={`${item} ${item}-empty`}>
                                                    <th className={`${item}-title`} scope="row">{`No ${item}s`}</th>
                                                    <td className={`${item}-user`}>{empty}</td>
                                                    <td className={`${item}-action`}>{empty}</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </section>
                    </Basic>
                </div>
            </main>
        );
    }
}

_CampaignHome.propTypes = {
    match: PropTypes.objectOf(PropTypes.any).isRequired,
    loadingCampaigns: PropTypes.bool.isRequired,
    profile: PropTypes.objectOf(PropTypes.any).isRequired,
    campaigns: PropTypes.arrayOf(PropTypes.object).isRequired,
    actionCampaign: PropTypes.objectOf(PropTypes.func).isRequired,
};

function mapStateToProps({ profile, calls, campaigns }) {
    return {
        loadingCampaigns: findByString(calls, removeStatus(CAMPAIGNS_LOAD_REQUEST)),
        profile,
        campaigns,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actionCampaign: bindActionCreators(actionCampaign, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(_CampaignHome);
