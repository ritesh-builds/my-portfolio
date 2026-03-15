import axiosClient from "../api/axiosClient";

export function getMessages(page = 0, size = 10) {
  return axiosClient.get("/api/admin/messages", {
    params: { page, size }
  });
}
