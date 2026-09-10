import { apiClient } from "./apiClient";

export const authService = {
  login: async (email, password) => {
    return await apiClient("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },
};
