import { cookies } from "next/headers";
import { COOKIE_ACCESS_TOKEN } from "../config";

export async function POST() {
  cookies().delete(COOKIE_ACCESS_TOKEN);
  return Response.json({ message: "Logout successful" });
}
