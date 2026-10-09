import { apiFetch } from "./api";
import { Task, TaskInput } from "./taskTypes";

export const listTasks = (projectId: string) =>
  apiFetch<{ tasks: Task[] }>(`/projects/${projectId}/tasks`).then((d) => d.tasks);

export const createTask = (projectId: string, input: TaskInput) =>
  apiFetch<{ task: Task }>(`/projects/${projectId}/tasks`, { method: "POST", body: JSON.stringify(input) }).then((d) => d.task);

export const updateTask = (id: string, input: Partial<TaskInput>) =>
  apiFetch<{ task: Task }>(`/tasks/${id}`, { method: "PATCH", body: JSON.stringify(input) }).then((d) => d.task);

export const deleteTask = (id: string) => apiFetch<{ message: string }>(`/tasks/${id}`, { method: "DELETE" });