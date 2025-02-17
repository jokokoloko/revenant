import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actionUser from '../redux/action/actionUser';
import { USERS_LOAD_REQUEST } from '../redux/type';
import { findByString, removeStatus } from '../filter';
import * as client from '../client';
import * as logic from '../logic';
import Basic from './section/Basic';
import Feed from './section/Feed';
import Avatar from './unit/Avatar';
import Loader from './unit/Loader';

class UserHome extends Component {
    componentDidMount() {
        const { actionUser } = this.props;
        actionUser.usersLoad();
    }
    render() {
        const { loadingUsers, users } = this.props;
        const item = 'user';
        const loopUser = users.map((user, index) => {
            const count = users.length - index;
            const userName = logic.userName(user);
            return (
                <article key={user.id} id={user.id} className={`${item} ${item}-${count} col-lg-3`}>
                    <header className="card card-panel">
                        <Link className="card-body" to={`/${user.slug}`}>
                            <Avatar
                                position="fit exact-center"
                                source={user.avatar || client.EMPTY_AVATAR}
                                alternate={logic.userNameHandle(user, 'Avatar')}
                            />
                            {userName && <h2 className="user-name user-name-first user-name-last card-headline">{userName}</h2>}
                            {user.handle && <h3 className="user-handle card-tagline">@{user.handle || 'handle'}</h3>}
                        </Link>
                    </header>
                </article>
            );
        });
        return (
            <main id="main" role="main">
                <div className="container-fluid">
                    <Basic space="space-xs-30 space-lg-80">
                        <header className="text-center">
                            <h1>Users</h1>
                        </header>
                    </Basic>

                    <Feed space="space-xs-20 space-lg-80" item={item}>
                        <section>
                            {loadingUsers ? (
                                <Loader position="exact-center fixed" label="Loading users" />
                            ) : users.length > 0 ? (
                                <div className="row gutter-20 gutter-lg-80 text-center">{loopUser}</div>
                            ) : (
                                <article className="empty text-center">
                                    <header>
                                        <h3>{`No ${item}s`}</h3>
                                    </header>
                                </article>
                            )}
                        </section>
                    </Feed>
                </div>
            </main>
        );
    }
}

UserHome.propTypes = {
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
)(UserHome);
