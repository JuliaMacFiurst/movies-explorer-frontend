export const defaultCheckboxValue = {
  "shortMovies-checkbox": false,
};

export function getLocalStorageData(key, defaultValue) {
  const value = localStorage.getItem(key);

  if (value === null) {
    return defaultValue;
  }
  try {
    return JSON.parse(value);
  } catch (error) {
    return value;
  }
}
