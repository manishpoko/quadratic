import pool from "@/app/lib/db";

export async function GET() {

    console.log("database URL exists:", !!process.env.DATABASE_URL)


  const result = await pool.query("SELECT NOW()");

  return Response.json(result.rows);
}
