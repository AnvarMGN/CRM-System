import axios from "axios";
import { tokens } from "../util/auth";
import type { AuthData, UserRegistration } from "../types/auth";
import {
  getUserRequest,
  updateToken,
  userAuthentication,
  userRegistration,
} from "../api/apiAuth";
import type { AppDispatch } from "./index";
import { authActions } from "./auth-slice";

export const userRegistrationAction = (newUser: UserRegistration) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await userRegistration(newUser);

      if (response.status === 201) {
        dispatch(authActions.isRegistratedTrue());
        console.log("Пользователь успешно зарегистрирован.");
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const userAuthenticationAction = (userAuthData: AuthData) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await userAuthentication(userAuthData);

      if (response.status === 200) {
        tokens.setAccessToken(response.data.accessToken);
        tokens.setRefreshToken(response.data.refreshToken);
        dispatch(authActions.isAuthorizedTrue());
        console.log("Пользователь успешно авторизовался.");
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const updateTokenAction = () => {
  return async (dispatch: AppDispatch) => {
    const refreshToken = tokens.getRefreshToken();

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
        tokens.setAccessToken(response.data.accessToken);
        tokens.setRefreshToken(response.data.refreshToken);
        dispatch(authActions.isAuthorizedTrue());
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const getUserRequestAction = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await getUserRequest();
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
