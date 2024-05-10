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
  const data = await api.get("supportgroups").json<SupportGroup[]>();
  return data;
}

export async function getSupportGroupById(id: string) {
  try {
    const data = await api.get(`supportgroups/${id}`).json<SupportGroup>();
    return data;
  } catch {
    return notFound();
  }
}

export async function getSupportGroupsByState(state: string) {
  try {
    const data = await api.get(`supportgroups/state/${state}`).json<SupportGroup[]>();
    return data;
  } catch {
    return [];
  }
}
