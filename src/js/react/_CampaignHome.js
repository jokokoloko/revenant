import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actionPost from '../redux/action/actionPost';
import { POSTS_LOAD_REQUEST } from '../redux/type';
import { findByString, removeStatus } from '../filter';
import * as path from '../path';
import Basic from './section/Basic';
import Loader from './unit/Loader';

class _PostHome extends Component {
    componentDidMount() {
        const { actionPost } = this.props;
        actionPost.postsLoad();
    }
    render() {
        const { match, loadingPosts, profile, posts } = this.props;
        const item = 'post';
        const empty = '-';
        const labelPost = ['Title', 'Author', 'Action'];
        const loopPost = posts.map((post, index) => {
            const count = posts.length - index;
            return (
                <tr key={post.id} id={post.id} className={`${item} ${item}-${count}`}>
                    <th className={`${item}-title`} scope="row">
                        {post.title || empty}
                    </th>
                    <td className={`${item}-user`}>{post.user || empty}</td>
                    <td className={`${item}-action`}>
                        <Link to={`${path.Post}/${post.slug}`}>View</Link>
                        {profile.id === post.user && (
                            <Fragment>
                                <span className="separator"> - </span>
                                <Link to={`${match.path}/${post.id}`}>Edit</Link>
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
                            <Link className="btn btn-default to-add" to={`${match.path}${path._PostAdd}`}>
                                Add New
                            </Link>
                            <p className="ml-auto">Total: {posts.length}</p>
                        </header>

                        <section className="node-xs-50">
                            {loadingPosts ? (
                                <Loader position="exact-center fixed" label="Loading posts" />
                            ) : (
                                <div className="table-container table-responsive-sm">
                                    <table className={`table table-striped table-bordered table-style table-size-80 table-${item}`}>
                                        <thead>
                                            <tr className="label-row">
                                                {labelPost.map((name, index) => {
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
                                            {posts.length > 0 ? (
                                                loopPost
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

_PostHome.propTypes = {
    match: PropTypes.objectOf(PropTypes.any).isRequired,
    loadingPosts: PropTypes.bool.isRequired,
    profile: PropTypes.objectOf(PropTypes.any).isRequired,
    posts: PropTypes.arrayOf(PropTypes.object).isRequired,
    actionPost: PropTypes.objectOf(PropTypes.func).isRequired,
};

function mapStateToProps({ profile, calls, posts }) {
    return {
        loadingPosts: findByString(calls, removeStatus(POSTS_LOAD_REQUEST)),
        profile,
        posts,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actionPost: bindActionCreators(actionPost, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(_PostHome);
