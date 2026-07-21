import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET =
  process.env.BETTER_AUTH_SECRET || "fallback_secret_for_jwt_auth_system_2026";
const secretKey = new TextEncoder().encode(JWT_SECRET);

export async function signJWT(payload: any, expiry: string = "7d") {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiry)
    .sign(secretKey);
}

export async function verifyJWT(token: string) {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload;
  } catch (error) {
    return null;
  }
}
