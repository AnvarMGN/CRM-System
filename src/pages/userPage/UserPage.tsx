import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import {
  getUserRequestAction,
  updateTokenAction,
} from "../../store/auth-actions";
// import { getAccessToken, getRefreshToken } from "../../util/auth";

export const UserPage = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [isLoading, setLoading] = useState(false);

  // console.log("at", getAccessToken());
  // console.log("rt", getRefreshToken());

  useEffect(() => {
    const thunkFunction = async () => {
      try {
        setLoading(true);
        await dispatch(updateTokenAction());
        await dispatch(getUserRequestAction());
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    thunkFunction();
  }, [dispatch]);

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
