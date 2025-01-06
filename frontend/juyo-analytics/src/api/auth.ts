/** api/login.ts */

import apiClient from "./apiClient";

export interface LoginData {
  email: string;
  password: string;
}

export function login(values: LoginData) {
  return apiClient.post("/Login/", values);
}


export function signup(values: { username: any; email: any; password: any; }) {
  return apiClient.post("/register/", values);
}
