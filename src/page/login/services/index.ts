import interceptorInstance from "@/middleware/Interceptors";
import { loginTypes } from "@/page/login/types/types";

export const loginService = async (fromData: loginTypes) => {
  try {
    const response = await interceptorInstance.post("/auth/login", fromData);
    return response?.data;
  } catch (error) {
    throw error;
  }
};
