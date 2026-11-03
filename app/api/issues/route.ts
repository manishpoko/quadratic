import pool from "@/app/lib/db";

import { getCurrentUser } from "@/app/lib/auth";
import { randomUUID } from "crypto";


//get issues - 
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

//create an issue - 
export async function POST(request: Request) {

    const user = await getCurrentUser();

    if(!user) {
        return Response.json({
            message: "cannot find user"
        }, {status: 400}
    )
    }

    //read the data sent by the frontend
    const body = await request.json()

    //destructure its contents - 
    const { title, description, priority, status } = body;

    //validate the title
    if( typeof title !== 'string' || !title.trim()) {
        return Response.json({
            message: "title is required"
        }, {status: 400})
    }

    //generate a unique id to assign to the issue
    const issueId = randomUUID();

    //insert the issue into postgres - 
    const result = await pool.query(
        `
        INSERT INTO issues (
        id, user_id, title, description, priority, status
        )
        VALUES ( $1, $2, $3, $4, $5, $6)
        RETURNING *
        
        `, [issueId, user.id, title.trim(), description || null, priority || 'moderate' , status || 'pending' ]
    )


    //return the new issue we just created above - 
    return Response.json(result.rows[0], {status: 201})

    

}