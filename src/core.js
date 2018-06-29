import req from './req';

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
