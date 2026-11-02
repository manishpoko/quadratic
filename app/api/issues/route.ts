import pool from "@/app/lib/db";

import { getCurrentUser } from "@/app/lib/auth";

export async function GET() {

    const user = await getCurrentUser();
    if (!user) {
        return Response.json({
            message: "error getting user"

        }, {
            status: 401
        })
    }

    const getIssues = await pool.query(
        `SELECT * 
        FROM issues
        WHERE user_id = $1
        ORDER BY created_at DESC`

    , [user.id])

    return Response.json(getIssues.rows);
}