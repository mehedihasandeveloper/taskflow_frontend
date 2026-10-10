"use client";
import { useState } from "react";
import { X } from "lucide-react";
import Avatar from "../Avatar";
import Modal from "../ui/Modal";
import SubmitButton from "../ui/SubmitButton";
import AddMemberForm from "./AddMemberForm";
import { Member } from "@/lib/types";

type Props = {
  projectId: string;
  projectName: string;
  owner: Member;
  members: Member[];
  isOwner: boolean;
  onAdd: (email: string) => Promise<void>;
  onRemove: (member: Member) => Promise<void>;
};

export default function MembersPanel({ projectId, projectName, owner, members, isOwner, onAdd, onRemove }: Props) {
  const [removing, setRemoving] = useState<Member | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function confirmRemove() {
    if (!removing) return;
    setBusy(true);
    setError("");
    try {
      await onRemove(removing);
      setRemoving(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to remove member");
    } finally {
      setBusy(false);
    }
  }

  const person = (m: Member, label: string, removable: boolean) => (
    <li key={m.id} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2">
      <Avatar name={m.name} src={m.avatar} size={32} />
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-slate-900">{m.name}</p>
        <p className="truncate text-xs text-slate-500">{label}</p>
      </div>
      {removable && (
        <button aria-label={`Remove ${m.name}`} onClick={() => setRemoving(m)} className="ml-1 rounded p-1 text-slate-400 hover:bg-red-50 hover:text-red-600">
          <X size={14} />
        </button>
      )}
    </li>
  );

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="font-semibold text-slate-900">Team <span className="ml-1 text-sm font-normal text-slate-400">{members.length + 1}</span></h2>
      <ul className="mt-4 flex flex-wrap gap-3">
        {person(owner, "Owner", false)}
        {members.map((m) => person(m, "Member", isOwner))}
      </ul>
      {isOwner && (
        <div className="mt-5 border-t border-slate-100 pt-5">
          <AddMemberForm projects={[{ id: projectId, name: projectName }]} onAdd={(_pid, email) => onAdd(email)} />
        </div>
      )}

      <Modal open={removing !== null} title="Remove member" onClose={() => setRemoving(null)}>
        <p className="text-sm text-slate-600">
          Remove <b>{removing?.name}</b> from this project? Tasks assigned to them will become unassigned.
        </p>
        {error && <p role="alert" className="mt-3 text-sm text-red-600">{error}</p>}
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={() => setRemoving(null)} className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">Cancel</button>
          <SubmitButton type="button" danger loading={busy} onClick={confirmRemove}>Remove</SubmitButton>
        </div>
      </Modal>
    </section>
  );
}
