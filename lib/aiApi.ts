import { apiFetch } from "./api";

export type ProjectSummary = {
  summary: string;
  key_insights: string[];
  recommendations: string[];
  progress_percentage: number;
};

export function generateProjectSummary(projectId: string) {
  return apiFetch<ProjectSummary>(`/projects/${projectId}/summary`, {
    method: "POST",
  });
}