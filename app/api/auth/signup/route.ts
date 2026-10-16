export async function POST(request: Request) {
  const data = await request.json();

  if (typeof data.name !== "string" || !data.name.trim()) {
    return Response.json(
      {
        error: "invalid format name",
      },
      {
        status: 400,
      },
    );
  }

  if(typeof data.email !== "string" || data.email())

  return Response.json({ email: data.email });
}
