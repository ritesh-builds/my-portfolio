import axiosClient from "../api/axiosClient";

export function getAdminProjects() {
  return axiosClient.get("/api/admin/projects");
}

export function createAdminProject(payload) {
  return axiosClient.post("/api/admin/projects", payload);
}

export function updateAdminProject(id, payload) {
  return axiosClient.put(`/api/admin/projects/${id}`, payload);
}

export function deleteAdminProject(id) {
  return axiosClient.delete(`/api/admin/projects/${id}`);
}
