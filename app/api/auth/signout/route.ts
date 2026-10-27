import { createHash } from "crypto"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import pool from "@/app/lib/db"

export async function POST(request: Request) {

    const data = await request.json()

    const cookieStore = await cookies()

     const sessionCookie = cookieStore.get('quadratic_session')
     if (!sessionCookie) {return Response.json({
        message: "no session exists"
     }, {status: 400})}

     const tokenHash = createHash('sha256').update(sessionCookie.value).digest('hex')

     //find a matching session from the db - 
     await pool.query(
        `DELETE FROM sessions WHERE token_hash = $1
        `, [tokenHash]
     )

     cookieStore.delete('quadratic_session')

     return Response.json({
        message: "signout successful"
     }, {status: 200})

}