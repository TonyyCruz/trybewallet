import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './header.css';

class Header extends Component {
  state = {
    totalExpenses: 0,
  }

  render() {
    const { totalExpenses } = this.state;
    const { userEmail } = this.props;
    console.log('teste userEmail', userEmail);
    return (
      <header>
        <div className="header-info">
          <p data-testid="email-field">{ userEmail }</p>
          <p data-testid="total-field">{ `Despesas Total: ${totalExpenses}` }</p>
          <p data-testid="header-currency-field">BRL</p>
        </div>

      </header>
    );
  }
}

const mapStateToProps = ({ user: { email } }) => ({
  userEmail: email,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
};
