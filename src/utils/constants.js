export const mainApiUrl = {
  baseUrl: "https://api.movies-explorer.nomoreparties.sbs",
  headers: {
    "Content-Type": "application/json",
  },
};

export const moviesApiUrl = "https://api.nomoreparties.co/beatfilm-movies";

export const validationMessages = {
  valueRequired: () => "Поле должно быть заполнено.",
  tooShort: ({ minLength }) =>
    `Поле должно содержать минимум ${minLength} символ${
      minLength < 5 ? `а` : `ов`
    }`,
  patternUncorrect: () => "Поле заполнено некорректно.",
  typeUncorrect: () => "Поле заполнено некорректно.",
};

export const passwordValidationMessages = {
  patternUncorrect: () => 'Поле заполнено некорректно.',
};


export const emailValidationMessages = {
  patternUncorrect: () => 'Поле должно содержать корректный адрес.',
  typeUncorrect: () => 'Поле должно содержать корректный адрес.',
};
