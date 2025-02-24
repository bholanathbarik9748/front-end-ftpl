import interceptorInstance from "@/middleware/Interceptors";
import { otpTypes, signUpTypes } from "../types/types";

/**
 * Handles user sign-up by sending form data to the authentication API.
 *
 * @param {signUpTypes} formData - The user sign-up details.
 * @returns {Promise<unknown>} - The response data from the API.
 * @throws {Error} - Throws an error if the sign-up request fails.
 */
export const signUpUser = async (formData: signUpTypes) => {
  const reqBody = {
    email: formData?.email,
    password: formData?.password,
    phoneNumber: formData?.phoneNumber,
    name: formData?.name,
    otp: formData?.otp,
  };
  try {
    const response = await interceptorInstance.post("/auth/sign-up", reqBody);
    return response?.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Handles OTP verification by sending OTP data to the authentication API.
 *
 * @param {otpTypes} otpData - The OTP payload for verification.
 * @returns {Promise<unknown>} - The response data from the API.
 * @throws {Error} - Throws an error if the OTP verification fails.
 */
export const otpVerification = async (otpData: otpTypes) => {
  try {
    const response = await interceptorInstance.post(
      "/auth/verification",
      otpData
    );
    return response?.data;
  } catch (error) {
    throw error;
  }
};
