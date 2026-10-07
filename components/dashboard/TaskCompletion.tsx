import Panel from "./Panel";

export default function TaskCompletion({ completed, pending }: { completed: number; pending: number }) {
  const total = completed + pending;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <Panel title="Task Completion">
      <div
        className="mx-auto grid h-32 w-32 place-items-center rounded-full"
        style={{ background: `conic-gradient(#2563eb ${percent}%, #e2e8f0 0)` }}
        role="img"
        aria-label={`${percent}% of tasks completed`}
      >
        <div className="grid h-24 w-24 place-items-center rounded-full bg-white text-center">
          <div>
            <p className="text-2xl font-bold text-slate-900">{percent}%</p>
            <p className="text-[10px] text-slate-500">Completed</p>
          </div>
        </div>
      </div>
      <ul className="mt-4 space-y-2 text-sm">
        <li className="flex items-center justify-between"><span className="flex items-center gap-2 text-slate-600"><i className="h-2 w-2 rounded-full bg-blue-600" />Completed</span><b>{completed}</b></li>
        <li className="flex items-center justify-between"><span className="flex items-center gap-2 text-slate-600"><i className="h-2 w-2 rounded-full bg-slate-300" />Pending</span><b>{pending}</b></li>
      </ul>
    </Panel>
  );
}