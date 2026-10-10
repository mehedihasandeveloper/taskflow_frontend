"use client";
import { FormEvent, useState } from "react";
import { Task, TASK_PRIORITIES, TASK_STATUSES, TaskInput } from "@/lib/taskTypes";
import { Member } from "@/lib/types";
import { validateTask } from "@/lib/taskValidation";
import SubmitButton from "../ui/SubmitButton";
import FormError from "../auth/FormError";

type Props = {
  task?: Task;
  /** People who can be assigned (project owner + members). Hides the assignee field when empty. */
  members?: Member[];
  onSubmit: (v: TaskInput) => Promise<void>;
  onCancel: () => void;
};

const field = "w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

export default function TaskForm({ task, members = [], onSubmit, onCancel }: Props) {
  const [values, setValues] = useState<TaskInput>({
    title: task?.title ?? "",
    description: task?.description ?? "",
    status: task?.status ?? "Todo",
    priority: task?.priority ?? "Medium",
    dueDate: task?.dueDate ? task.dueDate.slice(0, 10) : "",
    assignee: task?.assignee?.id ?? "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof TaskInput, string>>>({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = <K extends keyof TaskInput>(key: K, value: TaskInput[K]) => setValues((p) => ({ ...p, [key]: value }));

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setServerError("");
    const found = validateTask(values);
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

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <FormError message={serverError} />
      <div>
        <label htmlFor="title" className="mb-1.5 block text-sm font-medium">Title</label>
        <input id="title" className={field} value={values.title} placeholder="e.g. Design homepage" onChange={(e) => set("title", e.target.value)} />
        {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title}</p>}
      </div>
      <div>
        <label htmlFor="description" className="mb-1.5 block text-sm font-medium">Description</label>
        <textarea id="description" rows={3} className={field} value={values.description} placeholder="Add some details..." onChange={(e) => set("description", e.target.value)} />
        {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description}</p>}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="status" className="mb-1.5 block text-sm font-medium">Status</label>
          <select id="status" className={field} value={values.status} onChange={(e) => set("status", e.target.value as TaskInput["status"])}>
            {TASK_STATUSES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="priority" className="mb-1.5 block text-sm font-medium">Priority</label>
          <select id="priority" className={field} value={values.priority} onChange={(e) => set("priority", e.target.value as TaskInput["priority"])}>
            {TASK_PRIORITIES.map((p) => <option key={p}>{p}</option>)}
          </select>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="dueDate" className="mb-1.5 block text-sm font-medium">Due date</label>
          <input id="dueDate" type="date" className={field} value={values.dueDate} onChange={(e) => set("dueDate", e.target.value)} />
        </div>
        {members.length > 0 && (
          <div>
            <label htmlFor="assignee" className="mb-1.5 block text-sm font-medium">Assignee</label>
            <select id="assignee" className={field} value={values.assignee} onChange={(e) => set("assignee", e.target.value)}>
              <option value="">Unassigned</option>
              {members.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
            </select>
          </div>
        )}
      </div>
      <div className="flex justify-end gap-3 pt-2">
        <button type="button" onClick={onCancel} className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">Cancel</button>
        <SubmitButton loading={loading}>{task ? "Save changes" : "Create task"}</SubmitButton>
      </div>
    </form>
  );
}
