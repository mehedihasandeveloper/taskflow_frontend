"use client";
import { FormEvent, useState } from "react";
import { Lock } from "lucide-react";
import TextField from "../auth/TextField";
import FormError from "../auth/FormError";
import FormSuccess from "../ui/FormSuccess";
import SubmitButton from "../ui/SubmitButton";
import { PasswordValues, validatePasswordChange } from "@/lib/profileValidation";
import { changePassword } from "@/lib/userApi";

const empty: PasswordValues = { currentPassword: "", newPassword: "", confirmPassword: "" };

export default function PasswordForm() {
  const [values, setValues] = useState<PasswordValues>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof PasswordValues, string>>>({});
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (key: keyof PasswordValues) => (v: string) => setValues((p) => ({ ...p, [key]: v }));

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setServerError("");
    setSuccess("");
    const found = validatePasswordChange(values);
    setErrors(found);
    if (Object.keys(found).length) return;

    setLoading(true);
    try {
      await changePassword({ currentPassword: values.currentPassword, newPassword: values.newPassword });
      setValues(empty);
      setSuccess("Password updated successfully");
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <FormError message={serverError} />
      <FormSuccess message={success} />
      <TextField label="Current password" name="currentPassword" type="password" placeholder="Enter current password" autoComplete="current-password"
        icon={<Lock size={16} />} value={values.currentPassword} error={errors.currentPassword} onChange={set("currentPassword")} />
      <TextField label="New password" name="newPassword" type="password" placeholder="Create a new password" autoComplete="new-password"
        icon={<Lock size={16} />} value={values.newPassword} error={errors.newPassword} onChange={set("newPassword")} />
      <TextField label="Confirm new password" name="confirmPassword" type="password" placeholder="Confirm new password" autoComplete="new-password"
        icon={<Lock size={16} />} value={values.confirmPassword} error={errors.confirmPassword} onChange={set("confirmPassword")} />
      <div className="flex justify-end">
        <SubmitButton loading={loading}>Update password</SubmitButton>
      </div>
    </form>
  );
}