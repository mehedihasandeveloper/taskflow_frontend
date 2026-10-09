import Link from "next/link";
import { CheckCircle2, Circle } from "lucide-react";
import Panel from "./Panel";
import Badge from "../Badge";
import { DashboardData } from "@/lib/dashboardApi";

export default function RecentTasks({ tasks }: { tasks: DashboardData["recentTasks"] }) {
  return (
    <Panel title="Recent Tasks">
      {tasks.length === 0 ? (
        <p className="py-8 text-center text-sm text-slate-400">No tasks yet.</p>
      ) : (
        <ul className="divide-y divide-slate-100">
          {tasks.map((t) => {
            const done = t.status === "Completed";
            const row = (
              <>
                {done ? <CheckCircle2 size={18} className="shrink-0 text-emerald-500" /> : <Circle size={18} className="shrink-0 text-slate-300" />}
                <div className="min-w-0 flex-1">
                  <p className={`truncate text-sm font-medium ${done ? "text-slate-400 line-through" : "text-slate-900"}`}>{t.title}</p>
                  <p className="truncate text-xs text-slate-500">{t.projectName}</p>
                </div>
                <Badge label={t.priority} />
              </>
            );
            return (
              <li key={t.id}>
                {t.projectId ? (
                  <Link href={`/projects/${t.projectId}`} className="-mx-2 flex items-center gap-3 rounded-lg px-2 py-3 hover:bg-slate-50">{row}</Link>
                ) : (
                  <div className="flex items-center gap-3 py-3">{row}</div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </Panel>
  );
}