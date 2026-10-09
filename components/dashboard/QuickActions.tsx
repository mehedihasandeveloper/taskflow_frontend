import { Plus } from "lucide-react";
import Panel from "./Panel";

type Props = { onCreateProject: () => void; onCreateTask: () => void };

export default function QuickActions({ onCreateProject, onCreateTask }: Props) {
  return (
    <Panel title="Quick Actions">
      <div className="flex flex-col gap-3">
        <button onClick={onCreateProject} className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
          <Plus size={16} /> Create Project
        </button>
        <button onClick={onCreateTask} className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50">
          <Plus size={16} /> Create Task
        </button>
      </div>
    </Panel>
  );
}