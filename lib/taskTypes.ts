export const TASK_STATUSES = ["Todo", "In Progress", "Completed"] as const;
export const TASK_PRIORITIES = ["Low", "Medium", "High"] as const;
export type TaskStatus = (typeof TASK_STATUSES)[number];
export type TaskPriority = (typeof TASK_PRIORITIES)[number];

export type Task = {
  id: string;
  project: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string | null;
  createdAt: string;
};

/** Values sent to the API. An empty dueDate means "no date". */
export type TaskInput = {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
};