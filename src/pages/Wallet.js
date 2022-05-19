import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header/index';
import Load from '../components/Load/index';
import { actionCurrenciAPI } from '../actions/index';
import CreateInput from '../components/CreateInput';
import CreateSelect from '../components/CreateSelect';

class Wallet extends React.Component {
  state = {
    expenseValue: '',
    selectedCurrenci: '',
  }

  async componentDidMount() {
    const { fetchCurrencies, currencies } = this.props;
    await fetchCurrencies();
    console.log('did', currencies);
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  render() {
    const { isLoading, currencies } = this.props;
    const { expenseValue } = this.state;

    return (
      isLoading ? (<Load />
      ) : (
        <>
          <Header />

          <CreateInput
            type="number"
            testeId="value-input"
            onChange={ this.handleChange }
            name="expenseValue"
            value={ expenseValue }
            description="Valor"
          />

          <CreateSelect
            onChange={ this.handleChange }
            name="selectedCurrenci"
            options={ currencies }
            description="Moeda"
          />

        </>
      )
    );
  }
}

const mapStateToProps = ({ wallet: { currencies, isLoading } }) => ({
  currencies,
  isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(actionCurrenciAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  fetchCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(String).isRequired,
  isLoading: PropTypes.bool.isRequired,
};
