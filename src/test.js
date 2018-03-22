import { get, post } from './';

const run = async () => {
  try {
    // make a simple get request, promise-based, returns parsed json by default (can be modified)
    await get('https://foo', { test: true });

    // passing params, url encoding is handled for you
    await get('https://foo', { params: { bar: 123 }, test: true }); // https://foo?bar=123

    // one base, multiple endpoints
    const base = 'https://foo';
    await get('/bar', { base, test: true }); // https://foo/bar
    await get('/baz', { base, test: true }); // https://foo/baz

    // no need for template strings, use args
    await get('https://foo/{bar}', { args: { bar: 123 }, test: true }); // https://foo/123
    await get('https://foo/{bar}/{baz}', {
      args: { bar: 123, baz: 456 },
      test: true
    }); // https://foo/123/456

    // response is not json?
    await get('https://foo', { json: false, test: true });

    // tweak/pass any other fetch() opts
    await get('https://foo', { opts: { headers: { bar: 'baz' } }, test: true });

    // make a simple post request, same api as get with an additional body option
    await post('https://foo', { body: { bar: 123 }, test: true });

    // Content-Type by default is 'application/json', body is stringified, to overwrite utilize opts
    await post('https://foo', {
      opts: { headers: { 'Content-Type': 'foo/bar' }, body: 'not json' },
      test: true
    });

    // need access to the raw response?
    await get('https://foo', { ref: true, test: true }); // returns { data, ref }
  } catch (err) {
    console.log(err.message);
  }
};

run();
