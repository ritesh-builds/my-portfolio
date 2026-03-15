import axiosClient from "../api/axiosClient";

export function getProjects() {
  return axiosClient.get("/api/projects");
}
