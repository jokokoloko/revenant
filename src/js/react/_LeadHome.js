import React, { Component } from 'react';
import { CSVLink } from 'react-csv';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actionCampaign from '../redux/action/actionCampaign';
import * as actionLead from '../redux/action/actionLead';
import { CAMPAIGNS_LOAD_REQUEST, LEADS_LOAD_REQUEST } from '../redux/type';
import { findByString, removeStatus } from '../filter';
import { arrayToObject } from '../function';
import * as logic from '../logic';
import Basic from './section/Basic';
import Loader from './unit/Loader';

class _LeadHome extends Component {
    componentDidMount() {
        const { actionCampaign, actionLead } = this.props;
        actionCampaign.campaignsLoad(true);
        actionLead.leadsLoad(true);
    }
    render() {
        const { loadingCampaigns, loadingLeads, leads, campaignsMap } = this.props;
        const item = 'lead';
        const empty = '-';
        const labelLead = ['Email', 'Name', 'Phone', 'State', 'Campaign', 'Medium', 'Date', 'Action'];
        const loopLead = leads.map((lead, index) => {
            const count = leads.length - index;
            const campaign = campaignsMap[lead.campaign] || {};
            const date = new Date(lead.time.created.seconds * 1000);
            const leadName = logic.userName(lead, empty);
            return (
                <tr key={lead.id} id={lead.id} className={`${item} ${item}-${count}`}>
                    <th className={`${item}-email`} scope="row">
                        {lead.email || empty}
                    </th>
                    <td className={`${item}-name ${item}-name-full`}>{leadName}</td>
                    <td className={`${item}-phone`}>{lead.phone || empty}</td>
                    <td className={`${item}-address ${item}-address-state`}>{(lead.address && lead.address.state) || empty}</td>
                    <td className={`${item}-campaign`}>{campaign.title || empty}</td>
                    <td className={`${item}-medium`}>{campaign.medium || empty}</td>
                    <td className={`${item}-date`}>{date.toLocaleString() || empty}</td>
                    <td className={`${item}-action`}>Delete</td>
                </tr>
            );
        });
        const data = leads.map((lead, index) => {
            const campaign = campaignsMap[lead.campaign] || {};
            const date = new Date(lead.time.created.seconds * 1000);
            return {
                ...lead,
                campaign: campaign.title,
                medium: campaign.medium,
                date,
            };
        });
        const headers = [
            { label: 'Email', key: 'email' },
            { label: 'First', key: 'name.first' },
            { label: 'Last', key: 'name.last' },
            { label: 'Phone', key: 'phone' },
            { label: 'State', key: 'address.state' },
            { label: 'Campaign', key: 'campaign' },
            { label: 'Medium', key: 'medium' },
            { label: 'Date', key: 'date' },
        ];
        return (
            <main id="main" role="main">
                <div className="container-fluid">
                    <Basic container="container-fluid" space="space-xs-50 space-lg-80">
                        <header className="d-flex align-items-end node-xs-50">
                            <h1>Leads</h1>
                            {leads &&
                                leads.length > 0 && (
                                    <CSVLink className="btn btn-default do-export" data={data} headers={headers} filename={'leads.csv'}>
                                        Export
                                    </CSVLink>
                                )}
                            <p className="ml-auto">Total: {leads.length}</p>
                        </header>

                        <section className="node-xs-50">
                            {loadingCampaigns || loadingLeads ? (
                                <Loader position="exact-center fixed" label="Loading leads" />
                            ) : (
                                <div className="table-container table-responsive-sm">
                                    <table className={`table table-striped table-bordered table-style table-${item}`}>
                                        <thead>
                                            <tr className="label-row">
                                                {labelLead.map((name, index) => {
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
                                            {leads.length > 0 ? (
                                                loopLead
                                            ) : (
                                                <tr className={`${item} ${item}-empty`}>
                                                    <th className={`${item}-email`} scope="row">{`No ${item}s`}</th>
                                                    <td className={`${item}-name ${item}-name-full`}>{empty}</td>
                                                    <td className={`${item}-phone`}>{empty}</td>
                                                    <td className={`${item}-address ${item}-address-state`}>{empty}</td>
                                                    <td className={`${item}-campaign`}>{empty}</td>
                                                    <td className={`${item}-medium`}>{empty}</td>
                                                    <td className={`${item}-date`}>{empty}</td>
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

_LeadHome.propTypes = {
    loadingCampaigns: PropTypes.bool.isRequired,
    loadingLeads: PropTypes.bool.isRequired,
    leads: PropTypes.arrayOf(PropTypes.object).isRequired,
    actionCampaign: PropTypes.objectOf(PropTypes.func).isRequired,
    actionLead: PropTypes.objectOf(PropTypes.func).isRequired,
};

function mapStateToProps({ calls, leads, campaigns }) {
    const campaignsMap = arrayToObject(campaigns, 'id');
    return {
        loadingCampaigns: findByString(calls, removeStatus(CAMPAIGNS_LOAD_REQUEST)),
        loadingLeads: findByString(calls, removeStatus(LEADS_LOAD_REQUEST)),
        leads,
        campaignsMap,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actionCampaign: bindActionCreators(actionCampaign, dispatch),
        actionLead: bindActionCreators(actionLead, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(_LeadHome);
