"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { Mail, User as UserIcon } from "lucide-react";
import Avatar from "../Avatar";
import TextField from "../auth/TextField";
import FormError from "../auth/FormError";
import FormSuccess from "../ui/FormSuccess";
import SubmitButton from "../ui/SubmitButton";
import { useAuth } from "@/context/AuthContext";
import { resizeImageToDataUrl } from "@/lib/image";
import { validateProfile } from "@/lib/profileValidation";
import { updateProfile } from "@/lib/userApi";

export default function ProfileForm() {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [avatar, setAvatar] = useState<string | null>(user.avatar ?? null);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [avatarError, setAvatarError] = useState("");
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function pickFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = ""; // lets the user pick the same file again
    if (!file) return;
    try {
      setAvatar(await resizeImageToDataUrl(file));
      setAvatarError("");
    } catch (err) {
      setAvatarError(err instanceof Error ? err.message : "Could not use that image");
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setServerError("");
    setSuccess("");
    const found = validateProfile({ name, email });
    setErrors(found);
    if (Object.keys(found).length) return;

    setLoading(true);
    try {
      const { user: updated } = await updateProfile({ name, email, avatar });
      updateUser(updated);
      setSuccess("Profile updated successfully");
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <FormError message={serverError} />
      <FormSuccess message={success} />

      <div className="flex items-center gap-4">
        <Avatar name={name || user.name} src={avatar} size={72} />
        <div>
          <div className="flex gap-2">
            <label className="cursor-pointer rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              Upload photo
              <input type="file" accept="image/*" onChange={pickFile} className="sr-only" />
            </label>
            {avatar && (
              <button type="button" onClick={() => setAvatar(null)} className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50">
                Remove
              </button>
            )}
          </div>
          <p className="mt-1.5 text-xs text-slate-500">JPG, PNG or WebP. It is cropped to a square.</p>
          {avatarError && <p className="mt-1 text-xs text-red-600">{avatarError}</p>}
        </div>
      </div>

      <TextField label="Full name" name="name" placeholder="Your name" autoComplete="name" icon={<UserIcon size={16} />}
        value={name} error={errors.name} onChange={setName} />
      <TextField label="Email address" name="email" type="email" placeholder="you@example.com" autoComplete="email" icon={<Mail size={16} />}
        value={email} error={errors.email} onChange={setEmail} />

      <div className="flex justify-end">
        <SubmitButton loading={loading}>Save changes</SubmitButton>
      </div>
    </form>
  );
}