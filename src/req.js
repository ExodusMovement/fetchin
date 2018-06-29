import ts from './ts';
import qs from './qs';

export default (
  method,
  target,
  { base, args, params, opts, json = true, ref = false }
) => {
  let url = base || '';

  url += ts(target, args);
  url += params ? `?${qs(params)}` : '';

  const config = { ...opts, method };

  if (process.env.NODE_ENV === 'test') return { url, config, json, ref };

  let resp;

  return fetch(url, config)
    .then(res => {
      resp = res;
      return json ? res.json() : res.text();
    })
    .then(data => (ref ? { data, ref: resp } : data));
};
