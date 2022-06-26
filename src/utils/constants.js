export const mainApiUrl = "https://api.movies-explorer.nomoreparties.sbs";
// {
//   baseUrl: "https://api.movies-explorer.nomoreparties.sbs",
//   headers: {
//     "Content-Type": "application/json",
//   },
// };

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

export const successMessage = {
  successEditProfile: 'Профиль успешно отредактирован.',
}

export const shortMovieDuration = 40;

export const errorMessages = {
    updateUserError: 'При обновлении профиля произошла ошибка.',
    registerUserError: 'При регистрации пользователя произошла ошибка.',
    loginUserError: 'При авторизации произошла ошибка. Токен не передан или передан не в том формате.',
    invalidTokenData: 'При авторизации произошла ошибка. Переданный токен некорректен.',
    invalidUserData: 'Вы ввели неправильный логин или пароль.',
    userAlreadyExist: 'Пользователь с таким email уже существует.',
    invalidMoviesData: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.',
    didntFindMovies: 'Ничего не найдено.',
    saveMovieError: 'Во время сохранения фильма произошла ошибка. Подождите немного и попробуйте ещё раз.',
    removeMovieError: 'Во время удаления фильма произошла ошибка. Подождите немного и попробуйте ещё раз.',
    serverError: 'На сервере произошла ошибка. Подождите немного и попробуйте ещё раз.',
    pageNotFound: 'Страница по указанному маршруту не найдена.',
};

export const screenParams = {
  desktop: {
      width: 1024,
      params: {
          initial: 12,
          more: 3
      }
  },
  tablet: {
      width: 768,
      params: {
          initial: 8,
          more: 2
      }
  },
  mobile: {
      width: 320,
      params: {
          initial: 5,
          more: 2
      }
  },
};