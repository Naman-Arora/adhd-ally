import { type SortOrder } from ".";
import type { State } from "../queries/states";

export const STATES_SORT = [
  "Name",
  "Total Population",
  "ADHD Population",
  "Population With Diagnosis",
  "Population Receiving Treatment",
  "Population Taking Medication",
] as const;

export type StatesSort = (typeof STATES_SORT)[number];

export type StatesFilters = {
  population?: number;
  currentAdhd?: number;
  receivedDiagnosis?: number;
  behavioralTreatment?: number;
  takingMedication?: number;
};

export function curateStates(
  data: State[],
  search: string,
  filters?: StatesFilters | null,
  sort: StatesSort = "Name",
  dir: SortOrder = "asc"
) {
  const filtered = data.filter((state) => {
    const matches_search = [
      state.current_adhd.toLocaleString(),
      state.ever_received_diagnosis.toLocaleString(),
      state.name,
      state.population.toLocaleString(),
      state.received_behavioral_treatment,
      state.taking_medication,
    ]
      .join(" ")
      .toLowerCase()
      .includes(search);

    const matches_population =
      !filters || !filters.population || state.population > filters.population;

    const matches_current_adhd =
      !filters ||
      !filters.currentAdhd ||
      state.current_adhd > filters.currentAdhd;

    const matches_ever_received_diagnosis =
      !filters ||
      !filters.receivedDiagnosis ||
      state.ever_received_diagnosis > filters.receivedDiagnosis;

    const matches_received_behavioral_treatment =
      !filters ||
      !filters.behavioralTreatment ||
      state.received_behavioral_treatment > filters.behavioralTreatment;

    const matches_taking_medication =
      !filters ||
      !filters.takingMedication ||
      state.taking_medication > filters.takingMedication;

    return (
      matches_search &&
      matches_population &&
      matches_current_adhd &&
      matches_ever_received_diagnosis &&
      matches_received_behavioral_treatment &&
      matches_taking_medication
    );
  });

  return sort === "Name" && dir === "asc"
    ? filtered
    : filtered.sort((a, b) => {
        if (sort === "Name" && dir === "desc") {
          return a.name.localeCompare(b.name);
        } else if (sort === "Total Population") {
          return dir === "asc"
            ? a.population - b.population
            : b.population - a.population;
        } else if (sort === "ADHD Population") {
          return dir === "asc"
            ? a.current_adhd - b.current_adhd
            : b.current_adhd - a.current_adhd;
        } else if (sort === "Population With Diagnosis") {
          return dir === "asc"
            ? a.ever_received_diagnosis - b.ever_received_diagnosis
            : b.ever_received_diagnosis - a.ever_received_diagnosis;
        } else if (sort === "Population Receiving Treatment") {
          return dir === "asc"
            ? a.received_behavioral_treatment - b.received_behavioral_treatment
            : b.received_behavioral_treatment - a.received_behavioral_treatment;
        } else {
          return dir === "asc"
            ? a.taking_medication - b.taking_medication
            : b.taking_medication - a.taking_medication;
        }
      });
}
