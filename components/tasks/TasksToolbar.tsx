import { Search } from "lucide-react";
import { TaskFilters, TaskSort } from "@/lib/tasksApi";
import { TASK_PRIORITIES, TASK_STATUSES, TaskPriority, TaskStatus } from "@/lib/taskTypes";
import { Project } from "@/lib/types";

type Props = { filters: TaskFilters; projects: Project[]; onChange: (patch: Partial<TaskFilters>) => void };

const select = "rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

export default function TasksToolbar({ filters, projects, onChange }: Props) {
  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 lg:flex-row">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={filters.search}
            onChange={(e) => onChange({ search: e.target.value })}
            placeholder="Search tasks..."
            aria-label="Search tasks"
            className={`${select} w-full pl-9`}
          />
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:flex">
          <select aria-label="Filter by status" value={filters.status} onChange={(e) => onChange({ status: e.target.value as TaskStatus | "" })} className={select}>
            <option value="">All statuses</option>
            {TASK_STATUSES.map((s) => <option key={s}>{s}</option>)}
          </select>
          <select aria-label="Filter by priority" value={filters.priority} onChange={(e) => onChange({ priority: e.target.value as TaskPriority | "" })} className={select}>
            <option value="">All priorities</option>
            {TASK_PRIORITIES.map((p) => <option key={p}>{p}</option>)}
          </select>
          <select aria-label="Filter by project" value={filters.project} onChange={(e) => onChange({ project: e.target.value })} className={select}>
            <option value="">All projects</option>
            {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
          <select aria-label="Sort tasks" value={filters.sort} onChange={(e) => onChange({ sort: e.target.value as TaskSort })} className={select}>
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="due">Due date</option>
          </select>
        </div>
      </div>
      <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-slate-600">
        <input
          type="checkbox"
          checked={filters.assigned === "me"}
          onChange={(e) => onChange({ assigned: e.target.checked ? "me" : "" })}
          className="h-4 w-4 rounded border-slate-300"
        />
        Assigned to me
      </label>
    </div>
  );
}
