import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actionUser from '../redux/action/actionUser';
import { USERS_LOAD_REQUEST } from '../redux/type';
import { findByString, removeStatus } from '../filter';
import Basic from './section/Basic';
import Loader from './unit/Loader';

class _LeadHome extends Component {
    componentDidMount() {
        const { actionUser } = this.props;
        actionUser.usersLoad();
    }
    render() {
        const { loadingUsers, users } = this.props;
        const item = 'user';
        const empty = '-';
        const labelUser = ['Email', 'First', 'Last', 'Phone', 'State', 'Action'];
        const loopUser = users.map((user, index) => {
            const count = users.length - index;
            return (
                <tr key={user.id} id={user.id} className={`${item} ${item}-${count}`}>
                    <th className={`${item}-email`} scope="row">
                        {user.email || empty}
                    </th>
                    <td className={`${item}-name ${item}-name-first`}>{(user.name && user.name.first) || empty}</td>
                    <td className={`${item}-name ${item}-name-last`}>{(user.name && user.name.last) || empty}</td>
                    <td className={`${item}-phone`}>{user.phone || empty}</td>
                    <td className={`${item}-address ${item}-address-state`}>{(user.address && user.address.state) || empty}</td>
                    <td className={`${item}-action`}>
                        <Link to={`/${user.slug}`}>View</Link>
                    </td>
                </tr>
            );
        });
        return (
            <main id="main" role="main">
                <div className="container-fluid">
                    <Basic container="container-fluid" space="space-xs-50 space-lg-80">
                        <header className="d-flex align-items-end node-xs-50">
                            <h1>Leads</h1>
                            <p className="ml-auto">Total: {users.length}</p>
                        </header>

                        <section className="node-xs-50">
                            {loadingUsers ? (
                                <Loader position="exact-center fixed" label="Loading users" />
                            ) : (
                                <div className="table-container table-responsive-sm">
                                    <table className={`table table-striped table-bordered table-style table-size-80 table-${item}`}>
                                        <thead>
                                            <tr className="label-row">
                                                {labelUser.map((name, index) => {
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
                                            {users.length > 0 ? (
                                                loopUser
                                            ) : (
                                                <tr className={`${item} ${item}-empty`}>
                                                    <th className={`${item}-email`} scope="row">{`No ${item}s`}</th>
                                                    <td className={`${item}-name ${item}-name-first`}>{empty}</td>
                                                    <td className={`${item}-name ${item}-name-last`}>{empty}</td>
                                                    <td className={`${item}-handle`}>{empty}</td>
                                                    <td className={`${item}-address ${item}-address-city`}>{empty}</td>
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
    loadingUsers: PropTypes.bool.isRequired,
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    actionUser: PropTypes.objectOf(PropTypes.func).isRequired,
};

function mapStateToProps({ calls, users }) {
    return {
        loadingUsers: findByString(calls, removeStatus(USERS_LOAD_REQUEST)),
        users,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actionUser: bindActionCreators(actionUser, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(_LeadHome);
