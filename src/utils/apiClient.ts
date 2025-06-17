// utils/apiClient.tsx
import axios from "axios";

// צור מופע של axios עם הגדרות ברירת מחדל
const apiClient = axios.create({
  baseURL: "https://sportkosher-server.up.railway.app/api", // הבסיס לכל הבקשות
});

// הוסף interceptor כדי לשים את הטוקן אוטומטית על כל בקשה
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
