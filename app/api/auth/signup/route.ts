import pool from "@/app/lib/db";


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

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (typeof data.email !== "string" || !data.email.trim() || !emailPattern.test(data.email)) {
    return Response.json({ error: "invalid email" }, { status: 400 });
  }

  if (typeof data.password != "string" || data.password.length < 8) {
    return Response.json(
      {
        error: "password required",
      },
      { status: 400 },
    );
  }


//check for duplicate email - 

  const result = await pool.query(
  "SELECT id FROM users WHERE email = $1",
  [data.email]

)

  if(result.rows.length >0) {

    return Response.json( {message: "email already exists"}, {status: 409})
  }

  //if all clears-

  return Response.json({
    message: "validation passed",
  });


}


