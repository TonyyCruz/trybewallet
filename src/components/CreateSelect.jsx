import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CreateSelect extends Component {
  render() {
    const { testeId, onChange, name, options, description } = this.props;

    return (
      <label htmlFor={ name }>
        <select
          data-testid={ testeId }
          name={ name }
          onChange={ onChange }
        >
          { options.map((option, i) => (
            <option key={ i } value={ option }>{ option }</option>
          ))}
        </select>
        { description }
      </label>
    );
  }
}

CreateSelect.defaultProps = {
  testeId: '',
};

CreateSelect.propTypes = {
  testeId: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(String).isRequired,
  description: PropTypes.string.isRequired,
};
