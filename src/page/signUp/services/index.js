import axios from "axios";

const API_URL = "https://backend-ftpl-production.up.railway.app/auth/sign-up"; // Replace with your actual API endpoint
const API_OTP = "https://backend-ftpl-production.up.railway.app/auth/verification"; // Replace with your actual API endpoint

/**
 * Function to submit sign-up form data to the API.
 * @param {Object} formData - The form data to be submitted.
 * @returns {Promise} - Returns a promise with the API response.
 */
export const signUpUser = async (formData) => {
  try {
    const response = await axios.post(API_URL, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data; // Return the API response
  } catch (error) {
    console.error("Error signing up:", error.response?.data || error.message);
    throw error; // Throw error to be handled in SignUp component
  }
};

/**
 * Function to verify OTP.
 * @param {Object} otpData - The OTP payload to be submitted.
 * @returns {Promise} - Returns a promise with the API response.
 */
export const otpVerification = async (otpData) => {
  try {
    const response = await axios.post(API_OTP, otpData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  console.log(otpData);
    return response.data; // Return the API response
  } catch (error) {
    console.error("Error verifying OTP:", error.response?.data || error.message);
    throw error; // Throw error to be handled in SignUp component
  }
};
