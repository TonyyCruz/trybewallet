import ApiCurrencies from '../helpers/ApiCall';

const actionLogIn = (email) => ({
  type: 'LOGIN_EMAIL',
  email,
});

const actionFail = (error) => ({
  type: 'FETCH_ERROR',
  error,
});

const actionCurrencies = (fetch) => ({
  type: 'FETCH_CURRENCIES',
  keys: fetch,
});

const actionExpense = (expense, exchangeRates) => ({
  type: 'EXPENSE_ADD',
  newExpense: { ...expense,
    exchangeRates },
});

export const actionCurrenciApi = () => async (dispatch) => {
  try {
    const data = await ApiCurrencies();
    dispatch(actionCurrencies(data.apiKays));
  } catch (error) { dispatch(actionFail(error)); }
};

export const actionExpenseApi = (expense) => async (dispatch) => {
  try {
    const data = await ApiCurrencies();
    dispatch(actionExpense(expense, data.apiObj));
  } catch (error) { dispatch(actionFail(error)); }
};

export default actionLogIn;
