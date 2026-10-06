"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "../Logo";
import Button from "../Button";

const links = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#cta" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-10">
          <Link href="/"><Logo /></Link>
          <ul className="hidden gap-6 text-sm text-slate-600 md:flex">
            {links.map((l) => (
              <li key={l.href}><a href={l.href} className="hover:text-slate-900">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <Button href="/signin" variant="ghost">Sign In</Button>
          <Button href="/signup">Get Started</Button>
        </div>
        <button className="md:hidden" aria-label="Toggle menu" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <div className="space-y-3 border-t border-slate-100 bg-white px-4 py-4 md:hidden">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block text-sm text-slate-700">{l.label}</a>
          ))}
          <div className="flex gap-3 pt-2">
            <Button href="/signin" variant="outline">Sign In</Button>
            <Button href="/signup">Get Started</Button>
          </div>
        </div>
      )}
    </header>
  );
}