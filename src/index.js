import fetch from 'isomorphic-fetch';

const ts = (string, args = {}) =>
  string.replace(/\{([a-zA-Z_$][0-9a-zA-Z_$]+)\}/g, (match, arg) => args[arg]);

export const qs = params =>
  Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');

const u = (base, target, args, params) => {
  let url = base || '';
  url += ts(target, args);
  url += params ? '?' : '';
  url += params ? qs(params) : '';
  return url;
};

const req = (method, target, { base, args, params, cb, json = true, opts }) => {
  const url = u(base, target, args, params);
  const config = { ...opts, method };
  // console.log(url, JSON.stringify(config)); // test
  return fetch(url, config)
    .then(res => (json ? res.json() : res.text()))
    .then(res => (cb ? cb(res) : res));
};

export const get = (target, opts = {}) => req('GET', target, opts);

export const post = (target, opts = {}) =>
  req('POST', target, {
    ...opts,
    opts: {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(opts.body),
      ...opts.opts
    }
  });
