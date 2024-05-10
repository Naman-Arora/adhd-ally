import { pool } from "@/lib/db";
import Visualizations from "./Visualizations";
import type { State } from "@/lib/queries/states";
import type { SupportGroup } from "@/lib/queries/supportgroups";

export default async function Page() {
  const { rows: states } = await pool.query<State>(
    "SELECT * from states ORDER BY name"
  );

  const { rows: supportgroups } = await pool.query<SupportGroup>(
    "SELECT * from groups ORDER BY name"
  );

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
