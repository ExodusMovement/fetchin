export const ts = (target, args) =>
  target.replace(/\{([a-zA-Z_$][0-9a-zA-Z_$]+)\}/g, (match, arg) => args[arg]);

export const qs = params =>
  Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');

const req = (method, target, { base, args, params, opts, json = true }) => {
  let url = base || '';
  url += ts(target, args);
  url += params ? '?' : '';
  url += params ? qs(params) : '';
  const config = { ...opts, method };
  // console.log(url, JSON.stringify(config)); // test
  return fetch(url, config).then(res => (json ? res.json() : res.text()));
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

export const del = (target, opts = {}) => req('DELETE', target, opts);
export const put = (target, opts = {}) => req('PUT', target, opts);
export const head = (target, opts = {}) => req('HEAD', target, opts);
