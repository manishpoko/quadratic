import pool from "@/app/lib/db";

import argon2 from "argon2";

import { randomUUID } from "node:crypto";




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

  if (
    typeof data.email !== "string" ||
    !data.email.trim() ||
    !emailPattern.test(data.email)
  ) {
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

  const existingUser = await pool.query("SELECT id FROM users WHERE email = $1", [
    data.email,
  ]);

  if (existingUser.rows.length > 0) {
    return Response.json({ message: "email already exists" }, { status: 409 });
  }


  //hash password 
  const hashedPassword = await argon2.hash(data.password)

  console.log(`argon 2 works, as - ${hashedPassword}`)

  //create new user in postgres - 

  const userId = randomUUID()
  const newUser = await pool.query( 
    `INSERT INTO users (id, name, email, password_hash)
    VALUES ($1, $2, $3, $4)
    RETURNING id, name, email`,
    [userId, data.name.trim(), data.email.trim().toLowerCase(), hashedPassword]
  )

  return Response.json(
  {
    message: "User created successfully",
    user: newUser.rows[0],
  },
  { status: 201 }
);

  //if all clears-

  return Response.json({
    message: "validation passed",
  });




}
