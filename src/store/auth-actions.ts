import type { AuthData, UserRegistration } from "../types/types";
import {
  getUserRequest,
  updateToken,
  userAuthentication,
  userRegistration,
} from "../api/apiAuth";
import { openNotification } from "../notifications/notifications";
import { authActions } from "./auth-slice";
import axios from "axios";
import type { AppDispatch } from "./index";
import {
  getAccessToken,
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "../util/auth";

const handleRegError = (
  notificatonDescription: string,
  error: Error,
  dispatch: AppDispatch
) => {
  console.log(notificatonDescription, error.message);
  openNotification("Ошибка", notificatonDescription);
  dispatch(authActions.isRegistratedFalse());
};

const handleAuthError = (
  notificatonDescription: string,
  error: Error,
  dispatch: AppDispatch
) => {
  console.log(notificatonDescription, error.message);
  openNotification("Ошибка", notificatonDescription);
  dispatch(authActions.isAuthorizedFalse());
};

const handleUpdateError = (
  errorMessage: string,
  error: Error,
  dispatch: AppDispatch
) => {
  console.log(errorMessage, error.message);
  dispatch(authActions.isAuthorizedFalse());
  removeAccessToken();
  removeRefreshToken();
};

export const userRegistrationAction = (newUser: UserRegistration) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await userRegistration(newUser);

      if (response.status === 201) {
        dispatch(authActions.isRegistratedTrue());
        openNotification(
          "Уведомление",
          "Пользователь успешно зарегистрирован."
        );
        console.log("Пользователь успешно зарегистрирован.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          switch (error.response.status) {
            case 400:
              handleRegError(
                "Ошибка обработки данных, либо неправильный ввод данных пользователя.",
                error,
                dispatch
              );
              break;
            case 409:
              handleRegError(
                "Пользователь уже зарегистрирован.",
                error,
                dispatch
              );
              break;
            case 500:
              handleRegError("`Ошибка на стороне сервера.", error, dispatch);
              break;
            default:
              handleRegError("Неизвестная ошибка.", error, dispatch);
              break;
          }
        } else if (error.request) {
          handleRegError("Сервер не доступен.", error, dispatch);
        } else {
          handleRegError("Неизвестная ошибка.", error, dispatch);
        }
      } else {
        handleRegError("Неизвестная ошибка.", error as Error, dispatch);
      }
    }
  };
};

export const userAuthenticationAction = (userAuthData: AuthData) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await userAuthentication(userAuthData);

      if (response.status === 200) {
        setAccessToken(response.data.accessToken);
        setRefreshToken(response.data.refreshToken);
        dispatch(authActions.isAuthorizedTrue());
        openNotification("Уведомление", "Пользователь успешно авторизовался.");
        console.log("Пользователь успешно авторизовался.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          switch (error.response.status) {
            case 400:
              handleAuthError(
                "Ошибка обработки данных, либо неправильный ввод данных пользователя.",
                error,
                dispatch
              );
              break;
            case 401:
              handleAuthError("Не верные учётные данные.", error, dispatch);
              break;
            case 500:
              handleAuthError("`Ошибка на стороне сервера.", error, dispatch);
              break;
            default:
              handleAuthError("Неизвестная ошибка.", error, dispatch);
              break;
          }
        } else if (error.request) {
          console.log("Сервер не доступен.", error.message);
        } else {
          console.log("Неизвестная ошибка.", error.message);
        }
      } else {
        console.log("Неизвестная ошибка.", (error as Error).message);
      }
    }
  };
};

export const updateTokenAction = () => {
  return async (dispatch: AppDispatch) => {
    const refreshToken = getRefreshToken();

    if (!refreshToken) {
      dispatch(authActions.isAuthorizedFalse());
      console.error("RefreshToken отсутствует.");
      return;
    }

    try {
      const response = await updateToken(refreshToken);

      if (
        response.status === 200 &&
        response.data?.accessToken &&
        response.data?.refreshToken
      ) {
        setAccessToken(response.data.accessToken);
        setRefreshToken(response.data.refreshToken);
        dispatch(authActions.isAuthorizedTrue());
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          switch (error.response.status) {
            case 400:
              handleUpdateError(
                "Ошибка десериализации запроса.",
                error,
                dispatch
              );
              break;

            case 401:
              handleUpdateError(
                "Неверные учетные данные или токен истек.",
                error,
                dispatch
              );
              break;

            case 500:
              handleUpdateError("Внутренняя ошибка сервера.", error, dispatch);
              break;

            default:
              handleUpdateError("Неизвестная ошибка", error, dispatch);
              break;
          }
        } else if (error.request) {
          console.log("Сервер не доступен.", error.message);
        } else {
          console.log("Неизвестная ошибка.", error.message);
        }
      } else {
        console.log("Неизвестная ошибка.", (error as Error).message);
      }
    }
  };
};

export const getUserRequestAction = () => {
  return async (dispatch: AppDispatch) => {
    const accessToken = getAccessToken();

    try {
      const response = await getUserRequest(accessToken);
      if (response.status === 200) {
        dispatch(
          authActions.getUser({
            username: response.data.username,
            email: response.data.email,
            phoneNumber: response.data.phoneNumber,
          })
        );
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          switch (error.response.status) {
            case 400:
              console.log("Пользователь не найден.", error.message);
              break;

            case 401: {
              console.log("Неверные учетные данные или токен истек..");
              break;
            }

            case 500:
              console.log("Внутренняя ошибка сервера.");
              break;

            default:
              console.log("Неизвестная ошибка");
              break;
          }
        } else if (error.request) {
          console.log("Сервер не доступен.", error.message);
        } else {
          console.log(
            "Ошибка при загрузке данных пользователя.",
            error.message
          );
        }
      } else {
        console.log("Неизвестная ошибка.", (error as Error).message);
      }
    }
  };
};
