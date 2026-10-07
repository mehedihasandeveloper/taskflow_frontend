const styles: Record<string, string> = {
  Planning: "bg-orange-50 text-orange-600",
  "In Progress": "bg-blue-50 text-blue-600",
  Completed: "bg-emerald-50 text-emerald-600",
  Archived: "bg-slate-100 text-slate-600",
  High: "bg-red-50 text-red-600",
  Medium: "bg-orange-50 text-orange-600",
  Low: "bg-emerald-50 text-emerald-600",
};

export default function Badge({ label }: { label: string }) {
  return (
    <span className={`inline-block whitespace-nowrap rounded-md px-2 py-0.5 text-xs font-medium ${styles[label] ?? "bg-slate-100 text-slate-600"}`}>
      {label}
    </span>
  );
}