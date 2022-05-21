import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CreateButton from './CreateButton';
import { actionDellExpense } from '../actions/index';

class CreateTableItem extends Component {
  convertedValue = (currency, value) => {
    const { ask } = currency;
    return (Number(ask) * Number(value)).toFixed(2);
  };

  deleteExpense = (removeId) => {
    const { expenses, expenseRemove } = this.props;
    const newExpenses = expenses.filter(({ id }) => id !== removeId)
      .map((item, i) => ({ ...item, id: i }));
    expenseRemove(newExpenses);
  }

  render() {
    const { expenses } = this.props;
    return (
      <tbody>
        {expenses.map((item) => {
          const { id, value, currency, method, tag,
            description, exchangeRates } = item;
          return (
            <tr key={ id }>
              <td>{ description }</td>
              <td>{ tag }</td>
              <td>{ method }</td>
              <td>{ Number(value).toFixed(2) }</td>
              <td>{ exchangeRates[currency].name }</td>
              <td>{ Math.round(Number(exchangeRates[currency].ask) * 100) / 100 }</td>
              <td>{ this.convertedValue(exchangeRates[currency], value) }</td>
              <td>Real</td>
              <td>
                <CreateButton
                  onClick={ () => this.deleteExpense(id) }
                  testId="delete-btn"
                  name="espenseAdd"
                  description="Excluir"
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  }
}

const mapStateToProps = ({ wallet: { expenses } }) => ({
  expenses,
});

const mapDispatchToProps = (dispatch) => ({
  expenseRemove: (toRemove) => dispatch(actionDellExpense(toRemove)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateTableItem);

CreateTableItem.defaultProps = {
  expenses: [],
};

CreateTableItem.propTypes = {
  expenses: PropTypes.arrayOf(Object),
  expenseRemove: PropTypes.func.isRequired,
};
