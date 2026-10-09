import { ProjectInput } from "./types";

export function validateProject(v: ProjectInput): Partial<Record<keyof ProjectInput, string>> {
  const e: Partial<Record<keyof ProjectInput, string>> = {};
  if (v.name.trim().length < 2) e.name = "Project name must be at least 2 characters";
  else if (v.name.trim().length > 100) e.name = "Project name is too long (max 100)";
  if (v.description.length > 500) e.description = "Description must be 500 characters or fewer";
  if (v.startDate && v.dueDate && v.dueDate < v.startDate) e.dueDate = "Due date cannot be before the start date";
  return e;
}