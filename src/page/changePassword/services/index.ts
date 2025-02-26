import interceptorInstance from "@/middleware/Interceptors";

export const sendEmailForgotPassword = async (
  id: string,
  newPassword: string
) => {
  const reqBody = {
    newPassword,
  };
  try {
    const response = await interceptorInstance.post(
      `/auth/forgot-password/change-password/${id}`,
      reqBody
    );
    return response?.data;
  } catch (error) {
    throw error;
  }
};
