import { CheckCircle2, Circle } from "lucide-react";
import Panel from "./Panel";
import Badge from "../Badge";
import { recentTasks } from "@/lib/mockData";

export default function RecentTasks() {
  return (
    <Panel title="Recent Tasks" href="/tasks">
      <ul className="divide-y divide-slate-100">
        {recentTasks.map((t) => (
          <li key={t.id} className="flex items-center gap-3 py-3">
            {t.done ? <CheckCircle2 size={18} className="shrink-0 text-emerald-500" /> : <Circle size={18} className="shrink-0 text-slate-300" />}
            <div className="min-w-0 flex-1">
              <p className={`truncate text-sm font-medium ${t.done ? "text-slate-400 line-through" : "text-slate-900"}`}>{t.title}</p>
              <p className="truncate text-xs text-slate-500">{t.project}</p>
            </div>
            <Badge label={t.priority} />
          </li>
        ))}
      </ul>
    </Panel>
  );
}