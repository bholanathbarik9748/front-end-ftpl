import interceptorInstance from "@/middleware/Interceptors";

export const forgotPasswordChangePassword = async (email: string) => {
  const reqBody = {
    email,
  };
  try {
    const response = await interceptorInstance.post(
      "/auth/forgot-password",
      reqBody
    );
    return response?.data;
  } catch (error) {
    throw error;
  }
};
