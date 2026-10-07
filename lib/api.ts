const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

export type AuthResponse = { token: string; user: { id: string; name: string; email: string } };

export class ApiRequestError extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}

export const getToken = () => (typeof window === "undefined" ? null : localStorage.getItem("token"));
export const clearToken = () => localStorage.removeItem("token");

/** Generic request helper: adds the JWT, parses JSON, throws ApiRequestError on failure. */
export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    });
  } catch {
    throw new ApiRequestError("Cannot reach the server. Please try again.", 0);
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiRequestError(data.message ?? "Something went wrong", res.status);
  return data as T;
}

export function authRequest(path: "/auth/login" | "/auth/register", body: Record<string, string>) {
  return apiFetch<AuthResponse>(path, { method: "POST", body: JSON.stringify(body) });
}