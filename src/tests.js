import { get, post } from './';

const run = async () => {
  try {
    // make a simple get request, promise-based, returns parsed json by default (can be modified)
    await get('https://foo');

    // passing params, url encoding is handled for you
    await get('https://foo', { params: { bar: 123 } }); // https://foo?bar=123

    // one base, multiple endpoints
    const base = 'https://foo';
    await get('/bar', { base }); // https://foo/bar
    await get('/baz', { base }); // https://foo/baz

    // no need for template strings, use args
    await get('https://foo/{bar}', { args: { bar: 123 } }); // https://foo/123
    await get('https://foo/{bar}/{baz}', { args: { bar: 123, baz: 456 } }); // https://foo/123/456

    // you can pass callbacks too
    get('https://foo', { cb: json => console.log(json) });

    // response is not json?
    await get('https://foo', { text: true });

    // tweak/pass any other fetch() opts
    await get('https://foo', { opts: { headers: { bar: 'baz' } } });

    // make a simple post request, same api as get with a body prop
    await post('https://foo', { body: { bar: 123 } });

    // content-type by default is 'application/json', body is stringified, to overwrite utilize opts
    await post('https://foo', {
      opts: { headers: { 'Content-Type': 'foo/bar' }, body: 'not json' }
    });
  } catch (err) {
    console.log(err.message);
  }
};

run();
