import { ReactNode } from "react";
import { Loader2 } from "lucide-react";

type Props = { loading: boolean; children: ReactNode; danger?: boolean; onClick?: () => void; type?: "submit" | "button" };

export default function SubmitButton({ loading, children, danger, onClick, type = "submit" }: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-70 ${
        danger ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      {loading && <Loader2 size={16} className="animate-spin" />} {children}
    </button>
  );
}