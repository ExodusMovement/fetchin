import { get, post, del, put, head } from '../lib';

describe('mock core', () => {
  it('makes a simple get request', async () => {
    const res = await get('https://foo');

    expect(res.config.method).toBe('GET');
    expect(res.json).toBe(true);
    expect(res.url).toBe('https://foo');
  });

  it('passes params', async () => {
    const res = await get('https://foo', { params: { bar: 123 } });

    expect(res.url).toBe('https://foo?bar=123');
  });

  it('does url encoding', async () => {
    const res = await get('https://foo', { params: { bar: '//?=&' } });

    expect(res.url).toBe('https://foo?bar=%2F%2F%3F%3D%26');
  });

  it('accepts a base', async () => {
    const base = 'https://foo';

    const res1 = await get('/bar', { base });
    const res2 = await get('/baz', { base });

    expect(res1.url).toBe('https://foo/bar');
    expect(res2.url).toBe('https://foo/baz');
  });

  it('accepts args', async () => {
    const res1 = await get('https://foo/{bar}', { args: { bar: 123 } });
    const res2 = await get('https://foo/{bar}/{baz}', {
      args: { bar: 123, baz: 456 }
    });

    expect(res1.url).toBe('https://foo/123');
    expect(res2.url).toBe('https://foo/123/456');
  });

  it('can return non-json', async () => {
    const res = await get('https://foo', { json: false });

    expect(res.json).toBe(false);
  });

  it('passes fetch() opts', async () => {
    const res = await get('https://foo', { opts: { headers: { bar: 'baz' } } });

    expect(res.config.headers.bar).toBe('baz');
  });

  it('makes a simple post request', async () => {
    const res = await post('https://foo', { body: { bar: 123 } });

    expect(res.config.method).toBe('POST');
    expect(res.config.headers['Content-Type']).toBe('application/json');
    expect(res.config.body).toBe('{"bar":123}');
  });

  it('allows overwriting default Content-Type and body config', async () => {
    const res = await post('https://foo', {
      opts: { headers: { 'Content-Type': 'foo/bar' }, body: 'not json' }
    });

    expect(res.config.headers['Content-Type']).toBe('foo/bar');
    expect(res.config.body).toBe('not json');
  });

  it('allows access to raw response', async () => {
    const res = await get('https://foo', { ref: true });

    expect(res.ref).toBe(true);
  });

  it('makes a simple del request', async () => {
    const res = await del('https://foo');
    expect(res.config.method).toBe('DELETE');
  });

  it('makes a simple put request', async () => {
    const res = await put('https://foo');
    expect(res.config.method).toBe('PUT');
  });

  it('makes a simple head request', async () => {
    const res = await head('https://foo');
    expect(res.config.method).toBe('HEAD');
  });
});

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
