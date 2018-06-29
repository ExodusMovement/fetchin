import 'isomorphic-fetch';

import { get } from '../src';

describe('core', () => {
  beforeAll(() => (process.env.NODE_ENV = 'production'));
  afterAll(() => (process.env.NODE_ENV = 'test'));

  it('works with json', async () => {
    const res = await get('https://api.bitfinex.com/v2/tickers', {
      params: { symbols: 'tBTCUSD' }
    });

    const btc = res[0][7];

    expect(btc).toBeGreaterThan(0);
  });

  it('works with non-json', async () => {
    const btc = await get('https://blockchain.info/q/latesthash', {
      json: false
    });

    expect(btc.length).toBe(64);
  });

  it('returns a ref', async () => {
    const res = await get('https://blockchain.info/q/latesthash', {
      json: false,
      ref: true
    });

    expect(res.ref).toBeTruthy();
    expect(res.ref.status).toBe(200);
    expect(res.data.length).toBe(64);
  });

  it('handles rejection', async () => {
    global.fetch = jest
      .fn()
      .mockImplementation(
        () => new Promise((res, rej) => rej(new Error('oh no')))
      );

    expect.assertions(1);

    try {
      await get('https://google.com');
    } catch (err) {
      expect(err.message).toEqual('oh no');
    }
  });
});
