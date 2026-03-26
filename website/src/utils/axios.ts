// apiClient.ts
import { toast } from "@/hooks/use-toast";
import axios, { AxiosInstance, AxiosError } from "axios";

export const axiosClient: AxiosInstance = axios.create({
  timeout: 10000,
});

// Interceptor para loguear errores
axiosClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const { config, response, request, message } = error;

    console.error("========================================================");
    console.error("========================================================");
    console.error("============================================[AXIOS ERROR]");
    console.error("========================================================");
    console.error("========================================================");

    console.error(`→ ${config?.method?.toUpperCase()} ${config?.url}`);

    if (response) {
      console.error(`← ${response.status} ${response.statusText}`);
      console.error("Response data:", response.data);

      //@ts-expect-error ignore
      const message = response.data?.message;

      if (message) {
        toast({
          title: "Error",
          description: message,
          variant: "destructive",
        });
      }
    } else if (request) {
      console.error("← No response received from server.");
    } else {
      console.error("← Error setting up request:", message);
    }

    return Promise.reject(error); // no altera la API
  },
);
