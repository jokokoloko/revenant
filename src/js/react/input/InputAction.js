import React from 'react';
import PropTypes from 'prop-types';

const InputAction = ({ type, name, action, kind, size, onClick, status }) => <input type={type} className={`btn btn-${kind} btn-${size} btn-${name}`} name={name} onClick={onClick} value={action} disabled={status} />;

InputAction.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
    action: PropTypes.string,
    kind: PropTypes.string,
    size: PropTypes.string,
    onClick: PropTypes.func,
    status: PropTypes.bool,
};

InputAction.defaultProps = {
    type: 'submit',
    name: 'submit',
    action: 'Submit',
    kind: 'default',
    size: 'md',
    onClick: undefined,
    status: false,
};

export default InputAction;
