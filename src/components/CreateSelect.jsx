import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CreateSelect extends Component {
  render() {
    const { testId, onChange, name, options, description, value } = this.props;

    return (
      <label htmlFor={ name }>
        { description }
        <select
          data-testid={ testId }
          name={ name }
          onChange={ onChange }
          id={ name }
          value={ value }
        >
          { options.map((option, i) => (
            <option key={ i } value={ option }>{ option }</option>
          ))}
        </select>
      </label>
    );
  }
}

CreateSelect.defaultProps = {
  testId: '',
  value: '',
};

CreateSelect.propTypes = {
  testId: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(String).isRequired,
  description: PropTypes.string.isRequired,
  value: PropTypes.string,
};
