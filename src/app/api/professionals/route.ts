import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
  try {
    const res = await pool.query("SELECT * from professionals ORDER BY name");
    return NextResponse.json(res.rows);
  } catch (e) {
    return NextResponse.json(
      { message: "Falied to connect to database." },
      { status: 500 }
    );
  }
}
