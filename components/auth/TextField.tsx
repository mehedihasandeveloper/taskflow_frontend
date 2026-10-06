"use client";
import { useState, ReactNode } from "react";
import { Eye, EyeOff } from "lucide-react";

type Props = {
  label: string;
  name: string;
  type?: "text" | "email" | "password";
  placeholder: string;
  value: string;
  icon: ReactNode;
  error?: string;
  autoComplete?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
};

export default function TextField({ label, name, type = "text", placeholder, value, icon, error, autoComplete, onChange, onBlur }: Props) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";

  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-slate-800">{label}</label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{icon}</span>
        <input
          id={name}
          name={name}
          type={isPassword && show ? "text" : type}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className={`w-full rounded-lg border bg-white py-2.5 pl-10 pr-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 ${
            error ? "border-red-400 focus:ring-red-100" : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
          }`}
        />
        {isPassword && (
          <button
            type="button"
            aria-label={show ? "Hide password" : "Show password"}
            onClick={() => setShow(!show)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
      {error && <p id={`${name}-error`} className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}