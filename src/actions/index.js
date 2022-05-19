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
  keys: fetch.apiKays,
  arrayOfObj: fetch.apiArray,
});

const helperCurrenciAPI = (apiObj) => {
  const allApiKays = Object.keys(apiObj);
  const apiKays = allApiKays.filter((currenci) => currenci !== 'USDT');
  const apiArray = apiKays.map((currenci) => ({ [currenci]: apiObj[currenci] }));

  return {
    apiKays,
    apiArray,
  };
};

export const actionCurrenciAPI = () => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const resolved = helperCurrenciAPI(data);
    dispatch(actionCurrencies(resolved));
  } catch (error) { dispatch(actionFail(error)); }
};

export default actionLogIn;
