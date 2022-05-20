const helperCurrenciAPI = (apiObj) => {
  const allApiKays = Object.keys(apiObj);
  const apiKays = allApiKays.filter((currenci) => currenci !== 'USDT');
  const apiData = apiKays.map((currenci) => ({ [currenci]: apiObj[currenci] }));

  return {
    apiKays,
    apiData,
    apiObj,
  };
};

const ApiCurrencies = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  return helperCurrenciAPI(data);
};

export default ApiCurrencies;
