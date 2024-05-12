import { pool } from "@/lib/db";
import Hero from "@/components/Hero";
import type { State } from "@/lib/queries/states";
import MapLocation from "@/components/MapLocation";
import NoResultsFound from "@/components/NoResultsFound";
import type { SupportGroup } from "@/lib/queries/supportgroups";
import type { Professional } from "@/lib/queries/professionals";
import ProfessionalsCards from "@/components/sections/ProfessionalsCards";
import SupportGroupsCards from "@/components/sections/SupportGroupsCards";

export default async function StateByName({
  params: { id },
}: {
  params: { id: string };
}) {
  const {
    rows: [state],
  } = await pool.query<State>("SELECT * from states WHERE name=$1", [id]);

  if (state === undefined) {
    return <NoResultsFound showSearchIcon={false} />;
  }

  const [{ rows: supportgroups }, { rows: professionals }] = await Promise.all([
    pool.query<SupportGroup>(
      "SELECT * from groups WHERE state=$1 ORDER BY name",
      [state.name]
    ),
    pool.query<Professional>(
      "SELECT * from professionals WHERE state=$1 ORDER BY name",
      [state.name]
    ),
  ]);

  return (
    <>
      <Hero imageSource={state.image_url} title={state.name}>
        <p className="max-w-prose text-gray-300 md:text-xl ">
          <span className="font-bold">{state.population.toLocaleString()}</span>
          {" — Total Population"}
        </p>
        <p className="max-w-prose text-gray-300 md:text-xl">
          <span className="font-bold">
            {state.ever_received_diagnosis.toLocaleString()}
          </span>{" "}
          {" — Received ADHD Diagnosis"}
        </p>
        <p className="max-w-prose text-gray-300 md:text-xl">
          <span className="font-bold">
            {state.current_adhd.toLocaleString()}
          </span>
          {" — Population With ADHD"}
        </p>
        <p className="max-w-prose text-gray-300 md:text-xl">
          <span className="font-bold">{state.taking_medication}%</span>
          {" — Taking Medication"}
        </p>
        <p className="max-w-prose text-gray-300 md:text-xl">
          <span className="font-bold">
            {state.received_behavioral_treatment.toLocaleString()}%
          </span>
          {" — Received Behavioral Treatment"}
        </p>
      </Hero>
      <MapLocation location={state.name} />
      {professionals.length > 0 && (
        <section className="w-full py-12 md:py-24 bg-gray-900">
          <div className="container px-10 flex flex-col gap-8 md:gap-16 items-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-50">
              Professionals
            </h2>
            <ProfessionalsCards data={professionals} />
          </div>
        </section>
      )}
      {supportgroups.length > 0 && (
        <section className="w-full pb-12 md:pb-24 bg-gray-900">
          <div className="container px-10 flex flex-col gap-8 md:gap-16 items-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-50">
              Support Groups
            </h2>
            <SupportGroupsCards data={supportgroups} />
          </div>
        </section>
      )}
    </>
  );
}
