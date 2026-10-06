import { ArrowRight } from "lucide-react";
import Button from "../Button";

type Card = { title: string; tag: string; tagColor: string; dot: string };
const columns: { name: string; count: number; header: string; cards: Card[] }[] = [
  { name: "To Do", count: 3, header: "text-slate-700", cards: [
    { title: "Design homepage", tag: "High", tagColor: "bg-red-50 text-red-600", dot: "bg-red-500" },
    { title: "Write API docs", tag: "Medium", tagColor: "bg-orange-50 text-orange-600", dot: "bg-orange-400" },
    { title: "Plan sprint", tag: "Low", tagColor: "bg-emerald-50 text-emerald-600", dot: "bg-emerald-500" },
  ]},
  { name: "In Progress", count: 2, header: "text-blue-600", cards: [
    { title: "Build auth flow", tag: "High", tagColor: "bg-red-50 text-red-600", dot: "bg-red-500" },
    { title: "Setup database", tag: "Medium", tagColor: "bg-orange-50 text-orange-600", dot: "bg-orange-400" },
  ]},
  { name: "Completed", count: 2, header: "text-emerald-600", cards: [
    { title: "Project kickoff", tag: "Low", tagColor: "bg-emerald-50 text-emerald-600", dot: "bg-emerald-500" },
    { title: "Create wireframes", tag: "Medium", tagColor: "bg-orange-50 text-orange-600", dot: "bg-orange-400" },
  ]},
];
const nav = ["Dashboard", "Projects", "Tasks", "Calendar", "Team", "Settings"];

export default function ProductPreview() {
  return (
    <section id="preview" className="mx-auto grid max-w-6xl scroll-mt-20 items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.4fr_1fr]">
      <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-slate-100 p-4 sm:p-6">
        <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl shadow-blue-900/10">
          <aside className="hidden w-24 shrink-0 bg-slate-900 p-2.5 text-[10px] text-slate-300 sm:block">
            <p className="mb-3 font-bold text-white">TaskFlow</p>
            {nav.map((i) => (
              <p key={i} className={`mb-1 rounded px-2 py-1.5 ${i === "Projects" ? "bg-blue-600 text-white" : ""}`}>{i}</p>
            ))}
          </aside>
          <div className="min-w-0 flex-1 bg-slate-50 p-3">
            <p className="mb-2 text-xs font-semibold text-slate-800">Website Redesign</p>
            <div className="grid gap-2 sm:grid-cols-3">
              {columns.map((c) => (
                <div key={c.name} className="rounded-lg bg-slate-100/70 p-2">
                  <p className={`mb-2 flex justify-between text-[10px] font-semibold ${c.header}`}>
                    {c.name}<span className="text-slate-400">{c.count}</span>
                  </p>
                  {c.cards.map((card) => (
                    <div key={card.title} className="mb-1.5 rounded-md border border-slate-100 bg-white p-2 shadow-sm">
                      <p className="flex items-center gap-1.5 text-[10px] font-medium text-slate-700">
                        <span className={`h-1.5 w-1.5 rounded-full ${card.dot}`} />{card.title}
                      </p>
                      <span className={`mt-1.5 inline-block rounded px-1.5 py-0.5 text-[9px] font-medium ${card.tagColor}`}>{card.tag}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div id="cta" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-slate-900">A better way to manage your projects</h2>
        <p className="mt-3 text-slate-600">Get a clear overview of your work, stay focused and move faster with TaskFlow.</p>
        <div className="mt-6"><Button href="/signup">Get Started Free <ArrowRight size={16} /></Button></div>
      </div>
    </section>
  );
}