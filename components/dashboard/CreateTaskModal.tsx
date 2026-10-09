"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Modal from "../ui/Modal";
import TaskForm from "../tasks/TaskForm";
import { listProjects } from "@/lib/projectsApi";
import { createTask } from "@/lib/tasksApi";
import { Project } from "@/lib/types";
import { TaskInput } from "@/lib/taskTypes";

type Props = { open: boolean; onClose: () => void; onCreated: () => void };

/** Dashboard "Create Task": a task always belongs to a project, so the user picks one first. */
export default function CreateTaskModal({ open, onClose, onCreated }: Props) {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [projectId, setProjectId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    setProjects(null);
    setError("");
    listProjects({ search: "", status: "", sort: "newest" })
      .then((list) => {
        setProjects(list);
        setProjectId(list[0]?.id ?? "");
      })
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load projects"));
  }, [open]);

  async function handleSubmit(values: TaskInput) {
    await createTask(projectId, values);
    onCreated();
  }

  return (
    <Modal open={open} title="Create task" onClose={onClose}>
      {error ? (
        <p role="alert" className="text-sm text-red-600">{error}</p>
      ) : projects === null ? (
        <div className="h-24 animate-pulse rounded-lg bg-slate-100" />
      ) : projects.length === 0 ? (
        <p className="text-sm text-slate-600">
          Tasks live inside projects. <Link href="/projects" className="font-medium text-blue-600 hover:underline">Create a project</Link> first.
        </p>
      ) : (
        <div className="space-y-4">
          <div>
            <label htmlFor="project" className="mb-1.5 block text-sm font-medium">Project</label>
            <select
              id="project"
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <TaskForm onSubmit={handleSubmit} onCancel={onClose} />
        </div>
      )}
    </Modal>
  );
}