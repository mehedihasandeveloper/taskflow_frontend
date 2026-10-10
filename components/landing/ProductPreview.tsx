import { ArrowRight, CheckSquare, LayoutDashboard, FolderKanban, CheckSquare as TasksIcon, Calendar, Users, Settings, Search, Bell, CheckCircle2 } from "lucide-react";
import Button from "../Button";

const nav = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Projects", icon: FolderKanban, active: true },
  { label: "Tasks", icon: TasksIcon },
  { label: "Calendar", icon: Calendar },
  { label: "Team", icon: Users },
  { label: "Settings", icon: Settings },
];

type Card = {
  title: string;
  tag: string;
  tagColor: string;
  done?: boolean;
};

const columns: { name: string; count: number; headerColor: string; cards: Card[] }[] = [
  {
    name: "To Do",
    count: 3,
    headerColor: "text-slate-700",
    cards: [
      { title: "Research competitors", tag: "High", tagColor: "bg-red-50 text-red-600" },
      { title: "Define brand voice", tag: "Medium", tagColor: "bg-orange-50 text-orange-600" },
      { title: "Gather customer data", tag: "Low", tagColor: "bg-emerald-50 text-emerald-600" },
    ],
  },
  {
    name: "In Progress",
    count: 2,
    headerColor: "text-blue-600",
    cards: [
      { title: "Create survey questions", tag: "High", tagColor: "bg-red-50 text-red-600" },
      { title: "Design report template", tag: "Medium", tagColor: "bg-orange-50 text-orange-600" },
    ],
  },
  {
    name: "Completed",
    count: 3,
    headerColor: "text-emerald-600",
    cards: [
      { title: "Kickoff meeting", tag: "Low", tagColor: "bg-emerald-50 text-emerald-600", done: true },
      { title: "Stakeholder interviews", tag: "Medium", tagColor: "bg-orange-50 text-orange-600", done: true },
      { title: "Set project goals", tag: "High", tagColor: "bg-red-50 text-red-600", done: true },
    ],
  },
];

export default function ProductPreview() {
  return (
    <section
      id="preview"
      className="mx-auto grid max-w-6xl scroll-mt-20 items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.5fr_1fr]"
    >
      {/* Kanban Mockup */}
      <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-slate-100 p-3 sm:p-5">
        <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl shadow-blue-900/10">
          {/* Sidebar */}
          <aside className="hidden w-32 shrink-0 flex-col bg-slate-900 p-3 text-[10px] text-slate-300 sm:flex">
            <div className="mb-4 flex items-center gap-1.5">
              <span className="grid h-5 w-5 place-items-center rounded bg-blue-600 text-white">
                <CheckSquare size={11} />
              </span>
              <span className="font-bold text-white">TaskFlow</span>
            </div>
            <nav className="flex-1 space-y-0.5">
              {nav.map(({ label, icon: Icon, active }) => (
                <div
                  key={label}
                  className={`flex items-center gap-2 rounded px-2 py-1.5 font-medium ${
                    active ? "bg-blue-600 text-white" : "text-slate-400"
                  }`}
                >
                  <Icon size={11} />
                  {label}
                </div>
              ))}
            </nav>
          </aside>

          {/* Main */}
          <div className="min-w-0 flex-1 bg-slate-50">
            {/* Top bar */}
            <div className="flex h-9 items-center gap-2 border-b border-slate-200 bg-white px-3">
              <div className="relative flex-1">
                <Search size={10} className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400" />
                <div className="h-5 w-full max-w-[140px] rounded border border-slate-200 bg-slate-50 pl-6 text-[8px] leading-5 text-slate-400">
                  Search projects...
                </div>
              </div>
              <Bell size={11} className="text-slate-400" />
              <div className="h-5 w-5 rounded-full bg-blue-500 text-[7px] font-bold text-white grid place-items-center">
                AJ
              </div>
            </div>

            <div className="p-3">
              <p className="mb-2.5 text-[11px] font-semibold text-slate-900">Brand Insights Campaign</p>

              {/* Kanban columns */}
              <div className="grid gap-2 sm:grid-cols-3">
                {columns.map((col) => (
                  <div key={col.name} className="rounded-lg bg-slate-100/80 p-2">
                    <p className={`mb-2 flex items-center justify-between text-[10px] font-semibold ${col.headerColor}`}>
                      {col.name}
                      <span className="rounded-full bg-white px-1.5 py-0.5 text-[9px] font-medium text-slate-500 shadow-sm">
                        {col.count}
                      </span>
                    </p>
                    <div className="space-y-1.5">
                      {col.cards.map((card) => (
                        <div
                          key={card.title}
                          className="rounded-md border border-slate-100 bg-white p-2 shadow-sm"
                        >
                          <p className="flex items-start gap-1.5 text-[10px] font-medium text-slate-700">
                            {card.done ? (
                              <CheckCircle2 size={12} className="mt-0.5 shrink-0 text-emerald-500" />
                            ) : (
                              <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full border border-slate-300" />
                            )}
                            <span className={card.done ? "text-slate-400 line-through" : ""}>
                              {card.title}
                            </span>
                          </p>
                          <span
                            className={`mt-1.5 inline-block rounded px-1.5 py-0.5 text-[8px] font-medium ${card.tagColor}`}
                          >
                            {card.tag}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA text */}
      <div id="cta" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-slate-900">A better way to manage your projects</h2>
        <p className="mt-3 text-slate-600">
          Get a clear overview of your work, stay focused and move faster with TaskFlow.
        </p>
        <div className="mt-6">
          <Button href="/signup">
            Get Started Free <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </section>
  );
}