import { getCurrentUser } from "@/app/lib/auth";

import pool from "@/app/lib/db";







export async function GET(request: Request, 
    { params}  : {params: Promise< { id: string } > }
) {

    const {id} = await params;

    const user = await getCurrentUser();

    if(!user) {
        return Response.json({
            message: "unauthorised user"
        }, {status: 401})
    }




    const data = await pool.query(
        `
        SELECT *
        FROM issues
        WHERE id = $1 AND user_id = $2
        LIMIT 1
        `, [id, user.id]
    )

    if(data.rows.length === 0) {
        return Response.json({
            message: "issue not found"
        }, {status: 404})
    }

    return Response.json(data.rows[0])



}