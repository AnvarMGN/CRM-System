// export enum Roles [
//   ADMIN = "ADMIN",
//   MODERATOR = "MODERATOR",
//   USER = "USER"
// ]

export type Roles = "ADMIN" | "MODERATOR" | "USER";

export interface User {
  id: number;
  username: string;
  email: string;
  date: string; // ISO date string
  isBlocked: boolean;
  roles: Roles[];
  phoneNumber: string;
}

export interface MetaResponse<T> {
  data: T[];
  meta: {
    totalAmount: number;
    sortBy: string;
    sortOrder: "asc" | "desc";
  };
}

export interface UserRequest {
  username?: string;
  email?: string;
  phoneNumber?: string;
}

export interface CombineData {
  id: number;
  userData: UserRequest;
}

export interface UserFilters {
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  isBlocked?: boolean;
  limit?: number; 
  offset?: number;
}

export interface CombineDataRights {
  id: number;
  roles: Roles[];
}
