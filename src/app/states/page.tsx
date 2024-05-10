import { Suspense } from "react";
import States from "./States";
import { pool } from "@/lib/db";
import Loading from "@/components/Loading";
import type { State } from "@/lib/queries/states";
import ErrorBoundary from "@/components/ErrorBoundary";

export default async function Page() {
  const { rows } = await pool.query<State>(
    "SELECT * from states ORDER BY name"
  );

  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <States states={rows} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
