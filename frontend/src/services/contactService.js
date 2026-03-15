import axiosClient from "../api/axiosClient";

export function submitContact(payload) {
  return axiosClient.post("/api/contact", payload);
}
