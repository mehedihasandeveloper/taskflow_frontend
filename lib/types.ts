export const PROJECT_STATUSES = ["Planning", "In Progress", "Completed", "Archived"] as const;
export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

/** "owner" can edit/delete the project and manage members; "member" can work on its tasks. */
export type ProjectRole = "owner" | "member";

export type Project = {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  startDate: string | null;
  dueDate: string | null;
  createdAt: string;
  role: ProjectRole;
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

/** A person on a project (owner or member). */
export type Member = { id: string; name: string; email: string; avatar?: string };
