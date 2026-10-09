import { Search } from "lucide-react";
import { PROJECT_STATUSES, ProjectSort, ProjectStatus } from "@/lib/types";

type Props = {
  search: string;
  status: ProjectStatus | "";
  sort: ProjectSort;
  onSearch: (v: string) => void;
  onStatus: (v: ProjectStatus | "") => void;
  onSort: (v: ProjectSort) => void;
};

const select = "rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

export default function ProjectsToolbar({ search, status, sort, onSearch, onStatus, onSort }: Props) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <div className="relative flex-1">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search projects..."
          aria-label="Search projects"
          className={`${select} w-full pl-9`}
        />
      </div>
      <select aria-label="Filter by status" value={status} onChange={(e) => onStatus(e.target.value as ProjectStatus | "")} className={select}>
        <option value="">All statuses</option>
        {PROJECT_STATUSES.map((s) => <option key={s}>{s}</option>)}
      </select>
      <select aria-label="Sort projects" value={sort} onChange={(e) => onSort(e.target.value as ProjectSort)} className={select}>
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
        <option value="name">Name (A–Z)</option>
        <option value="due">Due date</option>
      </select>
    </div>
  );
}