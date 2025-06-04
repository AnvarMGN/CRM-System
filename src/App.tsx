import { TaskListPage } from "./pages/TaskListPage/TaskListPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserPage } from "./pages/userPage/UserPage";
import { RootLayout } from "./pages/RootLayout/RootLayout";
import { ErrorPage } from "./pages/ErrorPage/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      // { path: "*", element: <ErrorPage /> }, // Обрабатывает несуществующие пути
      { path: "/", element: <TaskListPage /> },
      { path: "/user", element: <UserPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
