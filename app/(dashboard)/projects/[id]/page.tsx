"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Calendar, ListChecks, Pencil, Plus } from "lucide-react";
import Badge from "@/components/Badge";
import Modal from "@/components/ui/Modal";
import EmptyState from "@/components/ui/EmptyState";
import SubmitButton from "@/components/ui/SubmitButton";
import ProjectForm from "@/components/projects/ProjectForm";
import MembersPanel from "@/components/team/MembersPanel";

import TaskFormModal from "@/components/tasks/TaskFormModal";
import { ApiRequestError } from "@/lib/api";
import { formatDate } from "@/lib/format";
import { getProject, updateProject } from "@/lib/projectsApi";

import { createTask, deleteTask, listTasks, updateTask } from "@/lib/tasksApi";
import { Member, Project, ProjectInput } from "@/lib/types";
import { Task, TaskInput, TaskStatus } from "@/lib/taskTypes";
import { addProjectMember, getProjectMembers, removeProjectMember } from "@/lib/teamApi";
import TaskBoard from "@/components/tasks/TaskBoard";
import ProjectSummary from "@/components/projects/ProjectSummary";

type ModalState =
  | { type: "editProject" }
  | { type: "createTask" }
  | { type: "editTask"; task: Task }
  | { type: "deleteTask"; task: Task }
  | null;

