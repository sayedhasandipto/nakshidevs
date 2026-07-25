import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient } from "mongodb";

// ─── Environment Checking ──────────────────────────────────────────────────
const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is missing in environment variables!");
}

// ─── MongoDB Native Client Singleton ────────────────────────────────────────
// Avoid creating multiple connections on hot-reloads and serverless invocations.
const globalForMongo = global as unknown as { _mongoClient?: MongoClient };

if (!globalForMongo._mongoClient) {
  globalForMongo._mongoClient = new MongoClient(uri);
}

const client = globalForMongo._mongoClient;

// ─── Better Auth Instance ─────────────────────────────────────────────────
export const auth = betterAuth({
  // mongodbAdapter automatically handles client connection under the hood
  database: mongodbAdapter(client.db()),

  // ── Email / Password ──────────────────────────────────────────────────
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    minPasswordLength: 8,
  },

  // ── Custom user fields ────────────────────────────────────────────────
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "client",
        input: true,
      },
    },
  },

  // ── Session ───────────────────────────────────────────────────────────
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // refresh session cookie every 24 h
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // cache on client for 5 minutes
    },
  },

  // ── Security ──────────────────────────────────────────────────────────
  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.BETTER_AUTH_URL ?? process.env.NEXT_PUBLIC_APP_URL,
  trustedOrigins: [
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    process.env.BETTER_AUTH_URL || "http://localhost:3000",
  ].filter((v, i, a) => Boolean(v) && a.indexOf(v) === i),
});

// ─── Type Export ─────────────────────────────────────────────────────────
export type Auth = typeof auth;
