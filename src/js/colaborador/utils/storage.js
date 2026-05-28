const setStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getStorage = (key) => {
  const raw = localStorage.getItem(key);
  if (raw === null) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

const removeStorage = (key) => {
  localStorage.removeItem(key);
};

globalThis.setStorage = setStorage;
globalThis.getStorage = getStorage;
globalThis.removeStorage = removeStorage;
