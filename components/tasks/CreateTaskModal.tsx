"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import TaskFormModal from "./TaskFormModal";
import { listProjects } from "@/lib/projectsApi";
import { createTask } from "@/lib/tasksApi";
import { Project } from "@/lib/types";

type Props = { open: boolean; onClose: () => void; onCreated: () => void; defaultProjectId?: string };

/** "Create task" from outside a project: the user picks a project first, since every task belongs to one. */
export default function CreateTaskModal({ open, onClose, onCreated, defaultProjectId }: Props) {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [projectId, setProjectId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    setProjects(null);
    setError("");
    listProjects({ search: "", status: "", sort: "newest" })
      .then((list) => {
        if (cancelled) return;
        setProjects(list);
        setProjectId(list.find((p) => p.id === defaultProjectId)?.id ?? list[0]?.id ?? "");
      })
      .catch((e) => !cancelled && setError(e instanceof Error ? e.message : "Failed to load projects"));
    return () => { cancelled = true; };
  }, [open, defaultProjectId]);

  let header;
  if (error) header = <p role="alert" className="text-sm text-red-600">{error}</p>;
  else if (projects === null) header = <div className="h-12 animate-pulse rounded-lg bg-slate-100" />;
  else if (projects.length === 0)
    header = (
      <p className="text-sm text-slate-600">
        Tasks live inside projects. <Link href="/projects" className="font-medium text-blue-600 hover:underline">Create a project</Link> first.
      </p>
    );
  else
    header = (
      <div>
        <label htmlFor="project" className="mb-1.5 block text-sm font-medium">Project</label>
        <select
          id="project"
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          {projects.map((p) => <option key={p.id} value={p.id}>{p.name}{p.role === "member" ? " (shared)" : ""}</option>)}
        </select>
      </div>
    );

  return (
    <TaskFormModal
      open={open}
      projectId={projects && projects.length > 0 ? projectId : null}
      header={header}
      onClose={onClose}
      onSubmit={async (values) => {
        await createTask(projectId, values);
        onCreated();
      }}
    />
  );
}
