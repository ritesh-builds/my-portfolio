import axiosClient from "../api/axiosClient";

export function getSkills() {
  return axiosClient.get("/api/skills");
}
