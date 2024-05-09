import DeveloperVisualizations from "./DeveloperVisualizations";

export type StateD = {
  name: string;
  population: number;
  num_health_centers: number;
  num_hospitals: number;
  percent_uninsured: number;
  percent_low_income: number;
  image: string;
};
export type Hospital = {
  id: number;
  city: string;
  state_abbr: string;
  name: string;
  ownership: string;
  type: string;
  emergency_services: string;
  rating: number;
  image: string;
};

type OwnershipCount = {
  [key: string]: number; // This line defines the index signature.
};

export default async function Page() {
  const res1 = await fetch("https://api.care-hub.me/states/?skip=0&limit=51");
  const d1 = await res1.json();
  const states = d1[0] as StateD[];

  const res2 = await fetch(
    "https://api.care-hub.me/hospitals/?skip=0&limit=610"
  );
  const d2 = await res2.json();
  const hospitals = d2[0] as Hospital[];

  const healthcareCentersByState = states
    .sort((a, b) => b.num_health_centers - a.num_health_centers)
    .map((state, id) => ({
      id,
      label: state.name,
      count: state.num_health_centers,
    }));

  const incomeToUninsured = states.map((state, id) => ({
    id,
    name: state.name,
    x: state.percent_low_income,
    y: state.percent_uninsured,
  }));

  const ownershipCount: OwnershipCount = {};

  // Loop over each hospital to populate the ownershipCount object.
  hospitals.forEach((hospital) => {
    // If the ownership property doesn't exist, initialize it to 0.
    if (!ownershipCount[hospital.ownership]) {
      ownershipCount[hospital.ownership] = 0;
    }
    // Increment the count for the ownership.
    ownershipCount[hospital.ownership]++;
  });

  // Create an array from the ownershipCount object to set the state.
  const hospitalOwernship = Object.keys(ownershipCount).map(
    (ownership, id) => ({
      id,
      label: ownership,
      value: ownershipCount[ownership],
    })
  );

  return (
    <DeveloperVisualizations
      healthcareCentersByState={healthcareCentersByState}
      incomeToUninsured={incomeToUninsured}
      hospitalOwernship={hospitalOwernship}
    />
  );
}
