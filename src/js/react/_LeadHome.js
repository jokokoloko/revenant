import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actionLead from '../redux/action/actionLead';
import { LEADS_LOAD_REQUEST } from '../redux/type';
import { findByString, removeStatus } from '../filter';
import Basic from './section/Basic';
import Loader from './unit/Loader';

class _LeadHome extends Component {
    componentDidMount() {
        const { actionLead } = this.props;
        actionLead.leadsLoad(true);
    }
    render() {
        const { loadingLeads, leads } = this.props;
        const item = 'lead';
        const empty = '-';
        const labelLead = ['Email', 'First', 'Last', 'Phone', 'State', 'Action'];
        const loopLead = leads.map((lead, index) => {
            const count = leads.length - index;
            return (
                <tr key={lead.id} id={lead.id} className={`${item} ${item}-${count}`}>
                    <th className={`${item}-email`} scope="row">
                        {lead.email || empty}
                    </th>
                    <td className={`${item}-name ${item}-name-first`}>{(lead.name && lead.name.first) || empty}</td>
                    <td className={`${item}-name ${item}-name-last`}>{(lead.name && lead.name.last) || empty}</td>
                    <td className={`${item}-phone`}>{lead.phone || empty}</td>
                    <td className={`${item}-address ${item}-address-state`}>{(lead.address && lead.address.state) || empty}</td>
                    <td className={`${item}-action`}>Delete</td>
                </tr>
            );
        });
        return (
            <main id="main" role="main">
                <div className="container-fluid">
                    <Basic container="container-fluid" space="space-xs-50 space-lg-80">
                        <header className="d-flex align-items-end node-xs-50">
                            <h1>Leads</h1>
                            <p className="ml-auto">Total: {leads.length}</p>
                        </header>

                        <section className="node-xs-50">
                            {loadingLeads ? (
                                <Loader position="exact-center fixed" label="Loading leads" />
                            ) : (
                                <div className="table-container table-responsive-sm">
                                    <table className={`table table-striped table-bordered table-style table-size-80 table-${item}`}>
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
                                                    <td className={`${item}-name ${item}-name-first`}>{empty}</td>
                                                    <td className={`${item}-name ${item}-name-last`}>{empty}</td>
                                                    <td className={`${item}-phone`}>{empty}</td>
                                                    <td className={`${item}-address ${item}-address-state`}>{empty}</td>
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
    loadingLeads: PropTypes.bool.isRequired,
    leads: PropTypes.arrayOf(PropTypes.object).isRequired,
    actionLead: PropTypes.objectOf(PropTypes.func).isRequired,
};

function mapStateToProps({ calls, leads }) {
    return {
        loadingLeads: findByString(calls, removeStatus(LEADS_LOAD_REQUEST)),
        leads,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actionLead: bindActionCreators(actionLead, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(_LeadHome);
