import { useAppSelector } from "../../store/hook";
import { Navigate } from "react-router-dom";
import { RootLayoutCRM } from "../RootLayoutCRM/RootLayoutCRM";
import { useEffect } from "react";

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
