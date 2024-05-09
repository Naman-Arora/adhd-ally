import Link from "next/link";
import Hero from "@/components/Hero";
import { getStateByName } from "@/lib/queries/states";
import StateDetails from "@/components/sections/StateDetails";
import { getProfessionalById } from "@/lib/queries/professionals";
import { getSupportGroupsByState } from "@/lib/queries/supportgroups";
import SupportGroupsCards from "@/components/sections/SupportGroupsCards";
import MapLocation from "@/components/MapLocation";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const professional = await getProfessionalById(id);
  const state = await getStateByName(professional.state);
  const supportgroups = await getSupportGroupsByState(professional.state);

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
