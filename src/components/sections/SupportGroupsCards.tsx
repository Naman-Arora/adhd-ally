"use client";

import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import ImageCard from "../ImageCard";
import NoResultsFound from "../NoResultsFound";
import HighlightSearch from "@/components/HighlightSearch";
import { type SupportGroup } from "@/lib/queries/supportgroups";

export default function SupportGroupsCards({
  data,
  highlight,
}: {
  data: SupportGroup[];
  highlight?: string;
}) {
  if (data.length === 0)
    return (
      <AnimatePresence>
        <NoResultsFound />
      </AnimatePresence>
    );

  return (
    <section className="container grid max-w-3xl gap-6 md:grid-cols-2 md:px-6 lg:max-w-5xl xl:grid-cols-3 xl:max-w-6xl xl:gap-8 place-content-center py-10">
      <AnimatePresence mode="wait">
        {data.map((group) => (
          <ImageCard
            key={group.id}
            id={group.id}
            destination={`/supportgroups/${group.id}`}
            title={group.name}
            imageUrl={group.image}
            highlight={highlight}
          >
            <p className="text-gray-600 hover:text-gray-700 transition-all duration-200">
              <span className="font-bold">{"Contact Person: "}</span>
              <HighlightSearch
                data={group.contact_person}
                highlight={highlight}
              />
            </p>
            <p className="text-gray-600 hover:text-gray-700 transition-all duration-200">
              <span className="font-bold">{"Location: "}</span>
              <HighlightSearch data={group.location} highlight={highlight} />
            </p>
            <Link href={`/states/${group.state}`}>
              <p className="text-gray-600 hover:text-gray-700 transition-all duration-200">
                <span className="font-bold">{"State: "}</span>
                <HighlightSearch data={group.state} highlight={highlight} />
              </p>
            </Link>
            <p className="text-gray-600 hover:text-gray-700 transition-all duration-200">
              <span className="font-bold">{"Phone: "}</span>
              <HighlightSearch data={group.phone} highlight={highlight} />
            </p>
            <p className="text-gray-600 hover:text-gray-700 transition-all duration-200">
              <span className="font-bold">{"Email: "}</span>
              <HighlightSearch data={group.email} highlight={highlight} />
            </p>
          </ImageCard>
        ))}
      </AnimatePresence>
    </section>
  );
}
