export interface LoginResponse {
  data: {
    accessToken: string;
    profile: {
      email: string;
      first_name: string;
      last_name: string;
      role: string;
      status: string;
      _id: string;
    };
    refreshToken: string;
  };
  message: string;
}
