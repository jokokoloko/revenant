import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as client from '../../client';
import * as path from '../../path';

const Toolbar = ({ match }) => (
    <aside id="toolbar" className="d-none d-lg-block">
        <Link className="toolbar-brand" title={client.BRAND} rel="home" to={path.Root}>
            {client.BRAND}
        </Link>
        <ul className="toolbar-nav nav flex-column">
            <li className="nav-item">
                <NavLink className="nav-link" to={`${match.path}`} exact>
                    Dashboard
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to={`${match.path}${path._Profile}`}>
                    Profile
                </NavLink>
            </li>
        </ul>
        <ul className="toolbar-nav nav flex-column">
            <li className="nav-item">
                <NavLink className="nav-link" to={`${match.path}${path._User}`}>
                    Users
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to={`${match.path}${path._Post}`}>
                    Posts
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to={`${match.path}${path._Lead}`}>
                    Leads
                </NavLink>
            </li>
        </ul>
    </aside>
);

Toolbar.propTypes = {
    match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Toolbar;
