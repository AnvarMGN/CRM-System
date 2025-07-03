export interface UserRegistration {
  login: string;
  username: string;
  password: string;
  email: string;
  phoneNumber?: string;
}

export interface AuthData {
  login: string;
  password: string;
}

export interface RefreshToken {
  refreshToken: string;
}

export interface Token {
  accessToken: string;
  refreshToken: string;
}

export interface ProfileRequest {
  username: string;
  email: string;
  phoneNumber: string;
}
