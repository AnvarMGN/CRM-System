import { TaskListPage } from "./pages/TaskListPage/TaskListPage";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { RootLayoutAuth } from "./pages/RootLayoutAUTH/RootLayoutAuth";
import { ErrorPage } from "./pages/ErrorPage/ErrorPage";
import { RegistrationPage } from "./pages/AuthPages/RegistrationPage/RegistrationPage";
import { AuthenticationPage } from "./pages/AuthPages/AuthenticationPage/AuthenticationPage";
import { ProfilePage } from "./pages/ProfilePage/ProfilePage";
import { ProtectedRoute } from "./pages/ProtectedRoute/ProtectedRoute";
import { UsersPage } from "./pages/AdminPages/UsersPage/UsersPage";
import { UserPage } from "./pages/AdminPages/UserPage/UserPage";

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="auth/signin" replace /> },
  // { index: true, element: <Navigate to="auth/signin" /> },
  // -- перенаправляет пользователя на /auth/signin.
  // -- index: true обозначает маршрут по умолчанию,
  // либо можно добавить относительный путь вместо index: true, path: "".
  // -- Атрибут replace гарантирует, что текущий маршрут не будет сохранен в истории браузера (это важно для логики навигации).
  {
    path: "/auth",
    element: <RootLayoutAuth />,
    errorElement: <ErrorPage />,
    children: [
      { path: "signin", element: <AuthenticationPage /> },
      { path: "signup", element: <RegistrationPage /> },
      { path: "*", element: <ErrorPage /> }, // Обрабатывает несуществующие пути
    ],
  },
  {
    path: "/crm",
    element: <ProtectedRoute />, // корневой маршрут(родительский)
    errorElement: <ErrorPage />,
    children: [
      { path: "todo", element: <TaskListPage /> },
      { path: "user", element: <ProfilePage /> },
      { path: "*", element: <ErrorPage /> },
    ],
  },
  {
    path: "/admin",
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      { path: "users", element: <UsersPage /> },
      { path: "user/:userId", element: <UserPage /> },
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
