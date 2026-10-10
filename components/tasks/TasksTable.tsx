import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import Avatar from "../Avatar";
import Badge from "../Badge";
import { formatDate, isOverdue } from "@/lib/format";
import { Task, TASK_STATUSES, TaskStatus } from "@/lib/taskTypes";

type Props = {
  tasks: Task[];
  onEdit: (t: Task) => void;
  onDelete: (t: Task) => void;
  onStatusChange: (t: Task, status: TaskStatus) => void;
};

export default function TasksTable({ tasks, onEdit, onDelete, onStatusChange }: Props) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-4 py-3 font-medium">Task</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Priority</th>
            <th className="hidden px-4 py-3 font-medium md:table-cell">Assignee</th>
            <th className="hidden px-4 py-3 font-medium sm:table-cell">Due</th>
            <th className="px-4 py-3"><span className="sr-only">Actions</span></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {tasks.map((t) => {
            const done = t.status === "Completed";
            const overdue = isOverdue(t.dueDate, done);
            return (
              <tr key={t.id} className="hover:bg-slate-50/60">
                <td className="max-w-xs px-4 py-3">
                  <p className={`truncate font-medium ${done ? "text-slate-400 line-through" : "text-slate-900"}`}>{t.title}</p>
                  <Link href={`/projects/${t.project}`} className="text-xs text-slate-500 hover:text-blue-600">{t.projectName}</Link>
                </td>
                <td className="px-4 py-3">
                  <select
                    aria-label={`Change status of ${t.title}`}
                    value={t.status}
                    onChange={(e) => onStatusChange(t, e.target.value as TaskStatus)}
                    className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs outline-none focus:border-blue-500"
                  >
                    {TASK_STATUSES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </td>
                <td className="px-4 py-3"><Badge label={t.priority} /></td>
                <td className="hidden px-4 py-3 md:table-cell">
                  {t.assignee ? (
                    <span className="flex items-center gap-2 text-slate-700"><Avatar name={t.assignee.name} size={22} />{t.assignee.name}</span>
                  ) : (
                    <span className="text-slate-400">Unassigned</span>
                  )}
                </td>
                <td className={`hidden whitespace-nowrap px-4 py-3 sm:table-cell ${overdue ? "font-medium text-red-600" : "text-slate-600"}`}>
                  {t.dueDate ? formatDate(t.dueDate) : "—"}{overdue && " · Overdue"}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1">
                    <button aria-label={`Edit ${t.title}`} onClick={() => onEdit(t)} className="rounded p-1.5 text-slate-500 hover:bg-slate-100 hover:text-blue-600"><Pencil size={15} /></button>
                    <button aria-label={`Delete ${t.title}`} onClick={() => onDelete(t)} className="rounded p-1.5 text-slate-500 hover:bg-red-50 hover:text-red-600"><Trash2 size={15} /></button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
