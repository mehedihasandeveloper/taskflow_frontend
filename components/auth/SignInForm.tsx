"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Mail, Lock, Loader2 } from "lucide-react";
import TextField from "./TextField";
import SocialButtons from "./SocialButtons";
import FormError from "./FormError";
import { authRequest } from "@/lib/api";
import { Errors, SignInValues, validateSignIn } from "@/lib/validation";

export default function SignInForm() {
  const router = useRouter();
  const [values, setValues] = useState<SignInValues>({ email: "", password: "" });
  const [errors, setErrors] = useState<Errors<SignInValues>>({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (key: keyof SignInValues) => (v: string) => setValues((p) => ({ ...p, [key]: v }));
  const blur = (key: keyof SignInValues) => () =>
    setErrors((p) => ({ ...p, [key]: validateSignIn(values)[key] }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setServerError("");
    const found = validateSignIn(values);
    setErrors(found);
    if (Object.keys(found).length) return;

    setLoading(true);
    try {
      const { token } = await authRequest("/auth/login", values);
      localStorage.setItem("token", token);
      router.push("/dashboard");
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-slate-900">Welcome back!</h1>
      <p className="mt-1 text-sm text-slate-500">Sign in to your account to continue to TaskFlow.</p>
      <form onSubmit={onSubmit} noValidate className="mt-6 space-y-4">
        <FormError message={serverError} />
        <TextField label="Email address" name="email" type="email" placeholder="you@example.com" autoComplete="email"
          icon={<Mail size={16} />} value={values.email} error={errors.email} onChange={set("email")} onBlur={blur("email")} />
        <TextField label="Password" name="password" type="password" placeholder="Enter your password" autoComplete="current-password"
          icon={<Lock size={16} />} value={values.password} error={errors.password} onChange={set("password")} onBlur={blur("password")} />
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-slate-600">
            <input type="checkbox" className="h-4 w-4 rounded border-slate-300" /> Remember me
          </label>
          <Link href="#" className="text-blue-600 hover:underline">Forgot password?</Link>
        </div>
        <button type="submit" disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-70">
          {loading && <Loader2 size={16} className="animate-spin" />} Sign in
        </button>
      </form>
      <SocialButtons />
      <p className="mt-6 text-center text-xs text-slate-500">
        By signing in, you agree to our <a href="#" className="text-blue-600">Terms of Service</a> and{" "}
        <a href="#" className="text-blue-600">Privacy Policy</a>.
      </p>
    </>
  );
}