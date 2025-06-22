import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { getUserRequestAction } from "../../store/auth-actions";

export const UserPage = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUserRequestAction());
  }, [dispatch]);

  return (
    <>
      <h1>Привет!</h1>
      <ul>
        <li>{user.username}</li>
        <li>{user.email}</li>
        <li>{user.phoneNumber}</li>
      </ul>
    </>
  );
};
