import axios from "axios";
import { tokens } from "../../util/auth";
import { openNotification } from "../../notifications/notifications";
import { useEffect, useState } from "react";
import type { AppDispatch } from "../../store";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { authActions } from "../../store/auth-slice";
import {
  getUserRequestAction,
  updateTokenAction,
} from "../../store/auth-actions";

export const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [isLoading, setLoading] = useState(false);

  const handleUpdateError = (
    notificatonDescription: string,
    error: Error,
    dispatch: AppDispatch
  ) => {
    console.log(notificatonDescription, error.message);
    openNotification("Ошибка", notificatonDescription);
    dispatch(authActions.isAuthorizedFalse());
    tokens.removeAccessToken();
    tokens.removeRefreshToken();
  };

  useEffect(() => {
    const thunkFunction = async () => {
      try {
        setLoading(true);
        await dispatch(updateTokenAction());
        await dispatch(getUserRequestAction());
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            switch (error.response.status) {
              case 400:
                handleUpdateError(
                  "Произошла ошибка при обработке данных.",
                  error,
                  dispatch
                );
                break;
              case 401:
                handleUpdateError(
                  "Проверьте введенные данные или войдите снова.",
                  error,
                  dispatch
                );
                break;
              case 500:
                handleUpdateError(
                  "Внутренняя ошибка сервера.",
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
      } finally {
        setLoading(false);
      }
    };

    thunkFunction();
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>Привет!</h1>
      <ul>
        <li>{user.username}</li>
        <li>{user.email}</li>
        <li>{user.phoneNumber}</li>
      </ul>
    </>
  );
};
