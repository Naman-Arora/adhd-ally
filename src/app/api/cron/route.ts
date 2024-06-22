import { type NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ message: "Unauthorized!" }, { status: 401 });
  }
  try {
    const { rows: states } = await pool.query(
      "SELECT * from states ORDER BY name"
    );

    const { rows: professionals } = await pool.query(
      "SELECT * from professionals ORDER BY name"
    );

    const { rows: supportgroups } = await pool.query(
      "SELECT * from groups ORDER BY name"
    );

    return NextResponse.json({ states, professionals, supportgroups });
  } catch (e) {
    return NextResponse.json(
      { message: "Falied to connect to database." },
      { status: 500 }
    );
  }
}
