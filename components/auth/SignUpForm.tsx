"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Mail, Lock, User, Loader2 } from "lucide-react";
import TextField from "./TextField";
import SocialButtons from "./SocialButtons";
import FormError from "./FormError";
import { authRequest } from "@/lib/api";
import { Errors, SignUpValues, validateSignUp } from "@/lib/validation";

export default function SignUpForm() {
  const router = useRouter();
  const [values, setValues] = useState<SignUpValues>({ name: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState<Errors<SignUpValues>>({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (key: keyof SignUpValues) => (v: string) => setValues((p) => ({ ...p, [key]: v }));
  const blur = (key: keyof SignUpValues) => () =>
    setErrors((p) => ({ ...p, [key]: validateSignUp(values)[key] }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setServerError("");
    const found = validateSignUp(values);
    setErrors(found);
    if (Object.keys(found).length) return;

    setLoading(true);
    try {
      const { name, email, password } = values;
      const { token } = await authRequest("/auth/register", { name, email, password });
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
      <h1 className="text-2xl font-bold text-slate-900">Create your account</h1>
      <p className="mt-1 text-sm text-slate-500">Start your journey with TaskFlow today.</p>
      <form onSubmit={onSubmit} noValidate className="mt-6 space-y-4">
        <FormError message={serverError} />
        <TextField label="Full name" name="name" placeholder="Enter your full name" autoComplete="name"
          icon={<User size={16} />} value={values.name} error={errors.name} onChange={set("name")} onBlur={blur("name")} />
        <TextField label="Email address" name="email" type="email" placeholder="you@example.com" autoComplete="email"
          icon={<Mail size={16} />} value={values.email} error={errors.email} onChange={set("email")} onBlur={blur("email")} />
        <TextField label="Password" name="password" type="password" placeholder="Create a password" autoComplete="new-password"
          icon={<Lock size={16} />} value={values.password} error={errors.password} onChange={set("password")} onBlur={blur("password")} />
        <TextField label="Confirm password" name="confirmPassword" type="password" placeholder="Confirm your password" autoComplete="new-password"
          icon={<Lock size={16} />} value={values.confirmPassword} error={errors.confirmPassword} onChange={set("confirmPassword")} onBlur={blur("confirmPassword")} />
        <button type="submit" disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-70">
          {loading && <Loader2 size={16} className="animate-spin" />} Sign Up
        </button>
      </form>
      <SocialButtons />
      <p className="mt-6 text-center text-xs text-slate-500">
        By creating an account, you agree to our <a href="#" className="text-blue-600">Terms of Service</a> and{" "}
        <a href="#" className="text-blue-600">Privacy Policy</a>.
      </p>
    </>
  );
}