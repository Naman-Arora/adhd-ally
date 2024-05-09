"use client";

import { PieChart } from "@mui/x-charts/PieChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { ScatterChart } from "@mui/x-charts/ScatterChart";

const critiques = [
  {
    question: "What did they do well?",
    response:
      "They did a great job implementing our user stories exactly how we wanted them to and their overall website design looks amazing.",
  },
  {
    question: "How effective was their RESTful API?",
    response:
      "Their RESTful API was very effective since it was very quick and documented well.",
  },
  {
    question: "How well did they implement your user stories?",
    response:
      "They did a great job implementing our user stories exactly how we had asked them to and hopefully, they added a lot of value to their website.",
  },
  {
    question: "What did we learn from their website?",
    response:
      "Their website is a great tool for anyone to learn more about the problems that those who lack health insurance have and provides a great place for these people to better navigate the healthcare system.",
  },
  {
    question: "What can they do better?",
    response:
      "Overall, their website is really good, both visually and in its content. One thing they could do better is to have more visuals around their website to give it a more full and complete look.",
  },
  {
    question: "What puzzles us about their website?",
    response:
      "We were puzzled by not being able to filter by State on both the Hospitals and Organizations model pages.",
  },
] as const;

type Props = {
  healthcareCentersByState: {
    id: number;
    label: string;
    count: number;
  }[];
  incomeToUninsured: {
    id: number;
    x: number;
    y: number;
    name: string;
  }[];
  hospitalOwernship: {
    id: number;
    label: string;
    value: number;
  }[];
};

export default function DeveloperVisualizations({
  healthcareCentersByState,
  hospitalOwernship,
  incomeToUninsured,
}: Props) {
  return (
    <>
      <div className="flex flex-col gap-8 p-8">
        <h1 className="text-center font-bold text-2xl">Graphs</h1>
        <div className="flex flex-col gap-0">
          <h2 className="font-semibold text-xl">
            Number of Health Centers by State
          </h2>
          <LineChart
            height={500}
            series={[
              { data: healthcareCentersByState.map((state) => state.count) },
            ]}
            xAxis={[
              {
                scaleType: "point",
                data: healthcareCentersByState.map((state) => state.label),
              },
            ]}
            yAxis={[{ label: "Healthcare Centers" }]}
            slotProps={{ legend: { hidden: true } }}
            grid={{ vertical: true, horizontal: true }}
          />
        </div>
        <div className="border-b" />
        <div className="flex flex-col gap-0">
          <h2 className="font-semibold text-xl">Hospital Count by Ownership</h2>
          <PieChart
            series={[{ data: hospitalOwernship }]}
            slotProps={{ legend: { hidden: true } }}
            height={500}
          />
        </div>
        <div className="border-b" />
        <div className="flex flex-col gap-0">
          <h2 className="font-semibold text-xl">
            Percent Uninsured and Percent Low Income by State
          </h2>
          <ScatterChart
            height={500}
            series={[
              {
                data: incomeToUninsured,
                valueFormatter: ({ x, y }, { dataIndex }) =>
                  `${
                    incomeToUninsured[dataIndex].name
                  }: Percent Low Income: ${x.toLocaleString()}%; Percent Uninsured: ${y}%`,
              },
            ]}
            colors={["purple"]}
            grid={{ vertical: true, horizontal: true }}
            xAxis={[{ label: "Percentage Low Income" }]}
            yAxis={[{ label: "Percentage Uninsured" }]}
            slotProps={{ legend: { hidden: true } }}
          />
        </div>
      </div>
      <div className="w-full flex flex-col py-12 bg-gray-900 text-white gap-8 px-12">
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
