import { ArrowRight, Play } from "lucide-react";
import Button from "../Button";
import DashboardMockup from "./DashboardMockup";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* soft gradient glow behind the hero */}
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-[500px] w-[700px] rounded-full bg-gradient-to-br from-blue-100 via-indigo-50 to-transparent blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -left-32 top-40 h-72 w-72 rounded-full bg-sky-50 blur-3xl" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
        <div>
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
            Simple • Powerful • Together
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
            Organize your work.<br />Manage your projects.<br />
            <span className="text-blue-600">Get things done.</span>
          </h1>
          <p className="mt-5 max-w-md text-slate-600">
            TaskFlow helps you and your team stay organized, track progress, and achieve your goals — all in one place.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/signup">Get Started Free <ArrowRight size={16} /></Button>
            <Button href="#preview" variant="outline"><Play size={14} /> Watch Demo</Button>
          </div>
        </div>
        <DashboardMockup />
      </div>
    </section>
  );
}