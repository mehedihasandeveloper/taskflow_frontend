export type Errors<T> = Partial<Record<keyof T, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type SignInValues = { email: string; password: string };
export type SignUpValues = { name: string; email: string; password: string; confirmPassword: string };

export function validateEmail(email: string) {
  if (!email.trim()) return "Email is required";
  if (!EMAIL_RE.test(email)) return "Enter a valid email address";
}

export function validateSignIn(v: SignInValues): Errors<SignInValues> {
  const e: Errors<SignInValues> = {};
  const email = validateEmail(v.email);
  if (email) e.email = email;
  if (!v.password) e.password = "Password is required";
  return e;
}

export function validateSignUp(v: SignUpValues): Errors<SignUpValues> {
  const e: Errors<SignUpValues> = {};
  if (v.name.trim().length < 2) e.name = "Name must be at least 2 characters";
  const email = validateEmail(v.email);
  if (email) e.email = email;
  if (v.password.length < 8) e.password = "Password must be at least 8 characters";
  else if (!/[A-Za-z]/.test(v.password) || !/\d/.test(v.password))
    e.password = "Use at least one letter and one number";
  if (!v.confirmPassword) e.confirmPassword = "Please confirm your password";
  else if (v.confirmPassword !== v.password) e.confirmPassword = "Passwords do not match";
  return e;
}