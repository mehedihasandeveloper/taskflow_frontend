import Link from "next/link";
import { ReactNode } from "react";
import Logo from "../Logo";

type Props = { prompt: string; linkText: string; linkHref: string; children: ReactNode };

export default function AuthLayout({ prompt, linkText, linkHref, children }: Props) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-b from-blue-50 via-[#eef4ff] to-[#e3edff]">
      {/* Decorative waves along the bottom */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] w-full"
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
      >
        <path
          fill="#dbe7ff"
          fillOpacity="0.7"
          d="M0,220 C240,120 420,320 720,240 C1020,160 1200,60 1440,160 L1440,400 L0,400 Z"
        />
        <path
          fill="#c7d9fb"
          fillOpacity="0.55"
          d="M0,300 C300,220 520,380 820,320 C1100,265 1280,200 1440,260 L1440,400 L0,400 Z"
        />
        <path
          fill="#b4cbf8"
          fillOpacity="0.4"
          d="M0,350 C260,310 560,400 900,360 C1160,330 1320,300 1440,330 L1440,400 L0,400 Z"
        />
      </svg>
      {/* Soft glow top-right */}
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl" />

      <header className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
        <Link href="/"><Logo /></Link>
        <p className="text-sm text-slate-600">
          {prompt}{" "}
          <Link href={linkHref} className="font-medium text-blue-600 hover:underline">{linkText}</Link>
        </p>
      </header>

      <main className="relative mx-auto w-full max-w-md px-4 pb-16 pt-6">
        <div className="rounded-2xl border border-white/60 bg-white p-6 shadow-xl shadow-blue-900/10 sm:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}