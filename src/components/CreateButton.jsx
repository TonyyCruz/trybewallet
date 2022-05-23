import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CreateButton extends Component {
  render() {
    const { testId, onClick, name, description, isDisabled, className } = this.props;

    return (
      <button
        type="button"
        data-testid={ testId }
        onClick={ onClick }
        name={ name }
        disabled={ isDisabled }
        className={ className }
      >
        { description }
      </button>
    );
  }
}

CreateButton.defaultProps = {
  testId: '',
  isDisabled: false,
  className: '',
};

CreateButton.propTypes = {
  testId: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  className: PropTypes.string,
};
