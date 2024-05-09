import { notFound } from "next/navigation";
import api from "@/lib/api";

export type Professional = {
  id: string;
  name: string;
  title: string;
  organization: string;
  location: string;
  state: string;
  phone: string;
  remote_work: boolean;
  categories: string[];
  tags: string[];
  addresses: string[];
  flag: string;
  url: string;
};

export async function getProfessionals(page: number) {
  const params = new URLSearchParams();
  params.set("page", String(page));
  //   params.set("limit", "24");
  params.set("limit", String(250));
  const { data } = await api.get<Professional[]>(
    `/professionals?${params.toString()}`
  );
  return data;
}

export async function getProfessionalsMetadata() {
  const params = new URLSearchParams();
  params.set("limit", "24");
  const { data } = await api.get<{ count: number; limit: number }>(
    `/professionals/metadata/?${params.toString()}`
  );
  return data;
}

export async function getProfessionalsByState(name: string) {
  try {
    const { data } = await api.get<Professional[]>(
      `/professionals/state/${name}`
    );
    return data;
  } catch {
    return [];
  }
}

export async function getProfessionalById(id: string) {
  try {
    const { data } = await api.get<Professional>(`/professionals/${id}`);
    return data;
  } catch (e) {
    console.error(e);
    return notFound();
  }
}
