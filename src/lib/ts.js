export default (str, args) =>
  str.replace(
    /\{([a-zA-Z_$][0-9a-zA-Z_$]+)\}/g,
    (match, arg) => (args[arg] || args[arg] === 0 ? args[arg] : '')
  );
