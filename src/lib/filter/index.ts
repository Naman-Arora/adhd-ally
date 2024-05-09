import type { State } from "../queries/states";
import type { Professional } from "../queries/professionals";
import type { SupportGroup } from "../queries/supportgroups";

export function filterStates(data: State[], search: string) {
  return data.filter((state) =>
    [
      state.current_adhd,
      state.ever_received_diagnosis,
      state.name,
      state.population,
      state.received_behavioral_treatment,
      state.taking_medication,
    ]
      .join(" ")
      .toLowerCase()
      .includes(search)
  );
}

export function filterProfessionals(data: Professional[], search: string) {
  return data.filter((professional) =>
    [
      professional.name,
      professional.title,
      professional.organization,
      professional.location,
      professional.state,
      professional.phone,
    ]
      .join(" ")
      .toLowerCase()
      .includes(search)
  );
}

export function filterSupportGroups(data: SupportGroup[], search: string) {
  return data.filter((supportgroup) =>
    [
      supportgroup.name,
      supportgroup.contact_person,
      supportgroup.location,
      supportgroup.state,
      supportgroup.phone,
      supportgroup.email,
    ]
      .join(" ")
      .toLowerCase()
      .includes(search)
  );
}
