"use client";
import { Bell, Menu, Search } from "lucide-react";
import Avatar from "../Avatar";
import { useAuth } from "@/context/AuthContext";

export default function Topbar({ onMenu }: { onMenu: () => void }) {
  const { user } = useAuth();
  return (
    <header className="flex h-16 items-center gap-3 border-b border-slate-200 bg-white px-4 sm:px-6">
      <button className="lg:hidden" aria-label="Open menu" onClick={onMenu}><Menu /></button>
      <div className="relative max-w-sm flex-1">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          placeholder="Search anything..."
          className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>
      <div className="ml-auto flex items-center gap-4">
        <button aria-label="Notifications" className="text-slate-500 hover:text-slate-800"><Bell size={18} /></button>
        <div className="flex items-center gap-2">
          <Avatar name={user.name} src={user.avatar} />
          <span className="hidden text-sm font-medium text-slate-700 sm:block">{user.name}</span>
        </div>
      </div>
    </header>
  );
}