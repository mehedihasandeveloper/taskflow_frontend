import { Calendar, Pencil, Trash2 } from "lucide-react";
import Avatar from "../Avatar";
import Badge from "../Badge";
import { formatDate, isOverdue } from "@/lib/format";
import { Task, TASK_STATUSES, TaskStatus } from "@/lib/taskTypes";

type Props = {
  task: Task;
  onEdit: (t: Task) => void;
  onDelete: (t: Task) => void;
  onStatusChange: (t: Task, status: TaskStatus) => void;
};

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }: Props) {
  const done = task.status === "Completed";
  const overdue = isOverdue(task.dueDate, done);

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <h3 className={`text-sm font-medium ${done ? "text-slate-400 line-through" : "text-slate-900"}`}>{task.title}</h3>
        <Badge label={task.priority} />
      </div>
      {task.description && <p className="mt-1 line-clamp-2 text-xs text-slate-500">{task.description}</p>}
      <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
        {task.dueDate ? (
          <p className={`flex items-center gap-1.5 text-xs ${overdue ? "font-medium text-red-600" : "text-slate-500"}`}>
            <Calendar size={12} /> {formatDate(task.dueDate)}{overdue && " · Overdue"}
          </p>
        ) : <span />}
        {task.assignee && (
          <p className="flex items-center gap-1.5 text-xs text-slate-600" title={`Assigned to ${task.assignee.name}`}>
            <Avatar name={task.assignee.name} size={18} /> {task.assignee.name.split(" ")[0]}
          </p>
        )}
      </div>
      <div className="mt-3 flex items-center justify-between gap-2 border-t border-slate-100 pt-2">
        <select
          aria-label={`Change status of ${task.title}`}
          value={task.status}
          onChange={(e) => onStatusChange(task, e.target.value as TaskStatus)}
          className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs outline-none focus:border-blue-500"
        >
          {TASK_STATUSES.map((s) => <option key={s}>{s}</option>)}
        </select>
        <div className="flex gap-1">
          <button aria-label={`Edit ${task.title}`} onClick={() => onEdit(task)} className="rounded p-1.5 text-slate-500 hover:bg-slate-100 hover:text-blue-600"><Pencil size={14} /></button>
          <button aria-label={`Delete ${task.title}`} onClick={() => onDelete(task)} className="rounded p-1.5 text-slate-500 hover:bg-red-50 hover:text-red-600"><Trash2 size={14} /></button>
        </div>
      </div>
    </article>
  );
}
