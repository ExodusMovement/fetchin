import ts from './ts';
import qs from './qs';

export default (
  method,
  target,
  { base, args, params, opts, json = true, ref = false }
) =>
  new Promise(async (res, rej) => {
    try {
      let url = base || '';

      url += ts(target, args);
      url += params ? '?' : '';
      url += params ? qs(params) : '';

      const config = { ...opts, method };

      if (process.env.NODE_ENV === 'test') res({ url, config, json, ref });

      const resp = await fetch(url, config);

      const data = await (json ? resp.json() : resp.text());

      if (ref) res({ data, ref: resp });

      res(data);
    } catch (err) {
      rej(err);
    }
  });
