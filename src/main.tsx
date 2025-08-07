import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./style.css";
import { Provider } from "react-redux";
import { store } from "./store/index.ts";
import { updateTokenAction } from "./store/auth-actions.ts";
import axios from "axios";

const initialApp = async () => {
  try {
    await store.dispatch(updateTokenAction());
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
            console.log(
              errorStatusLabels[error.response.status],
              error.message
            );
            break;
          case 401:
            console.log(
              errorStatusLabels[error.response.status],
              error.message
            );
            break;
          case 500:
            console.log(
              errorStatusLabels[error.response.status],
              error.message
            );
            break;
          default:
            console.log("Неизвестная ошибка", error.message);
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

export const Root = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

initialApp().then(() => {
  createRoot(document.getElementById("root")!).render(<Root />);
});
