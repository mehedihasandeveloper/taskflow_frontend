"use client";
import { ReactNode, useEffect, useState } from "react";
import Modal from "../ui/Modal";
import TaskForm from "./TaskForm";
import { getProjectMembers } from "@/lib/teamApi";
import { Task, TaskInput } from "@/lib/taskTypes";
import { Member } from "@/lib/types";

type Props = {
  open: boolean;
  /** Project the task belongs to. null = nothing to show below the header yet. */
  projectId: string | null;
  task?: Task;
  /** Pass when the caller already has the people list; otherwise it is fetched. */
  members?: Member[];
  header?: ReactNode;
  onClose: () => void;
  onSubmit: (values: TaskInput) => Promise<void>;
};

/** Create/edit task dialog that loads the project's people for the assignee dropdown. */
export default function TaskFormModal({ open, projectId, task, members, header, onClose, onSubmit }: Props) {
  const [fetched, setFetched] = useState<{ projectId: string; people: Member[] } | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open || !projectId || members) return;
    let cancelled = false;
    setError("");
    getProjectMembers(projectId)
      .then((t) => !cancelled && setFetched({ projectId, people: [t.owner, ...t.members] }))
      .catch((e) => !cancelled && setError(e instanceof Error ? e.message : "Failed to load project members"));
    return () => { cancelled = true; };
  }, [open, projectId, members]);

  const people = members ?? (fetched && fetched.projectId === projectId ? fetched.people : null);

  let body: ReactNode = null;
  if (projectId) {
    if (error) body = <p role="alert" className="text-sm text-red-600">{error}</p>;
    else if (people === null) body = <div className="h-40 animate-pulse rounded-lg bg-slate-100" />;
    else body = <TaskForm key={`${task?.id ?? "new"}-${projectId}`} task={task} members={people} onSubmit={onSubmit} onCancel={onClose} />;
  }

  return (
    <Modal open={open} title={task ? "Edit task" : "Create task"} onClose={onClose}>
      <div className="space-y-4">
        {header}
        {body}
      </div>
    </Modal>
  );
}
