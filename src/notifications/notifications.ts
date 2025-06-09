import { notification } from "antd";

export const openNotification = (message: string) => {
  notification.error({
    message: "Ошибка",
    description: `Что-то пошло не так: ${message}`,
    duration: 5,
    placement: "bottomRight",
    showProgress: true,
  });
};
