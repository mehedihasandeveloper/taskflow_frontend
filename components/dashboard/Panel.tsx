import Link from "next/link";
import { ReactNode } from "react";

type Props = { title: string; href?: string; children: ReactNode };

export default function Panel({ title, href, children }: Props) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-semibold text-slate-900">{title}</h2>
        {href && <Link href={href} className="text-xs font-medium text-blue-600 hover:underline">View all</Link>}
      </div>
      {children}
    </section>
  );
}