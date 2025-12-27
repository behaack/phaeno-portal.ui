import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  exp?: number;
  [key: string]: any;
}

export function isTokenExpiredSoon(token: string | null | undefined): boolean {
  if (!token) { return true; }

  try {
    const decoded = jwtDecode<JwtPayload>(token);

    if (!decoded.exp) { return true; }

    const now = Math.floor(Date.now() / 1000);

    return decoded.exp < now + 30; // Refresh if token expires within next 30s
  } catch {
    return true;
  }
}
