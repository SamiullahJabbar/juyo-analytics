/** types.ts */

export interface LoginApiResponse {
  status: string;
  error: string;
  data: {
    token: string;
  };
}

export interface SignupApiResponse {
  status: string;
  error: string;
  data: {
    token: string;
  };
}
