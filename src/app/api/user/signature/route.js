export const runtime = "edge";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const publicKey = searchParams.get("publicKey");

  if (!publicKey) {
    return new Response("Invalid request", {
      status: 400
    });
  }

  const response = await fetch(
    `${process.env.WALLET_SERVICE_HOST}/api/user/signatures?publicKey=${publicKey}`
  );
  const data = await response.json();

  if (!data.message) {
    return new Response(JSON.stringify(data), {
      status: 400
    });
  }

  return new Response(data.message);
}
