import { Suspense } from "react";
import { pool } from "@/lib/db";
import Hero from "@/components/Hero";
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
      <Hero title="Professionals" imageSource="/splash/employement.jpg">
        <p className="mx-auto max-w-[1000px] text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Welcome to the Professionals section of our site, designed as a
          dedicated resource for children or parents who have children with ADHD
          regarding healthcare providers, educators, and other professionals who
          work with individuals affected by ADHD.
        </p>
        <p className="mx-auto max-w-[1000px] text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Sessions with these professionals can cost anywhere from $75 to $200+.
          These prices are negotiated with the professionals and require a
          consultation.
        </p>
      </Hero>
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <Professionals professionals={rows} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
