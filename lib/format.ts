/** "2026-10-30T00:00:00.000Z" -> "Oct 30, 2026" (UTC, so the day never shifts) */
export const formatDate = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }) : "—";

export const isOverdue = (dueDate: string | null, completed: boolean) =>
  !completed && !!dueDate && dueDate.slice(0, 10) < new Date().toISOString().slice(0, 10);