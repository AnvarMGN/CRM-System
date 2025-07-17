class TokenManager {
  private accessToken: string | null = null;

  // constructor(private value?: string | null) {
  //   if (value) {
  //     this.accessToken = value;
  //   } else {
  //     this.accessToken = null;
  //   }
  // }

  setAccessToken = (token: string): void => {
    this.accessToken = token;
  };

  getAccessToken = (): string | null => {
    return this.accessToken;
  };

  removeAccessToken = (): void => {
    this.accessToken = null;
  };

  setRefreshToken = (token: string): void => {
    localStorage.setItem("refreshToken", token);
  };

  getRefreshToken = (): string | null => {
    return localStorage.getItem("refreshToken");
  };

  removeRefreshToken = (): void => {
    localStorage.removeItem("refreshToken");
  };
}

export const tokenManager = new TokenManager();
