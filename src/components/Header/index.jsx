import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './header.css';

class Header extends Component {
  render() {
    const { userEmail } = this.props;
    const { expenses } = this.props;

    return (
      <header className="header-info">
        <p data-testid="email-field">{ `E-mail: ${userEmail}` }</p>
        <p>
          Despesas Total:
          <span className="total-field" data-testid="total-field">{expenses}</span>
        </p>

        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

const expensesSum = (expenses) => {
  const result = expenses.reduce((cv, { value, currency, exchangeRates }) => {
    const expenseValue = Number(value) * Number(exchangeRates[currency].ask);
    return expenseValue + cv;
  }, 0);
  return result.toFixed(2);
};

const mapStateToProps = ({ user: { email }, wallet: { expenses } }) => ({
  userEmail: email,
  expenses: expensesSum(expenses),
});

export default connect(mapStateToProps)(Header);

Header.defaultProps = {
  expenses: '0',
};

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  expenses: PropTypes.string,
};
