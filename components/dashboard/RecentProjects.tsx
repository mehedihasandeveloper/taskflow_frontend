import Link from "next/link";
import { FolderKanban } from "lucide-react";
import Panel from "./Panel";
import Badge from "../Badge";
import { formatDate } from "@/lib/format";
import { Project } from "@/lib/types";

export default function RecentProjects({ projects }: { projects: Project[] }) {
  return (
    <Panel title="Recent Projects" href="/projects">
      {projects.length === 0 ? (
        <p className="py-8 text-center text-sm text-slate-400">No projects yet. Create your first one!</p>
      ) : (
        <ul className="divide-y divide-slate-100">
          {projects.map((p) => (
            <li key={p.id}>
              <Link href={`/projects/${p.id}`} className="-mx-2 flex items-center gap-3 rounded-lg px-2 py-3 hover:bg-slate-50">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-600"><FolderKanban size={16} /></span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-900">{p.name}</p>
                  <p className="text-xs text-slate-500">{p.dueDate ? `Due ${formatDate(p.dueDate)}` : "No due date"}</p>
                </div>
                <Badge label={p.status} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Panel>
  );
}