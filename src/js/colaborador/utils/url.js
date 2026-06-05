const getQueryParam = (name) => new URLSearchParams(window.location.search).get(name);

const buildHref = (path, params) => {
  if (!params) return path;
  const queryString = new URLSearchParams(params).toString();
  return `${path}?${queryString}`;
};

globalThis.getQueryParam = getQueryParam;
globalThis.buildHref = buildHref;
