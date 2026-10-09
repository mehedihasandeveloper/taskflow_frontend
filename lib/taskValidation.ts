import { TaskInput } from "./taskTypes";

export function validateTask(v: TaskInput): Partial<Record<keyof TaskInput, string>> {
  const e: Partial<Record<keyof TaskInput, string>> = {};
  if (v.title.trim().length < 2) e.title = "Task title must be at least 2 characters";
  else if (v.title.trim().length > 120) e.title = "Task title is too long (max 120)";
  if (v.description.length > 1000) e.description = "Description must be 1000 characters or fewer";
  return e;
}