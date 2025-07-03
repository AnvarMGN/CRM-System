import axios from "axios";
import { tokenManager } from "../util/auth";
import type { AuthData, UserRegistration } from "../types/auth";
import {
  getUserRequest,
  updateToken,
  userAuthentication,
  userRegistration,
} from "../api/apiAuth";
import type { AppDispatch } from "./index";
import { authActions } from "./auth-slice";

const handleRegError = (
  notificatonDescription: string,
  error: Error,
  dispatch: AppDispatch
) => {
  console.log(notificatonDescription, error.message);
  dispatch(authActions.isRegistratedFalse());
};

const handleAuthError = (
  notificatonDescription: string,
  error: Error,
  dispatch: AppDispatch
) => {
  console.log(notificatonDescription, error.message);
  dispatch(authActions.isAuthorizedFalse());
};

const handleUpdateError = (
  errorMessage: string,
  error: Error,
  dispatch: AppDispatch
) => {
  console.log(errorMessage, error.message);
  dispatch(authActions.isAuthorizedFalse());
  tokenManager.removeAccessToken();
  tokenManager.removeRefreshToken();
};

export const userRegistrationAction = (newUser: UserRegistration) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await userRegistration(newUser);

      if (response.status === 201) {
        dispatch(authActions.isRegistratedTrue());
        console.log("Пользователь успешно зарегистрирован.");
      }
    } catch (error) {
      const errorStatusLabels = {
        400: "Ошибка обработки данных, либо неправильный ввод данных пользователя.",
        409: "Пользователь уже зарегистрирован.",
        500: "Внутренняя ошибка сервера.",
      };
      if (axios.isAxiosError(error)) {
        if (error.response) {
          switch (error.response.status) {
            case 400:
              handleRegError(
                errorStatusLabels[error.response.status],
                error,
                dispatch
              );
              break;
            case 409:
              handleRegError(
                errorStatusLabels[error.response.status],
                error,
                dispatch
              );
              break;
            case 500:
              handleRegError(
                errorStatusLabels[error.response.status],
                error,
                dispatch
              );
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
      throw error;
    }
  };
};

export const userAuthenticationAction = (userAuthData: AuthData) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await userAuthentication(userAuthData);

      if (response.status === 200) {
        tokenManager.setAccessToken(response.data.accessToken);
        tokenManager.setRefreshToken(response.data.refreshToken);
        dispatch(authActions.isAuthorizedTrue());
        console.log("Пользователь успешно авторизовался.");
      }
    } catch (error) {
      const errorStatusLabels = {
        400: "Ошибка обработки данных, либо неправильный ввод данных пользователя.",
        401: "Не верные учётные данные.",
        500: "Внутренняя ошибка сервера.",
      };

      if (axios.isAxiosError(error)) {
        if (error.response) {
          switch (error.response.status) {
            case 400:
              handleAuthError(
                errorStatusLabels[error.response.status],
                error,
                dispatch
              );
              break;
            case 401:
              handleAuthError(
                errorStatusLabels[error.response.status],
                error,
                dispatch
              );
              break;
            case 500:
              handleAuthError(
                errorStatusLabels[error.response.status],
                error,
                dispatch
              );
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

      throw error;
    }
  };
};

export const updateTokenAction = () => {
  return async (dispatch: AppDispatch) => {
    const refreshToken = tokenManager.getRefreshToken();

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
        tokenManager.setAccessToken(response.data.accessToken);
        tokenManager.setRefreshToken(response.data.refreshToken);
        dispatch(authActions.isAuthorizedTrue());
      }
    } catch (error) {
      const errorStatusLabels = {
        400: "Произошла ошибка при обработке данных.",
        401: "Проверьте введенные данные или войдите снова.",
        500: "Внутренняя ошибка сервера.",
      };

      if (axios.isAxiosError(error)) {
        if (error.response) {
          switch (error.response.status) {
            case 400:
              handleUpdateError(
                errorStatusLabels[error.response.status],
                error,
                dispatch
              );
              break;
            case 401:
              handleUpdateError(
                errorStatusLabels[error.response.status],
                error,
                dispatch
              );
              break;
            case 500:
              handleUpdateError(
                errorStatusLabels[error.response.status],
                error,
                dispatch
              );
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
      throw error;
    }
  };
};

export const getUserRequestAction = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await getUserRequest();
      if (response.status === 200) {
        console.log(response);
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
