import pool from "@/app/lib/db";

import argon2 from "argon2";
import { createHash, randomBytes, randomUUID } from "crypto";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const data = await request.json();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (
    typeof data.email != "string" ||
    !data.email.trim() ||
    !emailPattern.test(data.email)
  ) {
    return Response.json(
      {
        message: "invalid email or password",
      },
      { status: 401 },
    );
  }

  if (typeof data.password != "string") {
    return Response.json(
      {
        message: "invalid email or password",
      },
      { status: 401 },
    );
  }

  //after validation, make them easier and ready to use-
  const submittedEmail = data.email.trim().toLowerCase();
  const submittedPassword = data.password;

  //now login logic -
  const existingUser = await pool.query(
    `SELECT id, name, email, password_hash FROM users WHERE email = $1
        LIMIT 1
         `,
    [submittedEmail],
  );
  if (existingUser.rows.length === 0) {
    return Response.json(
      {
        message: "invalid email or password",
      },
      { status: 401 },
    );
  }

  const user = existingUser.rows[0]; //extract the first mathching user row

  const isValidPassword = await argon2.verify(
    user.password_hash,
    submittedPassword,
  );
  if (!isValidPassword) {
    return Response.json(
      {
        message: "invalid email or password",
      },
      { status: 401 },
    );
  }

  //create a new session just like in signup-

  const userId = user.id; //this is from the queried user from database
  const sessionId = randomUUID();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const sessionToken = randomBytes(32).toString("hex");
  const tokenHash = createHash("sha256").update(sessionToken).digest("hex");

  await pool.query(
    `INSERT INTO sessions (id, user_id, token_hash, expires_at)
        VALUES ($1, $2, $3, $4)
        `,
    [sessionId, userId, tokenHash, expiresAt],
  );

  const cookieStore = await cookies();

  cookieStore.set(`quadratic_session`, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });

  return Response.json(
    {
      message: "signed in successfully",
      user: { id: user.id, name: user.name, email: user.email },
    },
    { status: 200 },
  );
}
