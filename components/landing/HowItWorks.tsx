import { ArrowRight, FolderKanban, ListChecks, TrendingUp } from "lucide-react";

const steps = [
  { n: "01", icon: FolderKanban, ring: "bg-blue-50 text-blue-600", title: "Create a project", text: "Set up your project with a name, description and deadline." },
  { n: "02", icon: ListChecks, ring: "bg-emerald-50 text-emerald-600", title: "Add and manage tasks", text: "Break down your project into tasks, set priorities and due dates." },
  { n: "03", icon: TrendingUp, ring: "bg-violet-50 text-violet-600", title: "Track your progress", text: "Stay updated with real-time progress and achieve your goals." },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6">
      <h2 className="text-2xl font-bold text-slate-900">How It Works</h2>
      <p className="mt-1 text-sm text-slate-500">Get started in just 3 simple steps.</p>
      <div className="mt-10 grid items-start gap-10 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:gap-6">
        {steps.map(({ n, icon: Icon, ring, title, text }, i) => (
          <div key={n} className="contents">
            <div>
              <span className={`grid h-16 w-16 place-items-center rounded-full ring-8 ring-slate-50 ${ring}`}>
                <Icon size={26} />
              </span>
              <h3 className="mt-5 font-semibold text-slate-900">
                <span className="mr-2 text-sm font-bold text-blue-600">{n}</span>{title}
              </h3>
              <p className="mt-1 max-w-xs text-sm text-slate-500">{text}</p>
            </div>
            {i < steps.length - 1 && <ArrowRight className="hidden self-start pt-5 text-slate-300 md:mt-3 md:block" />}
          </div>
        ))}
      </div>
    </section>
  );
}