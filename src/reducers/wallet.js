const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  error: '',
  isLoading: true,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'IS_LOADING':
    return { ...state, isLoading: true };

  case 'FETCH_ERROR':
    return { ...state, error: action.error, isLoading: false };

  case 'FETCH_CURRENCIES':
    return { ...state, currencies: action.keys, isLoading: false };

  case 'EXPENSE_ADD':
    return {
      ...state,
      expenses: [...state.expenses, action.newExpense],
      isLoading: false };

  default:
    return state;
  }
};

export default wallet;
