import axios, { type AxiosResponse } from "axios";
import { tokenManager } from "../util/auth";
import type {
  MetaResponse,
  Roles,
  User,
  UserFilters,
  UserRequest,
} from "../types/users";

const baseURL = "https://easydev.club/api/v1";

const usersApi = axios.create({
  baseURL: baseURL,
});

usersApi.interceptors.request.use(
  function (config) {
    const accessToken = tokenManager.getAccessToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const fetchUsers = async (filters: UserFilters) => {
  try {
    const response = await usersApi.get<MetaResponse<User>>(`/admin/users`, {
      params: filters,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchUser = async (userId: number) => {
  try {
    const response = await usersApi.get<User>(`/admin/users/${userId}`, {});
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const editUser = async (userId: number, userData: UserRequest) => {
  try {
    const response = await usersApi.put<User>(`/admin/users/${userId}`, {
      username: userData.username,
      email: userData.email,
      phoneNumber: userData.phoneNumber,
    });
    console.log("Данные успешно обновлены: ", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteUser = async (userId: number) => {
  try {
    const response = await usersApi.delete(`/admin/users/${userId}`);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const blockUser = async (userId: number) => {
  try {
    const response = await usersApi.post<User>(`/admin/users/${userId}/block`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const unblockUser = async (userId: number) => {
  try {
    const response = await usersApi.post<User>(`/admin/users/${userId}/unblock`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const editRightsUser = async (userId: number, roles: Roles[]) => {
  try {
    const response = await usersApi.post<AxiosResponse<User>>(
      `/admin/users/${userId}/rights`,
      {
        roles,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
