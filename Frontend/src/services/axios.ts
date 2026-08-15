import axios from "axios";
import { useAuth } from "@clerk/react";
import { useEffect } from "react";

export const api = axios.create({
  baseURL: "http://localhost:8000/api/v1",
});

export function AxiosInterceptor() {
  const { getToken } = useAuth();

  useEffect(() => {
    const interceptor = api.interceptors.request.use(
      async (config) => {
        const token = await getToken();

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => Promise.reject(error),
    );

    return () => {
      api.interceptors.request.eject(interceptor);
    };
  }, [getToken]);

  return null;
}
