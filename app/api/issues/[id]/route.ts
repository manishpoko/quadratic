import { getCurrentUser } from "@/app/lib/auth";

import pool from "@/app/lib/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const user = await getCurrentUser();

  if (!user) {
    return Response.json(
      {
        message: "unauthorised user",
      },
      { status: 401 },
    );
  }

  const data = await pool.query(
    `
        SELECT *
        FROM issues
        WHERE id = $1 AND user_id = $2
        LIMIT 1
        `,
    [id, user.id],
  );

  if (data.rows.length === 0) {
    return Response.json(
      {
        message: "issue not found",
      },
      { status: 404 },
    );
  }

  return Response.json(data.rows[0]);
}

//patch -
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const user = await getCurrentUser();

  if (!user) {
    return Response.json(
      {
        message: "unauthorised user",
      },
      { status: 401 },
    );
  }

  //read request body
  const body = await request.json();

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return Response.json({ message: "invalid request body" }, { status: 400 });
  }

  //reject empty request-
  if (Object.keys(body).length === 0) {
    return Response.json(
      {
        message: "no fields provided for update",
      },
      { status: 400 },
    );
  }

  const { title, description, status, priority } = body;

  if (typeof title !== "string") {
    return Response.json(
      {
        message: "invalid format",
      },
      { status: 400 },
    );
  }

  //validate description -
  if (
    description !== undefined &&
    description !== null &&
    typeof description !== "string"
  ) {
    return Response.json({ message: "invalid description" }, { status: 400 });
  }

  const allowedStatuses = ["pending", "in process", "delayed", "completed"];

  const allowedPriorities = ["light", "moderate", "urgent", "high-priority"];

  if (status !== undefined && !allowedStatuses.includes(status)) {
    return Response.json(
      {
        message: "invalid status format",
      },
      { status: 400 },
    );
  }
  if (priority !== undefined && !allowedPriorities.includes(priority)) {
    return Response.json(
      {
        message: "invalid priority ",
      },
      { status: 400 },
    );
  }

  const data = await pool.query(
    `
        UPDATE issues
        SET title = CASE WHEN $1 THEN $2 ELSE title END,
        description = CASE WHEN $3 THEN $4 ELSE description END,
        status = CASE WHEN $5 THEN $6 ELSE status END,
        priority = CASE WHEN $7 THEN $8 ELSE priority END,
        updated_at = NOW()

        WHERE id = $9 and user_id = $10
        RETURNING *

        `,
        [
            title !== undefined,
            title !== undefined ? title.trim() : null,

            

            description !== undefined,
            description,

            status !== undefined,
            status,

            priority !== undefined,
            priority,

            id,
            user.id


        ],
  );

  //check whether the issue exists
  if (data.rows.length !== 0) {
    return Response.json(
      {
        message: "issue not found",
      },
      { status: 404 },
    );
  }


  //returnu final updated response if all pass - 
  return Response.json(data.rows[0], {status: 200})
}
