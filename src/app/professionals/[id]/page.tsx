import Link from "next/link";
import { pool } from "@/lib/db";
import Hero from "@/components/Hero";
import type { State } from "@/lib/queries/states";
import MapLocation from "@/components/MapLocation";
import NoResultsFound from "@/components/NoResultsFound";
import StateDetails from "@/components/sections/StateDetails";
import type { Professional } from "@/lib/queries/professionals";
import type { SupportGroup } from "@/lib/queries/supportgroups";
import SupportGroupsCards from "@/components/sections/SupportGroupsCards";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const {
    rows: [professional],
  } = await pool.query<Professional>(
    "SELECT * from professionals WHERE id=$1",
    [id]
  );

  if (professional === undefined) {
    return <NoResultsFound showSearchIcon={false} />;
  }

  const [
    {
      rows: [state],
    },
    { rows: supportgroups },
  ] = await Promise.all([
    pool.query<State>("SELECT * from states WHERE name=$1", [
      professional.state,
    ]),
    pool.query<SupportGroup>(
      "SELECT * from groups WHERE state=$1 ORDER BY name",
      [professional.state]
    ),
  ]);

  return (
    <>
      <Hero
        imageSource={professional.flag}
        imageFullHeight
        title={professional.name}
      >
        <p className="max-w-prose text-gray-300 md:text-xl">
          <span className="font-bold">{"Title: "}</span>
          {professional.title.toLocaleString()}
        </p>
        <p className="max-w-prose text-gray-300 md:text-xl">
          <span className="font-bold">{"Organization: "}</span>
          {professional.organization.toLocaleString()}
        </p>
        <p className="max-w-prose text-gray-300 md:text-xl">
          <span className="font-bold">{"Location: "}</span>
          {professional.location.toLocaleString()}
        </p>
        <Link href={`/states/${professional.state}`}>
          <p className="max-w-prose text-gray-300 md:text-xl">
            <span className="font-bold">{"State: "}</span>
            {professional.state.toLocaleString()}
          </p>
        </Link>
        <p className="max-w-prose text-gray-300 md:text-xl">
          <span className="font-bold">{"Phone: "}</span>
          {professional.phone.toLocaleString()}
        </p>
        <p className="max-w-prose text-gray-300 md:text-xl">
          <span className="font-bold">{"Works Remotely: "}</span>
          {professional.remote_work ? "Yes" : "No"}
        </p>
      </Hero>
      <MapLocation location={professional.location} />
      <StateDetails state={state} />
      <section className="w-full py-12 md:py-24">
        <div className="container px-10 flex flex-col gap-8 md:gap-16 items-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Support Groups
          </h2>
          <SupportGroupsCards data={supportgroups} />
        </div>
      </section>
    </>
  );
}
