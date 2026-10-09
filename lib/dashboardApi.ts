import { apiFetch } from "./api";
import { Project } from "./types";
import { TaskPriority, TaskStatus } from "./taskTypes";

export type DashboardData = {
  stats: {
    projects: number;
    tasks: number;
    completed: number;
    pending: number;
    projectsThisWeek: number;
    tasksThisWeek: number;
    completedThisWeek: number;
    pendingThisWeek: number;
  };
  recentProjects: Project[];
  recentTasks: {
    id: string;
    title: string;
    status: TaskStatus;
    priority: TaskPriority;
    projectId: string | null;
    projectName: string;
  }[];
};

export const getDashboard = () => apiFetch<DashboardData>("/dashboard");