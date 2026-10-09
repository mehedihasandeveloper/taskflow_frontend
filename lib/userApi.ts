import { apiFetch } from "./api";
import type { User } from "@/context/AuthContext";

export type ProfileInput = { name: string; email: string; avatar: string | null };

export const updateProfile = (input: ProfileInput) =>
  apiFetch<{ user: User }>("/users/me", { method: "PATCH", body: JSON.stringify(input) });

export const changePassword = (input: { currentPassword: string; newPassword: string }) =>
  apiFetch<{ message: string }>("/users/me/password", { method: "PATCH", body: JSON.stringify(input) });