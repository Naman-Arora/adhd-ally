import { Suspense } from "react";
import { pool } from "@/lib/db";
import Loading from "@/components/Loading";
import SupportGroups from "./SupportGroups";
import ErrorBoundary from "@/components/ErrorBoundary";
import { type SupportGroup } from "@/lib/queries/supportgroups";

export default async function Page() {
  const { rows } = await pool.query<SupportGroup>(
    "SELECT * from groups ORDER BY name"
  );
  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <SupportGroups supportGroups={rows} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
