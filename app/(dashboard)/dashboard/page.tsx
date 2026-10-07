"use client";
import { FolderKanban, ListChecks, CheckCircle2, Clock, Plus } from "lucide-react";
import Button from "@/components/Button";

import { useAuth } from "@/context/AuthContext";
import { stats } from "@/lib/mockData";
import StatCard from "@/components/dashboard/StatCard";
import RecentProjects from "@/components/dashboard/RecentProjects";
import RecentTasks from "@/components/dashboard/RecentTasks";
import TaskCompletion from "@/components/dashboard/TaskCompletion";
import QuickActions from "@/components/dashboard/QuickActions";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-sm text-slate-500">Welcome back, {user.name.split(" ")[0]}! Here&apos;s an overview of your projects and tasks.</p>
        </div>
        <div className="flex gap-3">
          <Button href="/projects"><Plus size={16} /> Create Project</Button>
          <Button href="/tasks" variant="outline"><Plus size={16} /> Create Task</Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Projects" value={stats.projects} note="↑ 1 this week" tone="bg-blue-50 text-blue-600" icon={<FolderKanban size={18} />} />
        <StatCard label="Total Tasks" value={stats.tasks} note="↑ 6 this week" tone="bg-violet-50 text-violet-600" icon={<ListChecks size={18} />} />
        <StatCard label="Completed Tasks" value={stats.completed} note="↑ 8 this week" tone="bg-emerald-50 text-emerald-600" icon={<CheckCircle2 size={18} />} />
        <StatCard label="Pending Tasks" value={stats.pending} note="↑ 2 this week" tone="bg-orange-50 text-orange-600" icon={<Clock size={18} />} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-[1.2fr_1fr_0.7fr]">
        <RecentProjects />
        <RecentTasks />
        <div className="space-y-4 lg:col-span-2 xl:col-span-1">
          <TaskCompletion completed={stats.completed} pending={stats.pending} />
          <QuickActions />
        </div>
      </div>
    </div>
  );
}