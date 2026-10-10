"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Users } from "lucide-react";
import Modal from "@/components/ui/Modal";
import EmptyState from "@/components/ui/EmptyState";
import SubmitButton from "@/components/ui/SubmitButton";
import AddMemberForm from "@/components/team/AddMemberForm";
import TeammateCard from "@/components/team/TeammateCard";
import { addProjectMember, getTeam, removeProjectMember, Teammate, TeammateProject } from "@/lib/teamApi";


type TeamData = Awaited<ReturnType<typeof getTeam>>;

export default function TeamPage() {
  const [data, setData] = useState<TeamData | null>(null);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [removal, setRemoval] = useState<{ teammate: Teammate; project: TeammateProject } | null>(null);
  const [busy, setBusy] = useState(false);
  const [removeError, setRemoveError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setError("");
    getTeam()
      .then((d) => !cancelled && setData(d))
      .catch((e) => !cancelled && setError(e instanceof Error ? e.message : "Failed to load your team"));
    return () => { cancelled = true; };
  }, [refresh]);

  const reload = () => setRefresh((n) => n + 1);

  async function handleAdd(projectId: string, email: string) {
    await addProjectMember(projectId, email);
    reload();
  }

  async function confirmRemove() {
    if (!removal) return;
    setBusy(true);
    setRemoveError("");
    try {
      await removeProjectMember(removal.project.id, removal.teammate.id);
      setRemoval(null);
      reload();
    } catch (e) {
      setRemoveError(e instanceof Error ? e.message : "Failed to remove member");
    } finally {
      setBusy(false);
    }
  }

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
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {[0, 1, 2].map((i) => <div key={i} className="h-40 animate-pulse rounded-xl bg-slate-200/70" />)}
      </div>
    );
  } else {
    content = (
      <>
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="font-semibold text-slate-900">Add a teammate</h2>
          <p className="mb-4 mt-0.5 text-sm text-slate-500">Invite a registered user to one of your projects by email.</p>
          {data.ownedProjects.length === 0 ? (
            <p className="text-sm text-slate-600">
              You need a project of your own first. <Link href="/projects" className="font-medium text-blue-600 hover:underline">Create a project</Link>.
            </p>
          ) : (
            <AddMemberForm projects={data.ownedProjects} onAdd={handleAdd} />
          )}
        </section>

        {data.teammates.length === 0 ? (
          <EmptyState icon={<Users />} title="No teammates yet" text="People you share projects with will appear here. Add someone above to start collaborating." />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {data.teammates.map((t) => (
              <TeammateCard key={t.id} teammate={t} onRemove={(teammate, project) => { setRemoveError(""); setRemoval({ teammate, project }); }} />
            ))}
          </div>
        )}
      </>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Team</h1>
        <p className="text-sm text-slate-500">People you collaborate with across your projects.</p>
      </div>
      {content}

      <Modal open={removal !== null} title="Remove member" onClose={() => setRemoval(null)}>
        <p className="text-sm text-slate-600">
          Remove <b>{removal?.teammate.name}</b> from <b>{removal?.project.name}</b>? Tasks assigned to them will become unassigned.
        </p>
        {removeError && <p role="alert" className="mt-3 text-sm text-red-600">{removeError}</p>}
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={() => setRemoval(null)} className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">Cancel</button>
          <SubmitButton type="button" danger loading={busy} onClick={confirmRemove}>Remove</SubmitButton>
        </div>
      </Modal>
    </div>
  );
}