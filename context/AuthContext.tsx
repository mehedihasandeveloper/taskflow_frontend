"use client";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { apiFetch, clearToken, getToken } from "@/lib/api";

export type User = { id: string; name: string; email: string; avatar?: string };
type AuthContextValue = { user: User; logout: () => void; updateUser: (user: User) => void };

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}

/** Protects its children: redirects to /signin when there is no valid token. */
export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!getToken()) {
      router.replace("/signin");
      return;
    }
    apiFetch<{ user: User }>("/users/me")
      .then((d) => setUser(d.user))
      .catch(() => {
        clearToken();
        router.replace("/signin");
      });
  }, [router]);

  const logout = () => {
    clearToken();
    router.replace("/signin");
  };

  if (!user) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-50">
        <Loader2 className="animate-spin text-blue-600" />
      </div>
    );
  }
  return <AuthContext.Provider value={{ user, logout, updateUser: setUser }}>{children}</AuthContext.Provider>;
}