import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as client from '../../client';
import * as logic from '../../logic';
import * as path from '../../path';
import Avatar from '../unit/Avatar';
import Dropdown from '../unit/Dropdown';

const Account = ({ location, authenticated, profile, onLogOut }) => {
    const _Private = location.pathname.includes(path._Private);
    const profileName = logic.userName(profile);
    const profileAvatar = profile.avatar ? (
        <Avatar position="fit exact-center" source={profile.avatar || client.EMPTY_AVATAR} alternate={logic.userNameHandle(profile, 'Avatar')} />
    ) : (
        'Account'
    );
    return authenticated === true ? (
        <ul className="navbar-nav ml-auto account account-member">
            <li className="nav-item">
                <NavLink className={`nav-link no-focus to-${_Private ? 'home' : 'dashboard'}`} to={_Private ? path.Root : path._Private} exact>
                    {_Private ? 'Home' : 'Dashboard'}
                </NavLink>
            </li>
            <Dropdown name="account" label={profileAvatar} alignment="right">
                {profileName && <strong className="dropdown-header">{profileName}</strong>}
                <p className="dropdown-text">{profile.email}</p>
                <div className="dropdown-divider" />
                <NavLink className="dropdown-item to-profile" to={`${path._Private}${path._Profile}`}>
                    Profile
                </NavLink>
                <div className="dropdown-divider" />
                <button type="button" className="dropdown-item on-log-out" onClick={onLogOut}>
                    Log Out
                </button>
            </Dropdown>
        </ul>
    ) : (
        <div className="navbar-action ml-auto account account-guest">
            <Link className="btn btn-lg btn-success btn-initial to-register" to={path.Register}>
                Register
            </Link>
            <Link className="btn btn-lg btn-primary btn-initial to-login" to={path.Login}>
                Log In
            </Link>
        </div>
    );
};

Account.propTypes = {
    location: PropTypes.objectOf(PropTypes.any).isRequired,
    authenticated: PropTypes.bool.isRequired,
    profile: PropTypes.objectOf(PropTypes.any).isRequired,
    onLogOut: PropTypes.func.isRequired,
};

export default Account;