export default function ProjectDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [team, setTeam] = useState<{ owner: Member; members: Member[] } | null>(null);
  const [error, setError] = useState<{ message: string; status: number } | null>(null);
  const [actionError, setActionError] = useState("");
  const [modal, setModal] = useState<ModalState>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    Promise.all([getProject(id), listTasks(id), getProjectMembers(id)])
      .then(([p, t, m]) => {
        if (cancelled) return;
        setProject(p.project);
        setTasks(t);
        setTeam(m);
      })
      .catch((e) => {
        if (cancelled) return;
        const status = e instanceof ApiRequestError ? e.status : 0;
        setError({ message: e instanceof Error ? e.message : "Failed to load project", status });
      });
    return () => { cancelled = true; };
  }, [id]);

  const close = () => setModal(null);

  async function saveProject(values: ProjectInput) {
    const { project: updated } = await updateProject(id, values);
    setProject(updated);
    close();
  }

  async function saveTask(values: TaskInput) {
    if (modal?.type === "editTask") {
      const updated = await updateTask(modal.task.id, values);
      setTasks((ts) => ts!.map((t) => (t.id === updated.id ? updated : t)));
    } else {
      const created = await createTask(id, values);
      setTasks((ts) => [created, ...ts!]);
    }
    close();
  }

  // Optimistic update: change the UI immediately, roll back if the server rejects it
  async function changeStatus(task: Task, status: TaskStatus) {
    const previous = tasks;
    setActionError("");
    setTasks((ts) => ts!.map((t) => (t.id === task.id ? { ...t, status } : t)));
    try {
      await updateTask(task.id, { status });
    } catch (e) {
      setTasks(previous);
      setActionError(e instanceof Error ? e.message : "Failed to update task");
    }
  }

  async function confirmDelete() {
    if (modal?.type !== "deleteTask") return;
    setDeleting(true);
    try {
      await deleteTask(modal.task.id);
      setTasks((ts) => ts!.filter((t) => t.id !== modal.task.id));
      close();
    } catch (e) {
      setActionError(e instanceof Error ? e.message : "Failed to delete task");
      close();
    } finally {
      setDeleting(false);
    }
  }

  async function addMember(email: string) {
    const member = await addProjectMember(id, email);
    setTeam((t) => t && { ...t, members: [...t.members, member] });
  }

  async function removeMember(member: Member) {
    await removeProjectMember(id, member.id);
    setTeam((t) => t && { ...t, members: t.members.filter((m) => m.id !== member.id) });
    setTasks((ts) => ts!.map((t) => (t.assignee?.id === member.id ? { ...t, assignee: null } : t)));
  }

  const back = (
    <Link href="/projects" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600">
      <ArrowLeft size={16} /> Back to projects
    </Link>
  );

  if (error) {
    return (
      <div className="mx-auto max-w-3xl space-y-4">
        {back}
        <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-8 text-center text-sm text-red-700">
          {error.status === 404 || error.status === 400 ? "This project doesn't exist or you don't have access to it." : error.message}
        </div>
      </div>
    );
  }

  if (!project || !tasks || !team) {
    return (
      <div className="mx-auto max-w-7xl space-y-4">
        <div className="h-32 animate-pulse rounded-xl bg-slate-200/70" />
        <div className="grid gap-4 md:grid-cols-3">
          {[0, 1, 2].map((i) => <div key={i} className="h-64 animate-pulse rounded-xl bg-slate-200/70" />)}
        </div>
      </div>
    );
  }

  const isOwner = project.role === "owner";
  const assignable = [team.owner, ...team.members];
  const completed = tasks.filter((t) => t.status === "Completed").length;
  const percent = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;
  const addTaskButton = (
    <button onClick={() => setModal({ type: "createTask" })} className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-600/30 hover:bg-blue-700">
      <Plus size={16} /> Add Task
    </button>
  );

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {back}

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-900">{project.name}</h1>
              <Badge label={project.status} />
              {!isOwner && <span className="rounded-md bg-violet-50 px-2 py-0.5 text-xs font-medium text-violet-600">Shared with you</span>}
            </div>
            <p className="mt-2 max-w-2xl text-sm text-slate-500">{project.description || "No description"}</p>
            <p className="mt-3 flex items-center gap-2 text-xs text-slate-500">
              <Calendar size={14} /> {formatDate(project.startDate)} → {formatDate(project.dueDate)}
              <span className="text-slate-300">|</span> Created {formatDate(project.createdAt)}
            </p>
          </div>
          <div className="flex gap-3">
            {isOwner && (
              <button onClick={() => setModal({ type: "editProject" })} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                <Pencil size={14} /> Edit
              </button>
            )}
            {addTaskButton}
          </div>
        </div>
        <div className="mt-5">
          <div className="mb-1.5 flex justify-between text-xs text-slate-500">
            <span>{completed} of {tasks.length} tasks completed</span><span>{percent}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-blue-600 transition-all" style={{ width: `${percent}%` }} />
          </div>
        </div>
      </section>

      <ProjectSummary projectId={id} />

      <MembersPanel
        projectId={id}
        projectName={project.name}
        owner={team.owner}
        members={team.members}
        isOwner={isOwner}
        onAdd={addMember}
        onRemove={removeMember}
      />

      {actionError && (
        <div role="alert" className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">
          {actionError}
          <button onClick={() => setActionError("")} className="font-semibold underline">Dismiss</button>
        </div>
      )}

      {tasks.length === 0 ? (
        <EmptyState icon={<ListChecks />} title="No tasks yet" text="Break this project down into tasks and track your progress." action={addTaskButton} />
      ) : (
        <TaskBoard tasks={tasks} onEdit={(task) => setModal({ type: "editTask", task })} onDelete={(task) => setModal({ type: "deleteTask", task })} onStatusChange={changeStatus} />
      )}

      <Modal open={modal?.type === "editProject"} title="Edit project" onClose={close}>
        <ProjectForm project={project} onSubmit={saveProject} onCancel={close} />
      </Modal>
      <TaskFormModal
        open={modal?.type === "createTask" || modal?.type === "editTask"}
        projectId={id}
        members={assignable}
        task={modal?.type === "editTask" ? modal.task : undefined}
        onClose={close}
        onSubmit={saveTask}
      />
      <Modal open={modal?.type === "deleteTask"} title="Delete task" onClose={close}>
        <p className="text-sm text-slate-600">Delete <b>{modal?.type === "deleteTask" ? modal.task.title : ""}</b>? This cannot be undone.</p>
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={close} className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">Cancel</button>
          <SubmitButton type="button" danger loading={deleting} onClick={confirmDelete}>Delete</SubmitButton>
        </div>
      </Modal>
    </div>
  );
}