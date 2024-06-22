"use client";

import { axisClasses } from "@mui/x-charts";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { ScatterChart } from "@mui/x-charts/ScatterChart";

type Props = {
  supportGroupCountByState: {
    id: number;
    label: string;
    value: number;
  }[];
  adhdPopByState: {
    name: string;
    adhd: number;
  }[];
  behavioralTreatmentByAdhdPopulation: {
    id: number;
    name: string;
    x: number;
    y: number;
  }[];
};

const critiques = [
  {
    question: "What did we do well?",
    response:
      "We did really well in communicating with each other throughout the semester and making sure we were all on the same page regarding what needed to be done.",
  },
  {
    question: "What did we learn?",
    response:
      "We learned a ton about working on a team along with learning a lot about a ton of tools including Python, NextJS, AWS, and Postman.",
  },
  {
    question: "What did we teach each other?",
    response:
      "We all had our own niches of expertise so we were able to teach each other about how to work on these different parts of the website (Hosting, Backend, Frontend, Database, etc.)",
  },
  {
    question: "What can we do better?",
    response:
      "We definitely could have had better time management since a lot of the time we came very close to the deadline and this caused a little more stress than was needed.",
  },
  {
    question: "What effect did the peer reviews have?",
    response:
      "The peer reviews made sure we all had an idea of where we stood with the others, so we could easily individually improve on our flaws and thus have a better overall team.",
  },
  {
    question: "What puzzles us?",
    response:
      "AWS hosting was very confusing at first and it took a ton of trial and error to get it working properly with HTTPS support.",
  },
] as const;

export default function Visualizations({
  supportGroupCountByState,
  adhdPopByState,
  behavioralTreatmentByAdhdPopulation,
}: Props) {
  return (
    <>
      <div className="flex flex-col gap-8 p-8">
        <h1 className="text-center font-bold text-2xl">Graphs</h1>
        <div className="flex flex-col gap-0">
          <h2 className="font-semibold text-xl">ADHD Population by State</h2>
          <BarChart
            dataset={adhdPopByState}
            xAxis={[{ scaleType: "band", dataKey: "name", label: "State" }]}
            series={[{ dataKey: "adhd", label: "Current ADHD Population" }]}
            yAxis={[{ label: "ADHD Population" }]}
            slotProps={{ legend: { hidden: true } }}
            height={500}
            margin={{ left: 80 }}
            sx={{
              [`.${axisClasses.left} .${axisClasses.label}`]: {
                transform: "translate(-40px, 0)",
              },
            }}
          />
        </div>
        <div className="border-b" />
        <div className="flex flex-col gap-0">
          <h2 className="font-semibold text-xl">Support Groups by State</h2>
          <PieChart
            series={[{ data: supportGroupCountByState }]}
            slotProps={{ legend: { hidden: true } }}
            height={500}
          />
        </div>
        <div className="border-b" />
        <div className="flex flex-col gap-0">
          <h2 className="font-semibold text-xl">
            ADHD Population to Percentage Receiving Behavioral Treatment, by
            State
          </h2>
          <ScatterChart
            height={500}
            series={[
              {
                data: behavioralTreatmentByAdhdPopulation,
                valueFormatter: ({ x, y }, { dataIndex }) =>
                  `${
                    behavioralTreatmentByAdhdPopulation[dataIndex].name
                  }: ADHD Population of ${x.toLocaleString()}; Percent Receiving Behavioral Treatment: ${y}%`,
              },
            ]}
            colors={["purple"]}
            grid={{ vertical: true, horizontal: true }}
            xAxis={[{ label: "Current ADHD Population" }]}
            yAxis={[{ label: "Percentage Receiving Behavioral Treatment" }]}
            slotProps={{ legend: { hidden: true } }}
          />
        </div>
      </div>
      <div className="w-full flex flex-col py-12 bg-gray-900 text-white gap-8 px-24 md:px-12">
        <h1 className="text-center font-bold text-2xl">Critiques</h1>
        {critiques.map(({ question, response }, i) => (
          <div className="flex flex-col gap-2" key={i}>
            <h3 className="text-lg font-semibold">{question}</h3>
            <p className="text-lg">{response}</p>
          </div>
        ))}
      </div>
    </>
  );
}
