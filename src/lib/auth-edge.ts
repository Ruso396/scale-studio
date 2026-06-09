import { jwtVerify } from "jose";
import { getJwtSecret } from "@/lib/env";
import type { JwtPayload } from "@/types";

function getSecretKey(): Uint8Array {
  return new TextEncoder().encode(getJwtSecret());
}

export async function verifyTokenEdge(
  token: string
): Promise<JwtPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return {
      userId: payload.userId as string,
      email: payload.email as string,
      role: payload.role as JwtPayload["role"],
      name: payload.name as string,
    };
  } catch {
    return null;
  }
}
