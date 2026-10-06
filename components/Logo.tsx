import { CheckSquare } from "lucide-react";

export default function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span className={`flex items-center gap-2 text-lg font-bold ${dark ? "text-white" : "text-slate-900"}`}>
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-blue-600 text-white">
        <CheckSquare size={18} />
      </span>
      TaskFlow
    </span>
  );
}