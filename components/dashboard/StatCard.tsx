import { ReactNode } from "react";

type Props = { label: string; value: number; note: string; icon: ReactNode; tone: string };

export default function StatCard({ label, value, note, icon, tone }: Props) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <p className="text-sm text-slate-500">{label}</p>
        <span className={`grid h-9 w-9 place-items-center rounded-lg ${tone}`}>{icon}</span>
      </div>
      <p className="mt-1 text-3xl font-bold text-slate-900">{value}</p>
      <p className="mt-1 text-xs text-emerald-600">{note}</p>
    </div>
  );
}