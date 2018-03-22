export const ts = (target, args) =>
  target.replace(/\{([a-zA-Z_$][0-9a-zA-Z_$]+)\}/g, (match, arg) => args[arg]);

export const qs = params =>
  Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');

const req = (
  method,
  target,
  { base, args, params, opts, json = true, ref = false, test = false }
) =>
  new Promise(async (res, rej) => {
    try {
      let url = base || '';

      url += ts(target, args);
      url += params ? '?' : '';
      url += params ? qs(params) : '';

      const config = { ...opts, method };

      if (test) {
        // url, fetch config, fetchin config
        console.log(url, config, { json, ref });
        res();
      }

      const resp = await fetch(url, config);

      const data = await (json ? resp.json() : resp.text());

      if (ref) res({ data, ref: resp });

      res(data);
    } catch (err) {
      rej(err);
    }
  });

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
