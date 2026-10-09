import TaskCard from "./TaskCard";
import { Task, TASK_STATUSES, TaskStatus } from "@/lib/taskTypes";

const headerColor: Record<TaskStatus, string> = {
  Todo: "text-slate-700",
  "In Progress": "text-blue-600",
  Completed: "text-emerald-600",
};

type Props = {
  tasks: Task[];
  onEdit: (t: Task) => void;
  onDelete: (t: Task) => void;
  onStatusChange: (t: Task, status: TaskStatus) => void;
};

export default function TaskBoard({ tasks, onEdit, onDelete, onStatusChange }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {TASK_STATUSES.map((status) => {
        const column = tasks.filter((t) => t.status === status);
        return (
          <section key={status} className="rounded-xl bg-slate-100/80 p-3">
            <h2 className={`mb-3 flex items-center justify-between px-1 text-sm font-semibold ${headerColor[status]}`}>
              {status}
              <span className="rounded-full bg-white px-2 py-0.5 text-xs text-slate-500">{column.length}</span>
            </h2>
            <div className="space-y-3">
              {column.length === 0 && <p className="rounded-lg border border-dashed border-slate-300 py-6 text-center text-xs text-slate-400">No tasks</p>}
              {column.map((t) => (
                <TaskCard key={t.id} task={t} onEdit={onEdit} onDelete={onDelete} onStatusChange={onStatusChange} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}