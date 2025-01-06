/** api/apiClient.ts */

import axios from "axios";

const BACKEND_URL = "http://127.0.0.1:8000";

const apiClient = axios.create({
  baseURL: BACKEND_URL,
});

export default apiClient;
