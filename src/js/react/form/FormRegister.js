import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actionAccount from '../../redux/action/actionAccount';
import InputButton from '../input/InputButton';
import InputText from '../input/InputText';

class FormRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {},
            error: {},
            status: false,
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(event) {
        const { form } = this.state;
        const target = event.target;
        form[target.name] = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            form,
        });
    }
    onSubmit(event) {
        const { actionAccount } = this.props;
        const { form } = this.state;
        event.preventDefault();
        if (!this.isValid()) {
            return;
        }
        this.setState({
            status: true,
        });
        actionAccount.accountRegister(form).catch((error) => {
            this.setState({
                status: false,
            });
            throw error;
        });
    }
    isValid() {
        const { form } = this.state;
        const error = {};
        const emailLength = 5;
        const passwordLength = 5;
        let valid = true;
        if (form.email === undefined || form.email.length < emailLength) {
            error.email = `Email must be at least ${emailLength} characters.`;
            valid = false;
        }
        if (form.password === undefined || form.password.length < passwordLength) {
            error.password = `Password must be at least ${passwordLength} characters.`;
            valid = false;
        }
        this.setState({
            error,
        });
        return valid;
    }
    render() {
        const size = 'lg';
        const { form, error, status } = this.state;
        return (
            <form id="form-register" className={`form form-${size} mx-lg-auto`} onSubmit={this.onSubmit}>
                <InputText
                    type="email"
                    name="email"
                    label="Email"
                    placeholder="Email"
                    size={size}
                    onChange={this.onChange}
                    value={form.email}
                    error={error.email}
                />
                <InputText
                    type="password"
                    name="password"
                    label="Password"
                    placeholder="Password"
                    size={size}
                    onChange={this.onChange}
                    value={form.password}
                    error={error.password}
                />
                <div className="form-group">
                    <InputButton
                        type="submit"
                        name="register"
                        label={status ? 'Registering...' : 'Register'}
                        kind="success"
                        size={size}
                        display="block"
                        status={status}
                    />
                </div>
            </form>
        );
    }
}

FormRegister.propTypes = {
    actionAccount: PropTypes.objectOf(PropTypes.func).isRequired,
};

function mapDispatchToProps(dispatch) {
    return {
        actionAccount: bindActionCreators(actionAccount, dispatch),
    };
}

export default connect(null, mapDispatchToProps)(FormRegister);
