import interceptorInstance from "@/middleware/Interceptors";

/**
 * Fetches the active banners from the API.
 *
 * @returns {Promise<Object>} The response data containing active banners.
 * @throws {Error} If the API request fails, the error is thrown to be handled by the caller.
 */
export const getActiveBanner = async () => {
  const response = await interceptorInstance.get("/banner?status=true");
  return response?.data;
};
