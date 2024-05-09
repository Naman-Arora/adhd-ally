import { notFound } from "next/navigation";
import api from "@/lib/api";

export type SupportGroup = {
  name: string;
  contact_person: string;
  location: string;
  state: string;
  phone: string;
  email: string;
  image: string;
  id: string;
};

export async function getSupportGroups(page: number) {
  const params = new URLSearchParams();
  params.set("page", String(page));
  //   params.set("limit", "24");
  params.set("limit", String(250));
  const { data } = await api.get<SupportGroup[]>(
    `/supportgroups/?${params.toString()}`
  );
  return data;
}

export async function getSupportGroupsMetadata() {
  const params = new URLSearchParams();
  params.set("limit", "24");
  const { data } = await api.get<{ count: number; limit: number }>(
    `/supportgroups/metadata/?${params.toString()}`
  );
  return data;
}

export async function getSupportGroupById(id: string) {
  try {
    const { data } = await api.get<SupportGroup>(`/supportgroups/${id}`);
    return data;
  } catch {
    return notFound();
  }
}

export async function getSupportGroupsByState(state: string) {
  try {
    const { data } = await api.get<SupportGroup[]>(
      `/supportgroups/state/${state}`
    );
    return data;
  } catch {
    return [];
  }
}
