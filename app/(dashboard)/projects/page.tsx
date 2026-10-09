"use client";
import { useEffect, useState } from "react";
import { FolderKanban, Plus, SearchX } from "lucide-react";
import Modal from "@/components/ui/Modal";
import EmptyState from "@/components/ui/EmptyState";
import SubmitButton from "@/components/ui/SubmitButton";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectForm from "@/components/projects/ProjectForm";
import ProjectsToolbar from "@/components/projects/ProjectsToolbar";
import { useDebounce } from "@/hooks/useDebounce";
import { createProject, deleteProject, listProjects, updateProject } from "@/lib/projectsApi";
import { Project, ProjectInput, ProjectSort, ProjectStatus } from "@/lib/types";

type ModalState = { type: "create" } | { type: "edit"; project: Project } | { type: "delete"; project: Project } | null;

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<ProjectStatus | "">("");
  const [sort, setSort] = useState<ProjectSort>("newest");
  const [refresh, setRefresh] = useState(0);
  const [modal, setModal] = useState<ModalState>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const debouncedSearch = useDebounce(search);
  const filtering = Boolean(debouncedSearch.trim() || status);

  useEffect(() => {
    let cancelled = false; // ignore out-of-date responses
    setError("");
    listProjects({ search: debouncedSearch, status, sort })
      .then((data) => !cancelled && setProjects(data))
      .catch((e) => !cancelled && setError(e instanceof Error ? e.message : "Failed to load projects"));
    return () => { cancelled = true; };
  }, [debouncedSearch, status, sort, refresh]);

  const reload = () => setRefresh((n) => n + 1);
  const close = () => { setModal(null); setDeleteError(""); };

  async function handleSave(values: ProjectInput) {
    if (modal?.type === "edit") await updateProject(modal.project.id, values);
    else await createProject(values);
    close();
    reload();
  }

  async function handleDelete() {
    if (modal?.type !== "delete") return;
    setDeleting(true);
    setDeleteError("");
    try {
      await deleteProject(modal.project.id);
      close();
      reload();
    } catch (e) {
      setDeleteError(e instanceof Error ? e.message : "Failed to delete project");
    } finally {
      setDeleting(false);
    }
  }

  const createButton = (
    <button onClick={() => setModal({ type: "create" })} className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-600/30 hover:bg-blue-700">
      <Plus size={16} /> Create Project
    </button>
  );

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Projects</h1>
          <p className="text-sm text-slate-500">Create, organize and track all your projects.</p>
        </div>
        {createButton}
      </div>

      <ProjectsToolbar search={search} status={status} sort={sort} onSearch={setSearch} onStatus={setStatus} onSort={setSort} />

      {error ? (
        <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="text-sm text-red-700">{error}</p>
          <button onClick={reload} className="mt-3 text-sm font-semibold text-red-700 underline">Try again</button>
        </div>
      ) : projects === null ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[0, 1, 2].map((i) => <div key={i} className="h-44 animate-pulse rounded-xl bg-slate-200/70" />)}
        </div>
      ) : projects.length === 0 ? (
        filtering ? (
          <EmptyState icon={<SearchX />} title="No matching projects" text="Try a different search term or clear the status filter." />
        ) : (
          <EmptyState icon={<FolderKanban />} title="No projects yet" text="Create your first project to start organizing your work." action={createButton} />
        )
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} onEdit={(project) => setModal({ type: "edit", project })} onDelete={(project) => setModal({ type: "delete", project })} />
          ))}
        </div>
      )}

      <Modal open={modal?.type === "create" || modal?.type === "edit"} title={modal?.type === "edit" ? "Edit project" : "Create project"} onClose={close}>
        <ProjectForm project={modal?.type === "edit" ? modal.project : undefined} onSubmit={handleSave} onCancel={close} />
      </Modal>

      <Modal open={modal?.type === "delete"} title="Delete project" onClose={close}>
        <p className="text-sm text-slate-600">
          Are you sure you want to delete <b>{modal?.type === "delete" ? modal.project.name : ""}</b>? This cannot be undone.
        </p>
        {deleteError && <p role="alert" className="mt-3 text-sm text-red-600">{deleteError}</p>}
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={close} className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">Cancel</button>
          <SubmitButton type="button" danger loading={deleting} onClick={handleDelete}>Delete</SubmitButton>
        </div>
      </Modal>
    </div>
  );
}