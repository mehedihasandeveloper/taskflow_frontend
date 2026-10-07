// TEMPORARY sample data. Replaced with real API data when we build Projects and Tasks.
export type ProjectStatus = "Planning" | "In Progress" | "Completed" | "Archived";
export type TaskPriority = "Low" | "Medium" | "High";

export const stats = { projects: 8, tasks: 42, completed: 25, pending: 17 };

export const recentProjects: { id: string; name: string; due: string; status: ProjectStatus }[] = [
  { id: "1", name: "Website Redesign", due: "Due Oct 30, 2026", status: "In Progress" },
  { id: "2", name: "Mobile App Development", due: "Due Nov 15, 2026", status: "Planning" },
  { id: "3", name: "Marketing Campaign", due: "Due Oct 12, 2026", status: "Completed" },
  { id: "4", name: "Product Roadmap", due: "Due Dec 05, 2026", status: "In Progress" },
];

export const recentTasks: { id: string; title: string; project: string; priority: TaskPriority; done: boolean }[] = [
  { id: "1", title: "Design homepage", project: "Website Redesign", priority: "High", done: false },
  { id: "2", title: "API integration", project: "Mobile App Development", priority: "Medium", done: false },
  { id: "3", title: "Write documentation", project: "Product Roadmap", priority: "Low", done: false },
  { id: "4", title: "Fix login bug", project: "Website Redesign", priority: "High", done: false },
  { id: "5", title: "Create marketing assets", project: "Marketing Campaign", priority: "Medium", done: true },
];