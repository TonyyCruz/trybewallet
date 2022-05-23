const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  error: '',
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'FETCH_ERROR':
    return { ...state, error: action.error };

  case 'FETCH_CURRENCIES':
    return { ...state, currencies: action.keys };

  case 'EXPENSE_ADD':
    return {
      ...state,
      expenses: [...state.expenses, action.newExpense],
    };

  case 'EXPENSE_DELL':
    return {
      ...state,
      expenses: action.expenseUpdating,
    };

  case 'EXPENSE_EDIT':
    return {
      ...state,
      expenses: action.editedExpense,
    };

  default:
    return state;
  }
};

export default wallet;
