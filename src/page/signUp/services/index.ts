import interceptorInstance from "@/middleware/Interceptors";
import { signUpTypes } from "../types/types";

export const signUpService = async (fromData: signUpTypes) => {
  try {
    const response = await interceptorInstance.post("/auth/sign-up", fromData);
    return response?.data;
  } catch (error) {
    throw error;
  }
};
