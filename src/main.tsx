import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./style.css";
import { Provider } from "react-redux";
import { store } from "./store/index.ts";
import { updateTokenAction } from "./store/auth-actions.ts";
import { useEffect, useState } from "react";

export const Root = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const initialApp = async () => {
      await store.dispatch(updateTokenAction());
      setLoading(false);
    };

    initialApp();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

createRoot(document.getElementById("root")!).render(<Root />);
