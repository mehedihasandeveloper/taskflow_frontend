const stats = [
  ["Total Projects", "8", "text-blue-600"],
  ["Total Tasks", "42", "text-slate-900"],
  ["Completed", "25", "text-emerald-600"],
  ["Pending", "17", "text-orange-500"],
];
const projects = [
  ["Website Redesign", "In Progress", "bg-blue-50 text-blue-600"],
  ["Mobile App", "Planning", "bg-orange-50 text-orange-600"],
  ["Marketing Campaign", "Completed", "bg-emerald-50 text-emerald-600"],
  ["Product Roadmap", "In Progress", "bg-blue-50 text-blue-600"],
];

export default function DashboardMockup() {
  return (
    <div className="flex overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-blue-900/10">
      <aside className="hidden w-28 shrink-0 bg-slate-900 p-3 text-[10px] text-slate-300 sm:block">
        <p className="mb-4 font-bold text-white">TaskFlow</p>
        {["Dashboard", "Projects", "Tasks", "Calendar", "Team", "Settings"].map((i, n) => (
          <p key={i} className={`mb-1 rounded px-2 py-1.5 ${n === 0 ? "bg-blue-600 text-white" : ""}`}>{i}</p>
        ))}
      </aside>
      <div className="flex-1 bg-slate-50 p-4">
        <p className="text-sm font-semibold text-slate-900">Good morning, Alex</p>
        <p className="mb-3 text-[10px] text-slate-500">Here&apos;s what&apos;s happening with your projects today.</p>
        <div className="mb-3 grid grid-cols-4 gap-2">
          {stats.map(([l, v, c]) => (
            <div key={l} className="rounded-lg bg-white p-2 shadow-sm">
              <p className="text-[9px] text-slate-500">{l}</p>
              <p className={`text-lg font-bold ${c}`}>{v}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-3 rounded-lg bg-white p-3 shadow-sm">
            <p className="mb-2 text-[11px] font-semibold">My Projects</p>
            {projects.map(([n, s, c]) => (
              <div key={n} className="flex items-center justify-between border-t border-slate-100 py-1.5 text-[10px]">
                <span>{n}</span>
                <span className={`rounded px-1.5 py-0.5 ${c}`}>{s}</span>
              </div>
            ))}
          </div>
          <div className="col-span-2 rounded-lg bg-white p-3 text-center shadow-sm">
            <p className="mb-2 text-left text-[11px] font-semibold">Task Progress</p>
            <div
              className="mx-auto grid h-16 w-16 place-items-center rounded-full"
              style={{ background: "conic-gradient(#2563eb 60%, #e2e8f0 0)" }}
            >
              <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-xs font-bold">60%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}