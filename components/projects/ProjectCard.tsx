import Link from "next/link";
import { Calendar, Pencil, Trash2 } from "lucide-react";
import Badge from "../Badge";
import { Project } from "@/lib/types";

const fmt = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }) : "—";

type Props = { project: Project; onEdit: (p: Project) => void; onDelete: (p: Project) => void };

export default function ProjectCard({ project, onEdit, onDelete }: Props) {
  return (
    <article className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <Link href={`/projects/${project.id}`} className="font-semibold text-slate-900 hover:text-blue-600">
          {project.name}
        </Link>
        <Badge label={project.status} />
      </div>
      <p className="mt-2 line-clamp-2 min-h-10 text-sm text-slate-500">{project.description || "No description"}</p>
      <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
        <Calendar size={14} /> {fmt(project.startDate)} → {fmt(project.dueDate)}
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
        <span className="text-xs text-slate-400">Created {fmt(project.createdAt)}</span>
        <div className="flex gap-1">
          <button aria-label={`Edit ${project.name}`} onClick={() => onEdit(project)} className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100 hover:text-blue-600"><Pencil size={16} /></button>
          <button aria-label={`Delete ${project.name}`} onClick={() => onDelete(project)} className="rounded-md p-1.5 text-slate-500 hover:bg-red-50 hover:text-red-600"><Trash2 size={16} /></button>
        </div>
      </div>
    </article>
  );
}