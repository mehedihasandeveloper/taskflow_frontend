import { apiFetch } from "./api";
import { Task, TaskInput, TaskPriority, TaskStatus } from "./taskTypes";

export type TaskSort = "newest" | "oldest" | "due";
export type TaskFilters = {
  search: string;
  status: TaskStatus | "";
  priority: TaskPriority | "";
  project: string;
  assigned: "me" | "";
  sort: TaskSort;
};

export const listTasks = (projectId: string) =>
  apiFetch<{ tasks: Task[] }>(`/projects/${projectId}/tasks`).then((d) => d.tasks);

/** Every task from every project the user owns or belongs to. */
export function listAllTasks(f: TaskFilters) {
  const params = new URLSearchParams({ sort: f.sort });
  if (f.search.trim()) params.set("search", f.search.trim());
  if (f.status) params.set("status", f.status);
  if (f.priority) params.set("priority", f.priority);
  if (f.project) params.set("project", f.project);
  if (f.assigned) params.set("assigned", f.assigned);
  return apiFetch<{ tasks: Task[] }>(`/tasks?${params}`).then((d) => d.tasks);
}

export const createTask = (projectId: string, input: TaskInput) =>
  apiFetch<{ task: Task }>(`/projects/${projectId}/tasks`, { method: "POST", body: JSON.stringify(input) }).then((d) => d.task);

export const updateTask = (id: string, input: Partial<TaskInput>) =>
  apiFetch<{ task: Task }>(`/tasks/${id}`, { method: "PATCH", body: JSON.stringify(input) }).then((d) => d.task);

export const deleteTask = (id: string) => apiFetch<{ message: string }>(`/tasks/${id}`, { method: "DELETE" });
