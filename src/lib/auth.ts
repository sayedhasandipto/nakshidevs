import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient } from "mongodb";

// ─── MongoDB Native Client Singleton ────────────────────────────────────────
// Better Auth requires a native MongoClient (not Mongoose).
// We use a global singleton to avoid creating a new connection on every hot-reload.
const globalForMongo = global as unknown as { _mongoClient: MongoClient };

if (!globalForMongo._mongoClient) {
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/dummy";
  globalForMongo._mongoClient = new MongoClient(uri);
  // Connect eagerly — fire-and-forget (MongoClient queues ops until connected)
  globalForMongo._mongoClient.connect().catch(console.error);
}

const client = globalForMongo._mongoClient;

// ─── Better Auth Instance ─────────────────────────────────────────────────
// Must be a synchronous top-level export — NOT an async factory.
export const auth = betterAuth({
  // Point to the database embedded in the URI (e.g. "service-platform")
  database: mongodbAdapter(client.db()),

  // ── Email / Password ──────────────────────────────────────────────────
  emailAndPassword: {
    enabled: true,
    autoSignIn: true, // sign in automatically after sign-up
    minPasswordLength: 8,
  },

  // ── Custom user fields ────────────────────────────────────────────────
  // "role" is not part of Better Auth's default schema, so we declare it here.
  // It will be stored in the `user` document in MongoDB.
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "client",
        input: true, // allow the client to send this field during sign-up
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
  ].filter((v, i, a) => v && a.indexOf(v) === i),
});

// ─── Type Export ─────────────────────────────────────────────────────────
// Useful for `authClient` inference in the frontend
export type Auth = typeof auth;
