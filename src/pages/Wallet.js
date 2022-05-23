import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header/index';
import { actionCurrenciApi, actionExpenseApi, actionDellExpense,
  actionEditExpense } from '../actions/index';
import CreateInput from '../components/CreateInput';
import CreateSelect from '../components/CreateSelect';
import CreateButton from '../components/CreateButton';
import CreateTableItem from '../components/CreateTableItem';
import ObjectData from '../helpers/ObjectData';
import './Wallet.css';

class Wallet extends React.Component {
  state = {
    id: '',
    expenseValue: '',
    selectedCurrenci: '',
    peimentMethod: '',
    expenseCategory: '',
    expenseDescription: '',
    formBtnText: 'Adicionar despesa',
    formBtnFunct: () => this.buttonExpenseAdd(),
  }

  async componentDidMount() {
    const { fetchCurrencies } = this.props;
    await fetchCurrencies();
    this.setDefaultEntries();
  }

  setDefaultEntries = () => {
    const { currencies, expenses } = this.props;
    const { paymentOptions, category } = ObjectData;

    this.setState({
      id: expenses.length === 0 ? 0
        : expenses[expenses.length - 1].id + 1,
      expenseValue: '',
      selectedCurrenci: currencies[0],
      peimentMethod: paymentOptions[0],
      expenseCategory: category[0],
      expenseDescription: '',
      formBtnText: 'Adicionar despesa',
      formBtnFunct: () => this.buttonExpenseAdd(),
    });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  buttonExpenseAdd = async () => {
    const { expenseValue, selectedCurrenci, peimentMethod,
      expenseDescription, expenseCategory, id } = this.state;
    const { addExpense } = this.props;

    const expenseEntry = {
      id,
      value: expenseValue,
      currency: selectedCurrenci,
      method: peimentMethod,
      tag: expenseCategory,
      description: expenseDescription,
    };

    await addExpense(expenseEntry);
    this.setDefaultEntries();
  }

  deleteExpense = (removeId) => {
    const { expenses, expenseRemove } = this.props;
    const newExpenses = expenses.filter(({ id }) => id !== removeId);
    // .map((item, i) => ({ ...item, id: i }));
    expenseRemove(newExpenses);
  }

  editButton = (editId) => {
    const { expenses } = this.props;
    const expenseToEdit = expenses.find(({ id }) => id === editId);

    this.setState({
      id: expenseToEdit.id,
      expenseValue: expenseToEdit.value,
      selectedCurrenci: expenseToEdit.currency,
      peimentMethod: expenseToEdit.method,
      expenseCategory: expenseToEdit.tag,
      expenseDescription: expenseToEdit.description,
      formBtnText: 'Editar despesa',
      formBtnFunct: () => this.editExpenseButton(),
    });
  }

  editExpenseButton = () => {
    const { expenses, changeExpense } = this.props;
    const { expenseValue, selectedCurrenci, peimentMethod,
      expenseDescription, expenseCategory, id } = this.state;

    const expenseCurrencies = expenses.find((myExpenses) => myExpenses.id === id);
    const editedExpense = {
      id,
      value: expenseValue,
      currency: selectedCurrenci,
      method: peimentMethod,
      tag: expenseCategory,
      description: expenseDescription,
      exchangeRates: expenseCurrencies.exchangeRates,
    };
    const expensesUpdated = expenses.map((exp) => (exp.id === id ? editedExpense : exp));
    changeExpense(expensesUpdated);
    this.setDefaultEntries();
  }

  // === RENDER ===// <===
  render() {
    const { currencies, expenses } = this.props;
    const { expenseValue, expenseDescription, formBtnText, formBtnFunct,
      selectedCurrenci } = this.state;
    const { paymentOptions, category } = ObjectData;

    return (
      <>
        <Header />

        <section className="expenses-contain">
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
              value={ selectedCurrenci }
              testId="currency-input"
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
              onClick={ formBtnFunct }
              name="espenseAdd"
              description={ formBtnText }
            />
          </div>
          <CreateTableItem
            myExpenses={ expenses }
            editItem={ this.editButton }
            deletItem={ this.deleteExpense }
          />
        </section>

      </>

    );
  }
}

const mapStateToProps = ({ wallet: { currencies, expenses } }) => ({
  currencies,
  expenses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(actionCurrenciApi()),
  addExpense: (data) => dispatch(actionExpenseApi(data)),
  expenseRemove: (toRemove) => dispatch(actionDellExpense(toRemove)),
  changeExpense: (updatedExpenses) => dispatch(actionEditExpense(updatedExpenses)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.defaultProps = {
  expenses: [],
};

Wallet.propTypes = {
  fetchCurrencies: PropTypes.func.isRequired,
  addExpense: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(String).isRequired,
  expenses: PropTypes.arrayOf(Object),
  expenseRemove: PropTypes.func.isRequired,
  changeExpense: PropTypes.func.isRequired,
};
