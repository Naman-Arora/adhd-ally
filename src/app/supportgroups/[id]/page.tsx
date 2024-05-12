import Link from "next/link";
import { pool } from "@/lib/db";
import Hero from "@/components/Hero";
import type { State } from "@/lib/queries/states";
import MapLocation from "@/components/MapLocation";
import NoResultsFound from "@/components/NoResultsFound";
import StateDetails from "@/components/sections/StateDetails";
import type { Professional } from "@/lib/queries/professionals";
import type { SupportGroup } from "@/lib/queries/supportgroups";
import ProfessionalsCards from "@/components/sections/ProfessionalsCards";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const {
    rows: [group],
  } = await pool.query<SupportGroup>("SELECT * from groups WHERE id=$1", [id]);

  if (group === undefined) {
    return <NoResultsFound showSearchIcon={false} />;
  }

  const [
    {
      rows: [state],
    },
    { rows: professionals },
  ] = await Promise.all([
    pool.query<State>("SELECT * from states WHERE name=$1", [group.state]),
    pool.query<Professional>(
      "SELECT * from professionals WHERE state=$1 ORDER BY name",
      [group.state]
    ),
  ]);

  return (
    <>
      <Hero imageFullHeight imageSource={group.image} title={group.name}>
        <p className="max-w-prose text-gray-300 md:text-xl">
          <span className="font-bold">{"Contact Person: "}</span>
          {group.contact_person.toLocaleString()}
        </p>
        <p className="max-w-prose text-gray-300 md:text-xl">
          <span className="font-bold">{"Location: "}</span>
          {group.location.toLocaleString()}
        </p>
        <Link href={`/states/${group.state}`}>
          <p className="max-w-prose text-gray-300 md:text-xl">
            <span className="font-bold">{"State: "}</span>
            {group.state.toLocaleString()}
          </p>
        </Link>
        <p className="max-w-prose text-gray-300 md:text-xl">
          <span className="font-bold">{"Phone: "}</span>
          {group.phone.toLocaleString()}
        </p>
        <p className="max-w-prose text-gray-300 md:text-xl">
          <span className="font-bold">{"Email: "}</span>
          {group.email.toLocaleString()}
        </p>
      </Hero>
      <MapLocation location={group.location} />
      <StateDetails state={state} />
      <section className="w-full py-12 md:py-24">
        <div className="container px-10 flex flex-col gap-8 md:gap-16 items-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Professionals
          </h2>
          <ProfessionalsCards data={professionals} />
        </div>
      </section>
    </>
  );
}
