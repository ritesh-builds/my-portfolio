import axiosClient from "../api/axiosClient";

export function loginAdmin(payload) {
  return axiosClient.post("/api/admin/auth/login", payload);
}
