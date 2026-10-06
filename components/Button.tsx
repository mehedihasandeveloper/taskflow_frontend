import Link from "next/link";
import { ReactNode } from "react";

type Props = { href: string; children: ReactNode; variant?: "primary" | "outline" | "ghost" };

const styles = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm shadow-blue-600/30",
  outline: "border border-slate-200 bg-white text-slate-800 hover:bg-slate-50",
  ghost: "text-slate-600 hover:text-slate-900",
};

export default function Button({ href, children, variant = "primary" }: Props) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition ${styles[variant]}`}
    >
      {children}
    </Link>
  );
}