"use client";

import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import ImageCard from "../ImageCard";
import NoResultsFound from "../NoResultsFound";
import HighlightSearch from "@/components/HighlightSearch";
import { type Professional } from "@/lib/queries/professionals";

export default function ProfessionalsCards({
  data,
  highlight,
}: {
  data: Professional[];
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
        {data.map((professional) => (
          <ImageCard
            key={professional.id}
            id={professional.id}
            destination={`/professionals/${professional.id}`}
            title={professional.name}
            imageUrl={professional.flag}
            highlight={highlight}
          >
            <p className="text-gray-600 transition-all duration-200">
              <span className="font-bold">{"Title: "}</span>
              <HighlightSearch
                data={professional.title}
                highlight={highlight}
              />
            </p>
            <p className="text-gray-600 transition-all duration-200">
              <span className="font-bold">{"Organization: "}</span>
              <HighlightSearch
                data={professional.organization}
                highlight={highlight}
              />
            </p>
            <p className="text-gray-600 transition-all duration-200">
              <span className="font-bold">{"Location: "}</span>
              <HighlightSearch
                data={professional.location}
                highlight={highlight}
              />
            </p>
            <Link href={`/states/${professional.state}`}>
              <p className="text-gray-600 transition-all duration-200">
                <span className="font-bold">{"State: "}</span>
                <HighlightSearch
                  data={professional.state}
                  highlight={highlight}
                />
              </p>
            </Link>
            <p className="text-gray-600 transition-all duration-200">
              <span className="font-bold">{"Phone: "}</span>
              <HighlightSearch
                data={professional.phone}
                highlight={highlight}
              />
            </p>
            <p className="text-gray-600 transition-all duration-200">
              <span className="font-bold">{"Works Remotely: "}</span>
              <HighlightSearch
                data={professional.remote_work ? "Yes" : "No"}
                highlight={highlight}
              />
            </p>
          </ImageCard>
        ))}
      </AnimatePresence>
    </section>
  );
}
