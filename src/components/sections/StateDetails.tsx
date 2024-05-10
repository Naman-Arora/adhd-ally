import Link from "next/link";
import Image from "../Image";
import { type State } from "@/lib/queries/states";

export default function StateDetails({ state }: { state: State }) {
  return (
    <section className="w-full py-12 md:py-24 bg-gray-900">
      <div className="container px-10 flex flex-col gap-0 md:gap-8">
        <div className="flex lg:flex-row flex-col gap-10 md:gap-16">
          <div className="grid place-items-center">
            d
            <div className="max-w-[700px]">
              <Image
                alt={state.name}
                className="aspect-[2/1] rounded-3xl overflow-hidden object-cover"
                height="350"
                src={state.image_url}
                width="700"
                fallback=""
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 justify-center">
            <Link
              href={`/states/${state.name}`}
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-50 pb-4 hover:underline"
            >
              {state.name}
            </Link>
            <p className="max-w-prose text-gray-300 md:text-xl ">
              <span className="font-bold">
                {state.population.toLocaleString()}
              </span>
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
          </div>
        </div>
      </div>
    </section>
  );
}
