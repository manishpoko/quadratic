import pool from "@/app/lib/db";

import argon2 from "argon2";

import { randomUUID } from "node:crypto";

import { randomBytes, createHash } from "node:crypto";

import { cookies } from "next/headers";




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

  const email = data.email.trim().toLowerCase()

  //check for duplicate email -

  const existingUser = await pool.query("SELECT id FROM users WHERE email = $1", [email]);

  if (existingUser.rows.length > 0) {
    return Response.json({ message: "email already exists" }, { status: 409 });
  }


  //hash password 
  const hashedPassword = await argon2.hash(data.password)


  //create new user in postgres - 

  const userId = randomUUID()
  const newUser = await pool.query( 
    `INSERT INTO users (id, name, email, password_hash)
    VALUES ($1, $2, $3, $4)
    RETURNING id, name, email`,
    [userId, data.name.trim(), email, hashedPassword]
  )

  //generate session after a successful new user creation -
  const sessionToken = randomBytes(32).toString("hex") 

  const tokenHash = createHash("sha256").update(sessionToken).digest('hex') 

  const sessionId = randomUUID()

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

  await pool.query(
    `INSERT INTO sessions (id, user_id, token_hash, expires_at)
    VALUES ($1, $2, $3, $4)`,
    [sessionId, userId, tokenHash, expiresAt]

  )

  //sessionToken is just the token for the browser and cookies, while tokenHash is stored in the db(server). while verifying, sessionToken comes from the client (cookies) and is compared with the server (db)'s tokenHash to see if the user exists already.

  
  //define and set cookies-
  const cookieStore = await cookies();

  cookieStore.set("quadratic_session", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV==='production',
    sameSite: "lax",
    path: '/',
    expires: expiresAt
  })

  return Response.json(
  {
    message: "User created successfully",
    user: newUser.rows[0],
  },
  { status: 201 }
);










}
