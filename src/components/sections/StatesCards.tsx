"use client";

import { AnimatePresence } from "framer-motion";
import ImageCard from "@/components/ImageCard";
import type { State } from "@/lib/queries/states";
import HighlightSearch from "@/components/HighlightSearch";
import NoResultsFound from "../NoResultsFound";

type Props = {
  data: State[];
  highlight?: string;
};

export default function StatesCards({ data, highlight }: Props) {
  if (data.length === 0)
    return (
      <AnimatePresence>
        <NoResultsFound />
      </AnimatePresence>
    );

  return (
    <section className="container grid max-w-3xl gap-6 md:grid-cols-2 md:px-6 lg:max-w-5xl xl:grid-cols-3 xl:max-w-6xl xl:gap-8 place-content-center py-10">
      <AnimatePresence mode="popLayout">
        {data.map((state) => (
          <ImageCard
            key={state.name}
            id={state.name}
            destination={`/states/${state.name}`}
            title={state.name}
            imageUrl={state.image_url}
            highlight={highlight}
          >
            <p className="text-gray-600 transition-all duration-200">
              <span className="font-bold">
                <HighlightSearch
                  data={state.population.toLocaleString()}
                  highlight={highlight}
                />
              </span>
              {" — Total Population"}
            </p>
            <p className="text-gray-600 transition-all duration-200">
              <span className="font-bold">
                <HighlightSearch
                  data={state.ever_received_diagnosis.toLocaleString()}
                  highlight={highlight}
                />
              </span>{" "}
              {" — Received ADHD Diagnosis"}
            </p>
            <p className="text-gray-600 transition-all duration-200">
              <span className="font-bold">
                <HighlightSearch
                  data={state.current_adhd.toLocaleString()}
                  highlight={highlight}
                />
              </span>
              {" — Population With ADHD"}
            </p>
            <p className="text-gray-600 transition-all duration-200 w-full">
              <span className="font-bold">
                <HighlightSearch
                  data={state.taking_medication.toLocaleString() + "%"}
                  highlight={highlight}
                />
              </span>
              {" — Taking Medication"}
            </p>
            <p className="text-gray-600 transition-all duration-200">
              <span className="font-bold">
                <HighlightSearch
                  data={
                    state.received_behavioral_treatment.toLocaleString() + "%"
                  }
                  highlight={highlight}
                />
              </span>
              {" — Received Behavioral Treatment"}
            </p>
          </ImageCard>
        ))}
      </AnimatePresence>
    </section>
  );
}
