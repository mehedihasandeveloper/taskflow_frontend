"use client";
import { FormEvent, useState } from "react";
import { Project, PROJECT_STATUSES, ProjectInput } from "@/lib/types";
import { validateProject } from "@/lib/projectValidation";
import SubmitButton from "../ui/SubmitButton";
import FormError from "../auth/FormError";

type Props = { project?: Project; onSubmit: (v: ProjectInput) => Promise<void>; onCancel: () => void };

const toDateInput = (iso: string | null) => (iso ? iso.slice(0, 10) : "");
const field = "w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

export default function ProjectForm({ project, onSubmit, onCancel }: Props) {
  const [values, setValues] = useState<ProjectInput>({
    name: project?.name ?? "",
    description: project?.description ?? "",
    status: project?.status ?? "Planning",
    startDate: toDateInput(project?.startDate ?? null),
    dueDate: toDateInput(project?.dueDate ?? null),
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ProjectInput, string>>>({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = <K extends keyof ProjectInput>(key: K, value: ProjectInput[K]) =>
    setValues((p) => ({ ...p, [key]: value }));

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setServerError("");
    const found = validateProject(values);
    setErrors(found);
    if (Object.keys(found).length) return;

    setLoading(true);
    try {
      await onSubmit(values);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  }

  const Err = ({ k }: { k: keyof ProjectInput }) =>
    errors[k] ? <p className="mt-1 text-xs text-red-600">{errors[k]}</p> : null;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <FormError message={serverError} />
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium">Project name</label>
        <input id="name" className={field} value={values.name} placeholder="e.g. Website Redesign" onChange={(e) => set("name", e.target.value)} />
        <Err k="name" />
      </div>
      <div>
        <label htmlFor="description" className="mb-1.5 block text-sm font-medium">Description</label>
        <textarea id="description" rows={3} className={field} value={values.description} placeholder="What is this project about?" onChange={(e) => set("description", e.target.value)} />
        <Err k="description" />
      </div>
      <div>
        <label htmlFor="status" className="mb-1.5 block text-sm font-medium">Status</label>
        <select id="status" className={field} value={values.status} onChange={(e) => set("status", e.target.value as ProjectInput["status"])}>
          {PROJECT_STATUSES.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="startDate" className="mb-1.5 block text-sm font-medium">Start date</label>
          <input id="startDate" type="date" className={field} value={values.startDate} onChange={(e) => set("startDate", e.target.value)} />
        </div>
        <div>
          <label htmlFor="dueDate" className="mb-1.5 block text-sm font-medium">Due date</label>
          <input id="dueDate" type="date" className={field} value={values.dueDate} onChange={(e) => set("dueDate", e.target.value)} />
          <Err k="dueDate" />
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-2">
        <button type="button" onClick={onCancel} className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">Cancel</button>
        <SubmitButton loading={loading}>{project ? "Save changes" : "Create project"}</SubmitButton>
      </div>
    </form>
  );
}