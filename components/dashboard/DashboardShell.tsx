"use client";
import { ReactNode, useState } from "react";
import { AuthProvider } from "@/context/AuthContext";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";


export default function DashboardShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <AuthProvider>
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar open={open} onClose={() => setOpen(false)} />
        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar onMenu={() => setOpen(true)} />
          <main className="flex-1 p-4 sm:p-6">{children}</main>
        </div>
      </div>
    </AuthProvider>
  );
}