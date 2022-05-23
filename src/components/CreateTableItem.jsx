import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CreateButton from './CreateButton';
import ObjectData from '../helpers/ObjectData';

export default class CreateTableItem extends Component {
  convertedValue = (currency, value) => {
    const { ask } = currency;
    return (Number(ask) * Number(value)).toFixed(2);
  };

  render() {
    const { myExpenses, editItem, deletItem } = this.props;
    const { tableEntries } = ObjectData;
    return (

      <table className="table-contain">
        <thead className="table-header">
          <tr>
            {tableEntries.map((entry, i) => (
              <th key={ i }>{ entry }</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {myExpenses.map((item) => {
            const { id, value, currency, method, tag,
              description, exchangeRates } = item;
            return (
              <tr key={ id }>
                <td>{ description }</td>
                <td>{ tag }</td>
                <td>{ method }</td>
                <td>{ Number(value).toFixed(2) }</td>
                <td>{ exchangeRates[currency].name }</td>
                <td>
                  { (Math.round(Number(exchangeRates[currency].ask) * 100) / 100)
                    .toFixed(2) }
                </td>
                <td>{ this.convertedValue(exchangeRates[currency], value) }</td>
                <td>Real</td>
                <td>
                  <CreateButton
                    onClick={ () => editItem(id) }
                    testId="edit-btn"
                    name="espenseEdit"
                    description="Editar"
                  />
                  <CreateButton
                    onClick={ () => deletItem(id) }
                    testId="delete-btn"
                    name="espenseRemove"
                    description="Excluir"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

CreateTableItem.defaultProps = {
  myExpenses: [],
};

CreateTableItem.propTypes = {
  myExpenses: PropTypes.arrayOf(Object),
  deletItem: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
};
