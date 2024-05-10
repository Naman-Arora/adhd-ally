import { Suspense } from "react";
import { pool } from "@/lib/db";
import Loading from "@/components/Loading";
import Professionals from "./Professionals";
import ErrorBoundary from "@/components/ErrorBoundary";
import type { Professional } from "@/lib/queries/professionals";

export default async function Page() {
  const { rows } = await pool.query<Professional>(
    "SELECT * from professionals ORDER BY name"
  );

  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <Professionals professionals={rows} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
