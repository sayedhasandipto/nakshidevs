import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import type { Auth } from "./auth";

// ─── Better Auth Client ────────────────────────────────────────────────────
// Use this in Client Components ('use client') for sign-in, sign-up, sign-out,
// and session access. The `inferAdditionalFields` plugin ensures the `role`
// field defined in auth.ts is fully typed on the client side too.
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  plugins: [
    inferAdditionalFields<Auth>(), // infers `role` from the server auth type
  ],
});

// ─── Named re-exports for convenience ────────────────────────────────────
export const { signIn, signUp, signOut, useSession, getSession } = authClient;
