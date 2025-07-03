import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppSelector } from "../../store/hook";
import { RootLayoutCRM } from "../RootLayoutCRM/RootLayoutCRM";

export const ProtectedRoute = () => {
  const { isAuthorized } = useAppSelector((state) => state.auth);
  useEffect(() => {
    console.log("ProtectedRoute isAuthorized: ", isAuthorized);
  }, [isAuthorized]);

  if (!isAuthorized) {
    return <Navigate to="/auth/signin" />;
  }

  return <RootLayoutCRM />;
};
