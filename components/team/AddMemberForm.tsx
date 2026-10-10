"use client";
import { FormEvent, useState } from "react";
import { Mail, UserPlus } from "lucide-react";
import SubmitButton from "../ui/SubmitButton";
import FormError from "../auth/FormError";
import FormSuccess from "../ui/FormSuccess";
import { validateEmail } from "@/lib/validation";

type Props = {
  projects: { id: string; name: string }[];
  onAdd: (projectId: string, email: string) => Promise<void>;
};

const field = "rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

/** Adds a registered user (by email) to one of the given projects. Hides the project picker when there is only one. */
export default function AddMemberForm({ projects, onAdd }: Props) {
  const [picked, setPicked] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const projectId = projects.find((p) => p.id === picked)?.id ?? projects[0]?.id ?? "";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    const problem = validateEmail(email);
    if (problem) return setError(problem);
    if (!projectId) return setError("Choose a project first");

    setLoading(true);
    try {
      await onAdd(projectId, email.trim());
      setSuccess("Member added");
      setEmail("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-3">
      <FormError message={error} />
      <FormSuccess message={success} />
      <div className="flex flex-col gap-3 sm:flex-row">
        {projects.length > 1 && (
          <select aria-label="Project" value={projectId} onChange={(e) => setPicked(e.target.value)} className={field}>
            {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        )}
        <div className="relative flex-1">
          <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="teammate@example.com"
            aria-label="Teammate email"
            className={`${field} w-full pl-9`}
          />
        </div>
        <SubmitButton loading={loading}><UserPlus size={16} /> Add member</SubmitButton>
      </div>
      <p className="text-xs text-slate-500">They need a TaskFlow account first. Members can view the project and manage its tasks.</p>
    </form>
  );
}
