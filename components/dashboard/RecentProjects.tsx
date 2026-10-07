import { FolderKanban } from "lucide-react";
import Panel from "./Panel";
import Badge from "../Badge";
import { recentProjects } from "@/lib/mockData";

export default function RecentProjects() {
  return (
    <Panel title="Recent Projects" href="/projects">
      <ul className="divide-y divide-slate-100">
        {recentProjects.map((p) => (
          <li key={p.id} className="flex items-center gap-3 py-3">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-600"><FolderKanban size={16} /></span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-slate-900">{p.name}</p>
              <p className="text-xs text-slate-500">{p.due}</p>
            </div>
            <Badge label={p.status} />
          </li>
        ))}
      </ul>
    </Panel>
  );
}