import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header/index';
import { actionCurrenciApi, actionExpenseApi } from '../actions/index';
import CreateInput from '../components/CreateInput';
import CreateSelect from '../components/CreateSelect';
import CreateButton from '../components/CreateButton';
import selectOptions from '../helpers/SelectOptions';
// import Load from '../components/Load/index';

class Wallet extends React.Component {
  state = {
    expenseValue: '',
    selectedCurrenci: '',
    peimentMethod: '',
    expenseDescription: '',
    expenseCategory: '',
  }

  async componentDidMount() {
    const { fetchCurrencies } = this.props;
    await fetchCurrencies();
    this.setDefaultEntries();
  }

  setDefaultEntries = () => {
    const { currencies } = this.props;
    const { paymentOptions, category } = selectOptions;

    this.setState({
      expenseValue: '',
      selectedCurrenci: currencies[0],
      peimentMethod: paymentOptions[0],
      expenseDescription: '',
      expenseCategory: category[0],
    });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  buttonExpenseAdd = async () => {
    const { expenseValue, selectedCurrenci, peimentMethod,
      expenseDescription, expenseCategory } = this.state;
    const { expenses, addExpense } = this.props;

    const expenseEntry = {
      id: expenses.length,
      value: expenseValue,
      currency: selectedCurrenci,
      method: peimentMethod,
      tag: expenseCategory,
      description: expenseDescription,
    };

    await addExpense(expenseEntry);
    this.setDefaultEntries();
  }

  // === RENDER ===// <===
  render() {
    const { currencies } = this.props;
    const { expenseValue, expenseDescription } = this.state;
    const { paymentOptions, category } = selectOptions;

    return (
      <>
        <Header />

        <div className="expense-entries">
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
        </div>

      </>

    );
  }
}

const mapStateToProps = ({ wallet: { currencies, isLoading, expenses } }) => ({
  currencies,
  isLoading,
  expenses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(actionCurrenciApi()),
  addExpense: (data) => dispatch(actionExpenseApi(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.defaultProps = {
  // isLoading: true,
  expenses: [],
};

Wallet.propTypes = {
  fetchCurrencies: PropTypes.func.isRequired,
  addExpense: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(String).isRequired,
  // isLoading: PropTypes.bool,
  expenses: PropTypes.arrayOf(Object),
};
