import Link from "next/link";
import { X } from "lucide-react";
import Avatar from "../Avatar";
import { Teammate, TeammateProject } from "@/lib/teamApi";

type Props = { teammate: Teammate; onRemove: (teammate: Teammate, project: TeammateProject) => void };

export default function TeammateCard({ teammate, onRemove }: Props) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <Avatar name={teammate.name} src={teammate.avatar} size={44} />
        <div className="min-w-0">
          <p className="truncate font-semibold text-slate-900">{teammate.name}</p>
          <p className="truncate text-sm text-slate-500">{teammate.email}</p>
        </div>
      </div>
      <p className="mb-2 mt-4 text-xs font-medium uppercase tracking-wide text-slate-400">
        Shared {teammate.projects.length === 1 ? "project" : "projects"}
      </p>
      <ul className="flex flex-wrap gap-2">
        {teammate.projects.map((p) => (
          <li key={p.id} className="flex items-center gap-1 rounded-md bg-blue-50 py-1 pl-2.5 pr-1.5 text-xs font-medium text-blue-700">
            <Link href={`/projects/${p.id}`} className="hover:underline">{p.name}</Link>
            {p.isOwner && <span className="text-blue-400">· owner</span>}
            {p.canRemove ? (
              <button aria-label={`Remove ${teammate.name} from ${p.name}`} onClick={() => onRemove(teammate, p)} className="rounded p-0.5 text-blue-400 hover:bg-white hover:text-red-600">
                <X size={12} />
              </button>
            ) : (
              <span className="w-1" />
            )}
          </li>
        ))}
      </ul>
    </article>
  );
}
