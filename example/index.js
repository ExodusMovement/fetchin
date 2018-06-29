const { get } = require('../../dist');

get('https://api.bitfinex.com/v2/tickers', {
  params: { symbols: 'tBTCUSD' }
})
  .then(res => res[0][7])
  .then(console.log);
