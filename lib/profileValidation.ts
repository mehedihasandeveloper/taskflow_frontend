import { validateEmail } from "./validation";

export type ProfileValues = { name: string; email: string };
export type PasswordValues = { currentPassword: string; newPassword: string; confirmPassword: string };

export function validateProfile(v: ProfileValues) {
  const e: Partial<Record<keyof ProfileValues, string>> = {};
  if (v.name.trim().length < 2) e.name = "Name must be at least 2 characters";
  else if (v.name.trim().length > 50) e.name = "Name is too long (max 50)";
  const email = validateEmail(v.email);
  if (email) e.email = email;
  return e;
}

export function validatePasswordChange(v: PasswordValues) {
  const e: Partial<Record<keyof PasswordValues, string>> = {};
  if (!v.currentPassword) e.currentPassword = "Current password is required";
  if (v.newPassword.length < 8) e.newPassword = "Password must be at least 8 characters";
  else if (!/[A-Za-z]/.test(v.newPassword) || !/\d/.test(v.newPassword)) e.newPassword = "Use at least one letter and one number";
  if (!v.confirmPassword) e.confirmPassword = "Please confirm your new password";
  else if (v.confirmPassword !== v.newPassword) e.confirmPassword = "Passwords do not match";
  return e;
}