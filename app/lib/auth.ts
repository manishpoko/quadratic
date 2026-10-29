//all the protected route and authenticated acces (cookies and sessions) code here - 

import { cookies } from "next/headers";
import { createHash } from "node:crypto";
import pool from "./db";
import { redirect } from "next/navigation";


export async function getCurrentUser() {

const cookieStore = await cookies()

//read the session cookie-
const sessionCookie = cookieStore.get('quadratic_session')
if(!sessionCookie) {redirect ('/signin')}

//hash the token from the cookie - 
const tokenHash = createHash('sha256').update(sessionCookie.value).digest('hex')

//find a matching, unexpired session and its user - 
const result = await pool.query(
    `SELECT u.id, u.name, u.email
    FROM sessions AS s
    JOIN users AS u ON u.id = s.user_id
    WHERE s.token_hash = $1
    AND s.expires_at > NOW()
    LIMIT 1
    `,
    [tokenHash] //this is the value that goes inside $1 above
)

return result.rows[0] ?? null;





}