import { cookies } from "next/headers";
import { COOKIE_ACCESS_TOKEN } from "../config";

export const runtime = "edge";

export async function POST(request) {
  const { publicKey, signature } = await request.json();

  if (!publicKey || !signature) {
    return new Response(JSON.stringify({ message: "Invalid request" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  const data = await fetch(
    `${process.env.WALLET_SERVICE_HOST}/api/user/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        address: publicKey,
        signature: signature
      })
    }
  ).then((res) => res.json());

  const access_token = data.access_token;
  // set cookie
  cookies().set(COOKIE_ACCESS_TOKEN, access_token);

  return Response.json({ access_token });
}
