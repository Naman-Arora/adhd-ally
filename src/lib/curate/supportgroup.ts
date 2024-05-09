import { type SortOrder, type StateName } from ".";
import { SupportGroup } from "../queries/supportgroups";

export const SUPPORT_GROUPS_SORT = [
  "Name",
  "Contact Person",
  "Location",
  "State",
  "Phone",
  "Email",
] as const;

export type SupportGroupsSort = (typeof SUPPORT_GROUPS_SORT)[number];

export type SupportGroupsFilters = {
  state?: StateName;
};

export function curateSupportGroups(
  data: SupportGroup[],
  search: string,
  filters?: SupportGroupsFilters,
  sort: SupportGroupsSort = "Name",
  dir: SortOrder = "asc"
) {
  const filtered = data.filter((supportgroup) => {
    const matches_search = [
      supportgroup.name,
      supportgroup.contact_person,
      supportgroup.location,
      supportgroup.state,
      supportgroup.phone,
      supportgroup.email,
    ]
      .join(" ")
      .toLowerCase()
      .includes(search);

    const matches_state =
      !filters || !filters.state || supportgroup.state === filters.state;

    return matches_search && matches_state;
  });

  //   return filtered;

  return sort === "Name" && dir == "asc"
    ? filtered
    : filtered.sort((a, b) => {
        if (sort == "Name" && dir == "desc") {
          return b.name.localeCompare(a.name);
        } else if (sort === "Contact Person") {
          return dir === "asc"
            ? a.contact_person.localeCompare(b.contact_person)
            : b.contact_person.localeCompare(a.contact_person);
        } else if (sort === "Location") {
          return dir === "asc"
            ? a.location.localeCompare(b.location)
            : b.location.localeCompare(a.location);
        } else if (sort === "State") {
          return dir === "asc"
            ? a.state.localeCompare(b.state)
            : b.state.localeCompare(a.state);
        } else if (sort === "Phone") {
          return dir === "asc"
            ? a.phone.localeCompare(b.phone)
            : b.phone.localeCompare(a.phone);
        } else {
          return dir === "asc"
            ? a.email.localeCompare(b.email)
            : b.email.localeCompare(a.email);
        }
      });
}

/* export function curateProfessionals(
  data: Professional[],
  search: string,
  filters?: SupportGroupsFilters,
  sort: SupportGroupsSort = "Name",
  dir: SortOrder = "asc"
) {
  const filtered = data.filter((professional) => {
    const matches_search = [
      professional.name,
      professional.title,
      professional.organization,
      professional.location,
      professional.state,
      professional.phone,
    ]
      .join(" ")
      .toLowerCase()
      .includes(search);

    const matches_remote_work =
      !filters ||
      filters.worksRemotely === undefined ||
      professional.remote_work === filters.worksRemotely;

    const matches_state =
      !filters || !filters.state || professional.state === filters.state;

    return matches_search && matches_remote_work && matches_state;
  });

  return sort === "Name" && dir == "asc"
    ? filtered
    : filtered.sort((a, b) => {
        if (sort == "Name" && dir == "desc") {
          return b.name.localeCompare(a.name);
        } else if (sort === "Title") {
          return dir === "asc"
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title);
        } else if (sort === "Organization") {
          return dir === "asc"
            ? a.organization.localeCompare(b.organization)
            : b.organization.localeCompare(a.organization);
        } else if (sort === "Location") {
          return dir === "asc"
            ? a.location.localeCompare(b.location)
            : b.location.localeCompare(a.location);
        } else if (sort === "State") {
          return dir === "asc"
            ? a.state.localeCompare(b.state)
            : b.state.localeCompare(a.state);
        } else if (sort === "Phone") {
          return dir === "asc"
            ? a.phone.localeCompare(b.phone)
            : b.phone.localeCompare(a.phone);
        } else {
          return dir === "asc"
            ? a.remote_work
              ? -1
              : 1
            : b.remote_work
            ? -1
            : 1;
        }
      });
} */
