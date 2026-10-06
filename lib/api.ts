const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

export type AuthResponse = { token: string; user: { id: string; name: string; email: string } };

export async function authRequest(
  path: "/auth/login" | "/auth/register",
  body: Record<string, string>
): Promise<AuthResponse> {
  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error("Cannot reach the server. Please try again.");
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message ?? "Something went wrong");
  return data;
}