import { NextResponse, type NextRequest } from "next/server";
import { pool } from "@/lib/db";

export async function GET(
  _request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const res = await pool.query("SELECT * from groups WHERE id=$1", [id]);
    return NextResponse.json(res.rows[0]);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Falied to connect to database." },
      { status: 500 }
    );
  }
}
