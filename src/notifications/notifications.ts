import { notification } from "antd";

export const openNotification = (notificatonName: string, notificatonDescription: string) => {
  notification.open({
    message: notificatonName,
    description: notificatonDescription,
    duration: 5,
    placement: "bottomRight",
    showProgress: true,
  });
};
