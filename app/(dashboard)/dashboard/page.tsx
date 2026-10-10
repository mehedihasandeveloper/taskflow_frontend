"use client";
import { useEffect, useState } from "react";
import { FolderKanban, ListChecks, CheckCircle2, Clock, Plus } from "lucide-react";
import Modal from "@/components/ui/Modal";
import StatCard from "@/components/dashboard/StatCard";
import RecentProjects from "@/components/dashboard/RecentProjects";
import RecentTasks from "@/components/dashboard/RecentTasks";
import TaskCompletion from "@/components/dashboard/TaskCompletion";
import QuickActions from "@/components/dashboard/QuickActions";
import CreateTaskModal from "@/components/tasks/CreateTaskModal";
import ProjectForm from "@/components/projects/ProjectForm";
import { useAuth } from "@/context/AuthContext";
import { DashboardData, getDashboard } from "@/lib/dashboardApi";
import { createProject } from "@/lib/projectsApi";
import { ProjectInput } from "@/lib/types";

const weekNote = (n: number) => (n > 0 ? `↑ ${n} this week` : "No change this week");

export default function DashboardPage() {
  const { user } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [modal, setModal] = useState<"project" | "task" | null>(null);

  useEffect(() => {
    let cancelled = false;
    setError("");
    getDashboard()
      .then((d) => !cancelled && setData(d))
      .catch((e) => !cancelled && setError(e instanceof Error ? e.message : "Failed to load dashboard"));
    return () => { cancelled = true; };
  }, [refresh]);

  const reload = () => setRefresh((n) => n + 1);
  const close = () => setModal(null);

  async function handleCreateProject(values: ProjectInput) {
    await createProject(values);
    close();
    reload();
  }

  const header = (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500">Welcome back, {user.name.split(" ")[0]}! Here&apos;s an overview of your projects and tasks.</p>
      </div>
      <div className="flex gap-3">
        <button onClick={() => setModal("project")} className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-600/30 hover:bg-blue-700">
          <Plus size={16} /> Create Project
        </button>
        <button onClick={() => setModal("task")} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50">
          <Plus size={16} /> Create Task
        </button>
      </div>
    </div>
  );

  let content;
  if (error) {
    content = (
      <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
        <p className="text-sm text-red-700">{error}</p>
        <button onClick={reload} className="mt-3 text-sm font-semibold text-red-700 underline">Try again</button>
      </div>
    );
  } else if (!data) {
    content = (
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[0, 1, 2, 3].map((i) => <div key={i} className="h-28 animate-pulse rounded-xl bg-slate-200/70" />)}
        </div>
        <div className="h-72 animate-pulse rounded-xl bg-slate-200/70" />
      </div>
    );
  } else {
    const { stats } = data;
    content = (
      <>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Total Projects" value={stats.projects} note={weekNote(stats.projectsThisWeek)} tone="bg-blue-50 text-blue-600" icon={<FolderKanban size={18} />} />
          <StatCard label="Total Tasks" value={stats.tasks} note={weekNote(stats.tasksThisWeek)} tone="bg-violet-50 text-violet-600" icon={<ListChecks size={18} />} />
          <StatCard label="Completed Tasks" value={stats.completed} note={weekNote(stats.completedThisWeek)} tone="bg-emerald-50 text-emerald-600" icon={<CheckCircle2 size={18} />} />
          <StatCard label="Pending Tasks" value={stats.pending} note={weekNote(stats.pendingThisWeek)} tone="bg-orange-50 text-orange-600" icon={<Clock size={18} />} />
        </div>
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-[1.2fr_1fr_0.7fr]">
          <RecentProjects projects={data.recentProjects} />
          <RecentTasks tasks={data.recentTasks} />
          <div className="space-y-4 lg:col-span-2 xl:col-span-1">
            <TaskCompletion completed={stats.completed} pending={stats.pending} />
            <QuickActions onCreateProject={() => setModal("project")} onCreateTask={() => setModal("task")} />
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {header}
      {content}
      <Modal open={modal === "project"} title="Create project" onClose={close}>
        <ProjectForm onSubmit={handleCreateProject} onCancel={close} />
      </Modal>
      <CreateTaskModal open={modal === "task"} onClose={close} onCreated={() => { close(); reload(); }} />
    </div>
  );
}