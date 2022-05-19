import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CreateButton extends Component {
  render() {
    const { testId, onClick, name, description, isDisabled } = this.props;

    return (
      <button
        type="button"
        data-testid={ testId }
        onClick={ onClick }
        name={ name }
        disabled={ isDisabled }
      >
        { description }
      </button>
    );
  }
}

CreateButton.defaultProps = {
  testId: '',
  isDisabled: false,
};

CreateButton.propTypes = {
  testId: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
};
