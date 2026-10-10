export const TASK_STATUSES = ["Todo", "In Progress", "Completed"] as const;
export const TASK_PRIORITIES = ["Low", "Medium", "High"] as const;
export type TaskStatus = (typeof TASK_STATUSES)[number];
export type TaskPriority = (typeof TASK_PRIORITIES)[number];

export type TaskAssignee = { id: string; name: string; email: string };

export type Task = {
  id: string;
  project: string;
  projectName: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string | null;
  assignee: TaskAssignee | null;
  createdAt: string;
};

/** Values sent to the API. Empty dueDate = no date, empty assignee = unassigned. */
export type TaskInput = {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  assignee: string;
};
