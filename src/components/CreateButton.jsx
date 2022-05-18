import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CreateButton extends Component {
  render() {
    const { testeId, onClick, name, description, isDisabled } = this.props;

    return (
      <button
        type="button"
        data-testid={ testeId }
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
  testeId: '',
  isDisabled: false,
};

CreateButton.propTypes = {
  testeId: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
};
