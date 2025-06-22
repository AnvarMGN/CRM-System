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

const handleRegError = (
  notificatonDescription: string,
  error: Error,
  dispatch: AppDispatch
) => {
  console.log(notificatonDescription, error.message);
  openNotification("Ошибка", notificatonDescription);
  dispatch(authActions.changeRegStatusFalse());
};

const handleLogError = (
  notificatonDescription: string,
  error: Error,
  dispatch: AppDispatch
) => {
  console.log(notificatonDescription, error.message);
  openNotification("Ошибка", notificatonDescription);
  dispatch(authActions.changeExpiredTrue());
};

const handleUpdateError = (
  errorMessage: string,
  error: Error,
  dispatch: AppDispatch
) => {
  console.log(errorMessage, error.message);
  dispatch(authActions.changeExpiredTrue());
  dispatch(authActions.removeToken());
};

export const userRegistrationAction = (newUser: UserRegistration) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await userRegistration(newUser);

      if (response.status === 201) {
        dispatch(authActions.changeRegStatusTrue());
        console.log("Пользователь успешно зарегистрирован.");
        openNotification(
          "Уведомление",
          "Пользователь успешно зарегистрирован."
        );
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
        dispatch(
          authActions.saveToken({
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
          })
        );
        dispatch(authActions.changeExpiredFalse());
        console.log("Пользователь успешно авторизовался.");
        openNotification("Уведомление", "Пользователь успешно авторизовался.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          switch (error.response.status) {
            case 400:
              handleLogError(
                "Ошибка обработки данных, либо неправильный ввод данных пользователя.",
                error,
                dispatch
              );
              break;
            case 401:
              handleLogError("Не верные учётные данные.", error, dispatch);
              break;
            case 500:
              handleLogError("`Ошибка на стороне сервера.", error, dispatch);
              break;
            default:
              handleLogError("Неизвестная ошибка.", error, dispatch);
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
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      console.log("RefreshToken отсутствует.");
      dispatch(authActions.changeExpiredTrue());
      dispatch(authActions.removeToken());
      return;
    }

    try {
      const response = await updateToken(refreshToken);

      if (
        response.status === 200 &&
        response.data?.accessToken &&
        response.data?.refreshToken
      ) {
        dispatch(
          authActions.saveToken({
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
          })
        );
        dispatch(authActions.changeExpiredFalse());
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
    try {
      const response = await getUserRequest();
      dispatch(
        authActions.getUser({
          username: response.data.username,
          email: response.data.email,
          phoneNumber: response.data.phoneNumber,
        })
      );
    } catch (error) {
      console.log(
        `Ошибка при загрузке данных пользователя: ${(error as Error).message}`
      );
      openNotification("Ошибка!", (error as Error).message);
    }
  };
};
