import { TaskListPage } from "./pages/TaskListPage/TaskListPage";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { UserPage } from "./pages/UserPage/UserPage";
import { RootLayoutCRM } from "./pages/RootLayoutCRM/RootLayoutCRM";
import { ErrorPage } from "./pages/ErrorPage/ErrorPage";
import { RootLayoutAuth } from "./pages/RootLayoutAUTH/RootLayoutAuth";
import { AuthenticationPage } from "./pages/AuthenticationPage/AuthenticationPage";
import { RegistrationPage } from "./pages/RegistrationPage/RegistrationPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayoutAuth />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Navigate to="auth/signin" /> },
      //перенаправляет пользователя на /auth/signin.
      // -- index: true обозначает маршрут по умолчанию,
      // либо можно добавить относительный путь вместо index: true, path: "".
      // -- Атрибут replace гарантирует, что текущий маршрут не будет сохранен
      // в истории браузера (это важно для логики навигации).
      { path: "auth/signin", element: <AuthenticationPage /> },
      { path: "auth/signup", element: <RegistrationPage /> },
      // { path: "*", element: <ErrorPage /> }, // Обрабатывает несуществующие пути
    ],
  },
  {
    path: "/crm",
    element: <RootLayoutCRM />, // корневой маршрут(родительский)
    errorElement: <ErrorPage />,
    children: [
      { path: "todo", element: <TaskListPage /> },
      { path: "user", element: <UserPage /> },
      // { path: "*", element: <ErrorPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
