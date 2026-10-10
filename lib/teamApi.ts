import { apiFetch } from "./api";
import { Member } from "./types";

export type TeammateProject = { id: string; name: string; isOwner: boolean; canRemove: boolean };
export type Teammate = Member & { projects: TeammateProject[] };

export const getProjectMembers = (projectId: string) =>
  apiFetch<{ owner: Member; members: Member[] }>(`/projects/${projectId}/members`);

export const addProjectMember = (projectId: string, email: string) =>
  apiFetch<{ member: Member }>(`/projects/${projectId}/members`, { method: "POST", body: JSON.stringify({ email }) }).then((d) => d.member);

export const removeProjectMember = (projectId: string, userId: string) =>
  apiFetch<{ message: string }>(`/projects/${projectId}/members/${userId}`, { method: "DELETE" });

export const getTeam = () => apiFetch<{ teammates: Teammate[]; ownedProjects: { id: string; name: string }[] }>("/team");
