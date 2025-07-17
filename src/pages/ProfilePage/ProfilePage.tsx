import axios from "axios";
import { openNotification } from "../../notifications/notifications";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import {
  getUserProfileAction,
  updateTokenAction,
} from "../../store/auth-actions";
import { Card, Space, Typography } from "antd";

const { Text } = Typography;

export const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [isLoading, setLoading] = useState(false);

  const handleUpdateError = (notificatonDescription: string, error: Error) => {
    console.log(notificatonDescription, error.message);
    openNotification("Ошибка", notificatonDescription);
  };

  useEffect(() => {
    const thunkFunction = async () => {
      try {
        setLoading(true);
        await dispatch(updateTokenAction());
        await dispatch(getUserProfileAction());
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const errorStatusLabels = {
            400: "Произошла ошибка при обработке данных.",
            401: "Проверьте введенные данные или войдите снова.",
            500: "Внутренняя ошибка сервера.",
          };
          if (error.response) {
            switch (error.response.status) {
              case 400:
                handleUpdateError(
                  errorStatusLabels[error.response.status],
                  error
                );
                break;
              case 401:
                handleUpdateError(
                  errorStatusLabels[error.response.status],
                  error
                );
                break;
              case 500:
                handleUpdateError(
                  errorStatusLabels[error.response.status],
                  error
                );
                break;
              default:
                handleUpdateError("Неизвестная ошибка", error);
                break;
            }
          } else if (error.request) {
            console.log("Сервер не доступен.", error.message);
            openNotification("Ошибка", "Сервер не доступен.");
          } else {
            console.log("Неизвестная ошибка.", error.message);
            openNotification("Ошибка", "Неизвестная ошибка.");
          }
        } else {
          console.log("Неизвестная ошибка.", (error as Error).message);
          openNotification("Ошибка", "Неизвестная ошибка.");
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
      <Card>
        <Space direction="vertical">
          <Text>Привет!</Text>
          <Text>{user.username}</Text>
          <Text>{user.email}</Text>
          <Text>{user.phoneNumber}</Text>
        </Space>
      </Card>
    </>
  );
};
