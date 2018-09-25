import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class Affix extends Component {
    constructor(props) {
        super(props);
        this.state = {
            affix: false,
        };
        this.onScroll = this.onScroll.bind(this);
    }
    componentDidMount() {
        window.addEventListener('scroll', this.onScroll);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll);
    }
    onScroll() {
        const { offset } = this.props;
        const { affix } = this.state;
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        affix &&
            scrollTop <= offset &&
            this.setState({
                affix: false,
            });
        !affix &&
            scrollTop >= offset &&
            this.setState({
                affix: true,
            });
    }
    render() {
        const { className, children, ...props } = this.props;
        const { affix } = this.state;
        return (
            <Fragment>
                <div className={`${className} affix affix-width ${affix ? 'position-fixed' : 'position-initial'}`} {...props}>
                    {children}
                </div>
                {affix && <div className="affix-width" />}
            </Fragment>
        );
    }
}

Affix.propTypes = {
    className: PropTypes.string,
    offset: PropTypes.number,
    children: PropTypes.node.isRequired,
};

Affix.defaultProps = {
    className: 'no-class',
    offset: 0,
};

export default Affix;
