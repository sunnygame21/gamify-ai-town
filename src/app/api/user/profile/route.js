import { COOKIE_ACCESS_TOKEN } from "../config";
import { cookies } from "next/headers";

export const runtime = "edge";

export async function GET() {
  const accessToken = cookies().get(COOKIE_ACCESS_TOKEN)?.value;

  const user = await fetch(
    `${process.env.WALLET_SERVICE_HOST}/api/user/profile`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  )
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
      return { err };
    });

  if (user.err) {
    return new Response(user.err, {
      status: 400
    });
  }

  return Response.json(user);
}
