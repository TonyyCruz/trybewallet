import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header/index';
import { actionCurrenciAPI } from '../actions/index';
import CreateInput from '../components/CreateInput';
import CreateSelect from '../components/CreateSelect';
import CreateButton from '../components/CreateButton';
import selectOptions from '../helpers/SelectOptions';
// import Load from '../components/Load/index';

class Wallet extends React.Component {
  state = {
    expenseValue: '',
    selectedCurrenci: '',
    expenseDescription: '',
    peimentMethod: '',
  }

  async componentDidMount() {
    const { fetchCurrencies } = this.props;
    await fetchCurrencies();
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  buttonExpenseAdd = () => {
    console.log('i am a button');
  }

  // === RENDER ===// <===
  render() {
    const { currencies } = this.props;
    const { expenseValue, expenseDescription, selectedCurrenci,
      peimentMethod } = this.state;
    const { paymentOptions, category } = selectOptions;

    console.log(peimentMethod, selectedCurrenci); // <===== apagar

    return (

      <>
        <Header />

        <CreateInput
          testId="description-input"
          onChange={ this.handleChange }
          name="expenseDescription"
          value={ expenseDescription }
          description="Descrição"
        />

        <CreateInput
          type="number"
          testId="value-input"
          onChange={ this.handleChange }
          name="expenseValue"
          value={ expenseValue }
          description="Valor"
        />

        <CreateSelect
          onChange={ this.handleChange }
          name="selectedCurrenci"
          options={ currencies }
          description="Moeda: "
        />

        <CreateSelect
          onChange={ this.handleChange }
          name="peimentMethod"
          options={ paymentOptions }
          description="Método de pagamento: "
          testId="method-input"
        />

        <CreateSelect
          onChange={ this.handleChange }
          name="expenseCategory"
          options={ category }
          description="Categoria: "
          testId="tag-input"
        />

        <CreateButton
          onClick={ this.buttonExpenseAdd }
          name="espenseAdd"
          description="Adicionar despesa"
        />

      </>

    );
  }
}

const mapStateToProps = ({ wallet: { currencies } }) => ({
  currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(actionCurrenciAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  fetchCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(String).isRequired,
};
