import { NextResponse, type NextRequest } from "next/server";
import { pool } from "@/lib/db";

export async function GET(
  _request: NextRequest,
  { params: { name } }: { params: { name: string } }
) {
  console.error("in GET states/[name]");
  try {
    const res = await pool.query("SELECT * from states WHERE name=$1", [name]);
    console.log("res.rows", res.rows[0]);
    return NextResponse.json(res.rows[0]);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Falied to connect to database." },
      { status: 500 }
    );
  }
}
