import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CreateInput extends Component {
  render() {
    const { testeId, onChange, name, value, description } = this.props;

    return (
      <input
        type="text"
        data-testid={ testeId }
        onChange={ onChange }
        name={ name }
        value={ value }
        placeholder={ description }
      />
    );
  }
}

CreateInput.propTypes = {
  testeId: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
