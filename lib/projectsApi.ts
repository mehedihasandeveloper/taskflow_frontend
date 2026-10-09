import { apiFetch } from "./api";
import { Project, ProjectInput, ProjectSort, ProjectStatus } from "./types";

export type ProjectQuery = { search: string; status: ProjectStatus | ""; sort: ProjectSort };

export async function listProjects({ search, status, sort }: ProjectQuery) {
  const params = new URLSearchParams({ sort });
  if (search.trim()) params.set("search", search.trim());
  if (status) params.set("status", status);
  const data = await apiFetch<{ projects: Project[] }>(`/projects?${params}`);
  return data.projects;
}

export const createProject = (input: ProjectInput) =>
  apiFetch<{ project: Project }>("/projects", { method: "POST", body: JSON.stringify(input) });

export const updateProject = (id: string, input: ProjectInput) =>
  apiFetch<{ project: Project }>(`/projects/${id}`, { method: "PATCH", body: JSON.stringify(input) });

export const deleteProject = (id: string) => apiFetch<{ message: string }>(`/projects/${id}`, { method: "DELETE" });
export const getProject = (id: string) => apiFetch<{ project: Project }>(`/projects/${id}`);