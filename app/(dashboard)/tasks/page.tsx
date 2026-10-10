"use client";
import { useEffect, useState } from "react";
import { ListChecks, Plus, SearchX } from "lucide-react";
import Modal from "@/components/ui/Modal";
import EmptyState from "@/components/ui/EmptyState";
import SubmitButton from "@/components/ui/SubmitButton";
import CreateTaskModal from "@/components/tasks/CreateTaskModal";
import TaskFormModal from "@/components/tasks/TaskFormModal";
import TasksTable from "@/components/tasks/TasksTable";
import TasksToolbar from "@/components/tasks/TasksToolbar";
import { useDebounce } from "@/hooks/useDebounce";
import { listProjects } from "@/lib/projectsApi";
import { deleteTask, listAllTasks, TaskFilters, updateTask } from "@/lib/tasksApi";
import { Task, TaskInput, TaskStatus } from "@/lib/taskTypes";
import { Project } from "@/lib/types";

type ModalState = { type: "create" } | { type: "edit"; task: Task } | { type: "delete"; task: Task } | null;

const initialFilters: TaskFilters = { search: "", status: "", priority: "", project: "", assigned: "", sort: "newest" };

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [filters, setFilters] = useState<TaskFilters>(initialFilters);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [modal, setModal] = useState<ModalState>(null);
  const [deleting, setDeleting] = useState(false);

  const debouncedSearch = useDebounce(filters.search);
  const { status, priority, project, assigned, sort } = filters;
  const filtering = Boolean(debouncedSearch.trim() || status || priority || project || assigned);

  useEffect(() => {
    listProjects({ search: "", status: "", sort: "name" }).then(setProjects).catch(() => setProjects([]));
  }, []);

  useEffect(() => {
    let cancelled = false; // ignore out-of-date responses
    setError("");
    listAllTasks({ search: debouncedSearch, status, priority, project, assigned, sort })
      .then((data) => !cancelled && setTasks(data))
      .catch((e) => !cancelled && setError(e instanceof Error ? e.message : "Failed to load tasks"));
    return () => { cancelled = true; };
  }, [debouncedSearch, status, priority, project, assigned, sort, refresh]);

  const reload = () => setRefresh((n) => n + 1);
  const close = () => setModal(null);
  const change = (patch: Partial<TaskFilters>) => setFilters((f) => ({ ...f, ...patch }));

  async function saveEdit(values: TaskInput) {
    if (modal?.type !== "edit") return;
    await updateTask(modal.task.id, values);
    close();
    reload();
  }

  // Optimistic update with rollback
  async function changeStatus(task: Task, next: TaskStatus) {
    const previous = tasks;
    setActionError("");
    setTasks((ts) => ts && ts.map((t) => (t.id === task.id ? { ...t, status: next } : t)));
    try {
      await updateTask(task.id, { status: next });
    } catch (e) {
      setTasks(previous);
      setActionError(e instanceof Error ? e.message : "Failed to update task");
    }
  }

  async function confirmDelete() {
    if (modal?.type !== "delete") return;
    setDeleting(true);
    try {
      await deleteTask(modal.task.id);
      close();
      reload();
    } catch (e) {
      setActionError(e instanceof Error ? e.message : "Failed to delete task");
      close();
    } finally {
      setDeleting(false);
    }
  }

  const createButton = (
    <button onClick={() => setModal({ type: "create" })} className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-600/30 hover:bg-blue-700">
      <Plus size={16} /> Create Task
    </button>
  );

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Tasks</h1>
          <p className="text-sm text-slate-500">Every task across all your projects in one place.</p>
        </div>
        {createButton}
      </div>

      <TasksToolbar filters={filters} projects={projects} onChange={change} />

      {actionError && (
        <div role="alert" className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">
          {actionError}
          <button onClick={() => setActionError("")} className="font-semibold underline">Dismiss</button>
        </div>
      )}

      {error ? (
        <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="text-sm text-red-700">{error}</p>
          <button onClick={reload} className="mt-3 text-sm font-semibold text-red-700 underline">Try again</button>
        </div>
      ) : tasks === null ? (
        <div className="space-y-3">
          {[0, 1, 2, 3].map((i) => <div key={i} className="h-14 animate-pulse rounded-xl bg-slate-200/70" />)}
        </div>
      ) : tasks.length === 0 ? (
        filtering ? (
          <EmptyState icon={<SearchX />} title="No matching tasks" text="Try changing or clearing your filters." action={
            <button onClick={() => setFilters(initialFilters)} className="text-sm font-semibold text-blue-600 hover:underline">Clear filters</button>
          } />
        ) : (
          <EmptyState icon={<ListChecks />} title="No tasks yet" text="Create a task to start tracking your work." action={createButton} />
        )
      ) : (
        <TasksTable tasks={tasks} onEdit={(task) => setModal({ type: "edit", task })} onDelete={(task) => setModal({ type: "delete", task })} onStatusChange={changeStatus} />
      )}

      <CreateTaskModal open={modal?.type === "create"} onClose={close} onCreated={() => { close(); reload(); }} defaultProjectId={filters.project || undefined} />
      <TaskFormModal
        open={modal?.type === "edit"}
        projectId={modal?.type === "edit" ? modal.task.project : null}
        task={modal?.type === "edit" ? modal.task : undefined}
        onClose={close}
        onSubmit={saveEdit}
      />
      <Modal open={modal?.type === "delete"} title="Delete task" onClose={close}>
        <p className="text-sm text-slate-600">Delete <b>{modal?.type === "delete" ? modal.task.title : ""}</b>? This cannot be undone.</p>
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={close} className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">Cancel</button>
          <SubmitButton type="button" danger loading={deleting} onClick={confirmDelete}>Delete</SubmitButton>
        </div>
      </Modal>
    </div>
  );
}