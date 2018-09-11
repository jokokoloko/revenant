import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actionAccount from '../../redux/action/actionAccount';
import { ACCOUNT_REGISTER_REQUEST } from '../../redux/type';
import { findByString, removeStatus } from '../../filter';
import InputButton from '../input/InputButton';
import InputText from '../input/InputText';

class FormLead extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {},
            error: {},
        };
        this.isFocus = createRef();
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        this.isFocus.current.focus();
    }
    onChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const field = target.name;
        const group = target.dataset.group;
        const form = group
            ? {
                  ...this.state.form,
                  [group]: {
                      ...this.state.form[group],
                      [field]: value,
                  },
              }
            : {
                  ...this.state.form,
                  [field]: value,
              };
        this.setState({
            form,
        });
    }
    onSubmit(event) {
        const { actionAccount } = this.props;
        const { form } = this.state;
        event.preventDefault();
        this.isValid() && actionAccount.accountRegister(form);
    }
    isValid() {
        const { form } = this.state;
        const error = {};
        const emailLength = 5;
        let valid = true;
        (form.email === undefined || form.email.length < emailLength) &&
            (error.email = `Email must be at least ${emailLength} characters.`) &&
            (valid = false);
        this.setState({
            error,
        });
        return valid;
    }
    render() {
        const { submitting } = this.props;
        const { form, error } = this.state;
        const size = 'lg';
        return (
            <form id="form-lead" className={`form form-${size} mx-lg-auto`} onSubmit={this.onSubmit}>
                <InputText
                    type="email"
                    name="email"
                    label="Email"
                    placeholder="Email"
                    size={size}
                    onChange={this.onChange}
                    value={form.email}
                    error={error.email}
                    reference={this.isFocus}
                />
                <div className="form-group">
                    <InputButton
                        type="submit"
                        name="register"
                        label={submitting ? 'Submitting...' : 'Submit'}
                        kind="success"
                        size={size}
                        display="block"
                        disabled={submitting}
                    />
                </div>
            </form>
        );
    }
}

FormLead.propTypes = {
    submitting: PropTypes.bool.isRequired,
    actionAccount: PropTypes.objectOf(PropTypes.func).isRequired,
};

function mapStateToProps({ calls }) {
    return {
        submitting: findByString(calls, removeStatus(ACCOUNT_REGISTER_REQUEST)),
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
)(FormLead);
