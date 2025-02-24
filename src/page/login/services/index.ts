import interceptorInstance from "@/middleware/Interceptors";
import { loginTypes } from "@/page/login/types/types";

/**
 * Handles user login by sending credentials to the authentication API.
 *
 * @param {loginTypes} fromData - The user login details (email and password).
 * @returns {Promise<unknown>} - The response data from the API.
 * @throws {Error} - Throws an error if the login request fails.
 */
export const loginService = async (fromData: loginTypes) => {
  try {
    const response = await interceptorInstance.post("/auth/login", fromData);
    return response?.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};
