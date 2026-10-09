export const PROJECT_STATUSES = ["Planning", "In Progress", "Completed", "Archived"] as const;
export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

export type Project = {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  startDate: string | null;
  dueDate: string | null;
  createdAt: string;
};

/** Values sent to the API. Empty date strings mean "no date". */
export type ProjectInput = {
  name: string;
  description: string;
  status: ProjectStatus;
  startDate: string;
  dueDate: string;
};

export type ProjectSort = "newest" | "oldest" | "name" | "due";