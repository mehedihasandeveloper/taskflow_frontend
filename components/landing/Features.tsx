import { FolderKanban, CheckCircle2, TrendingUp, Users } from "lucide-react";

const features = [
  { icon: FolderKanban, title: "Project Management", text: "Create, organize and manage your projects with ease.", color: "bg-blue-50 text-blue-600" },
  { icon: CheckCircle2, title: "Task Management", text: "Keep track of your tasks, set priorities and meet deadlines.", color: "bg-emerald-50 text-emerald-600" },
  { icon: TrendingUp, title: "Progress Tracking", text: "Visualize your progress and stay on top of your goals.", color: "bg-violet-50 text-violet-600" },
  { icon: Users, title: "Team Collaboration", text: "Work together with your team and get more done.", color: "bg-orange-50 text-orange-600" },
];

export default function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6">
      <h2 className="text-2xl font-bold text-slate-900">Powerful Features</h2>
      <p className="mt-1 text-sm text-slate-500">Everything you need to manage your projects and tasks efficiently.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ icon: Icon, title, text, color }) => (
          <div key={title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:shadow-md">
            <span className={`grid h-10 w-10 place-items-center rounded-lg ${color}`}><Icon size={20} /></span>
            <h3 className="mt-4 font-semibold text-slate-900">{title}</h3>
            <p className="mt-1 text-sm text-slate-500">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}