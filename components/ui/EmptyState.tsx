import { ReactNode } from "react";

type Props = { icon: ReactNode; title: string; text: string; action?: ReactNode };

export default function EmptyState({ icon, title, text, action }: Props) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
      <span className="grid h-12 w-12 place-items-center rounded-full bg-blue-50 text-blue-600">{icon}</span>
      <h3 className="mt-4 font-semibold text-slate-900">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-slate-500">{text}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}