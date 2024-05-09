import Visualizations from "./Visualizations";
import { getStates } from "@/lib/queries/states";
import { getSupportGroups } from "@/lib/queries/supportgroups";

export default async function Page() {
  const states = await getStates(1);
  const supportgroups = await getSupportGroups(1);

  const supportGroupCountByState = states.map((state, id) => ({
    id,
    label: state.name,
    value: supportgroups.filter((sg) => sg.state === state.name).length,
  }));

  const adhdPopByState = states.map(({ name, current_adhd }) => ({
    name,
    adhd: current_adhd,
  }));

  const behavioralTreatmentByAdhdPopulation = states.map(
    ({ name, current_adhd, received_behavioral_treatment }, id) => ({
      id,
      name,
      x: current_adhd,
      y: received_behavioral_treatment,
    })
  );

  return (
    <Visualizations
      supportGroupCountByState={supportGroupCountByState}
      adhdPopByState={adhdPopByState}
      behavioralTreatmentByAdhdPopulation={behavioralTreatmentByAdhdPopulation}
    />
  );
}
