import axios from "axios";
import {
  type AuthData,
  type Token,
  type UserRegistration,
} from "../types/auth";
import { tokens } from "../util/auth";

const baseURL = "https://easydev.club/api/v1";

const authApi = axios.create({
  baseURL: baseURL,
});

authApi.interceptors.request.use(
  function (config) {
    const accessToken = tokens.getAccessToken();
    // console.log("at", accessToken);

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const userRegistration = async (newUser: UserRegistration) => {
  try {
    const response = await authApi.post<UserRegistration>(
      `/auth/signup`,
      newUser
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const userAuthentication = async (userAuthData: AuthData) => {
  try {
    const response = await authApi.post<Token>(`/auth/signin`, userAuthData);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateToken = async (refreshToken: string) => {
  try {
    const response = await authApi.post<Token>(`auth/refresh`, {
      refreshToken,
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUserRequest = async () => {
  try {
    const response = await authApi.get(`/user/profile`);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
