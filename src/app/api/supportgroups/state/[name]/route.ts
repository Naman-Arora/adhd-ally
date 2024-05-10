import { NextResponse, type NextRequest } from "next/server";
import { pool } from "@/lib/db";

export async function GET(
  _request: NextRequest,
  { params: { name } }: { params: { name: string } }
) {
  try {
    const res = await pool.query("SELECT * from groups WHERE state=$1 ORDER BY name", [name]);
    return NextResponse.json(res.rows);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Falied to connect to database." },
      { status: 500 }
    );
  }
}
