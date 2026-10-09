import { ReactNode } from "react";
import ProfileForm from "@/components/settings/ProfileForm";
import PasswordForm from "@/components/settings/PasswordForm";

function Section({ title, text, children }: { title: string; text: string; children: ReactNode }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="font-semibold text-slate-900">{title}</h2>
      <p className="mb-5 mt-0.5 text-sm text-slate-500">{text}</p>
      {children}
    </section>
  );
}

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-sm text-slate-500">Manage your profile and account security.</p>
      </div>
      <Section title="Profile" text="Update your name, email and profile photo.">
        <ProfileForm />
      </Section>
      <Section title="Change password" text="Use a strong password you don't use anywhere else.">
        <PasswordForm />
      </Section>
    </div>
  );
}