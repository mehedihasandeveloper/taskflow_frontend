import { CheckSquare, LayoutDashboard, FolderKanban, CheckSquare as TasksIcon, Calendar, Users, Settings, Search, Bell } from "lucide-react";

const nav = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Projects", icon: FolderKanban, active: false },
  { label: "Tasks", icon: TasksIcon, active: false },
  { label: "Calendar", icon: Calendar, active: false },
  { label: "Team", icon: Users, active: false },
  { label: "Settings", icon: Settings, active: false },
];

const stats = [
  { label: "Total Projects", value: "8", color: "text-blue-600" },
  { label: "Total Tasks", value: "42", color: "text-slate-900" },
  { label: "Completed", value: "25", color: "text-emerald-600" },
  { label: "Pending", value: "17", color: "text-orange-500" },
];

const projects = [
  { name: "Website Redesign", status: "In Progress", color: "bg-blue-50 text-blue-600" },
  { name: "Mobile App", status: "Planning", color: "bg-orange-50 text-orange-600" },
  { name: "Marketing Campaign", status: "Completed", color: "bg-emerald-50 text-emerald-600" },
  { name: "Product Roadmap", status: "In Progress", color: "bg-blue-50 text-blue-600" },
];

export default function DashboardMockup() {
  return (
    <div className="flex overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-blue-900/10">
      {/* Sidebar */}
      <aside className="hidden w-36 shrink-0 flex-col bg-slate-900 p-3 text-[10px] text-slate-300 sm:flex">
        <div className="mb-5 flex items-center gap-1.5">
          <span className="grid h-6 w-6 place-items-center rounded-md bg-blue-600 text-white">
            <CheckSquare size={13} />
          </span>
          <span className="text-xs font-bold text-white">TaskFlow</span>
        </div>
        <nav className="flex-1 space-y-0.5">
          {nav.map(({ label, icon: Icon, active }) => (
            <div
              key={label}
              className={`flex items-center gap-2 rounded-md px-2 py-1.5 font-medium ${
                active ? "bg-blue-600 text-white" : "text-slate-400"
              }`}
            >
              <Icon size={12} />
              {label}
            </div>
          ))}
        </nav>
        <div className="mt-auto flex items-center gap-2 border-t border-slate-800 pt-3">
          <div className="grid h-6 w-6 place-items-center rounded-full bg-blue-500 text-[8px] font-bold text-white">
            AJ
          </div>
          <div className="min-w-0">
            <p className="truncate font-medium text-white">Alex Johnson</p>
            <p className="truncate text-[8px] text-slate-500">alex@taskflow.app</p>
          </div>
        </div>
      </aside>

      {/* Main area */}
      <div className="min-w-0 flex-1 bg-slate-50">
        {/* Top bar */}
        <div className="flex h-10 items-center gap-2 border-b border-slate-200 bg-white px-3">
          <div className="relative flex-1">
            <Search size={11} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <div className="h-6 w-full max-w-xs rounded-md border border-slate-200 bg-slate-50 pl-7 text-[9px] leading-6 text-slate-400">
              Search projects...
            </div>
          </div>
          <Bell size={13} className="text-slate-400" />
          <div className="h-6 w-6 rounded-full bg-blue-500 text-[8px] font-bold text-white grid place-items-center">
            AJ
          </div>
        </div>

        <div className="space-y-3 p-4">
          {/* Greeting */}
          <div>
            <p className="text-sm font-semibold text-slate-900">Good morning, Alex</p>
            <p className="text-[10px] text-slate-500">Here&apos;s what&apos;s happening with your projects today.</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-lg border border-slate-100 bg-white p-2.5 shadow-sm">
                <p className="text-[9px] text-slate-500">{s.label}</p>
                <p className={`mt-0.5 text-lg font-bold ${s.color}`}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* Projects + Progress */}
          <div className="grid gap-2 sm:grid-cols-5">
            {/* My Projects */}
            <div className="rounded-lg border border-slate-100 bg-white p-3 shadow-sm sm:col-span-3">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[11px] font-semibold text-slate-900">My Projects</p>
                <span className="text-[9px] font-medium text-blue-600">View all</span>
              </div>
              <ul>
                {projects.map((p) => (
                  <li
                    key={p.name}
                    className="flex items-center justify-between border-t border-slate-100 py-1.5 text-[10px]"
                  >
                    <span className="font-medium text-slate-700">{p.name}</span>
                    <span className={`rounded px-1.5 py-0.5 font-medium ${p.color}`}>{p.status}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Task Progress */}
            <div className="rounded-lg border border-slate-100 bg-white p-3 shadow-sm sm:col-span-2">
              <p className="mb-2 text-[11px] font-semibold text-slate-900">Task Progress</p>
              <div className="flex flex-col items-center">
                <div
                  className="grid h-16 w-16 place-items-center rounded-full"
                  style={{ background: "conic-gradient(#2563eb 60%, #e2e8f0 0)" }}
                >
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-white">
                    <span className="text-xs font-bold text-slate-900">60%</span>
                  </div>
                </div>
                <ul className="mt-2 w-full space-y-1 text-[9px]">
                  <li className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <i className="h-1.5 w-1.5 rounded-full bg-blue-600" /> Completed
                    </span>
                    <b>25</b>
                  </li>
                  <li className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <i className="h-1.5 w-1.5 rounded-full bg-slate-300" /> Pending
                    </span>
                    <b>17</b>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}