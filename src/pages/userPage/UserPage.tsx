import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import {
  getUserRequestAction,
  updateTokenAction,
} from "../../store/auth-actions";

export const UserPage = () => {
  const dispatch = useAppDispatch();
  const { user, accessTokenAuth } = useAppSelector((state) => state.auth);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!accessTokenAuth) {
      console.log("AccessToken отсутсвует.");
      return;
    }

    const getUserData = async () => {
      try {
        setLoading(true);
        await dispatch(updateTokenAction());
        await dispatch(getUserRequestAction(accessTokenAuth));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, [accessTokenAuth, dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
