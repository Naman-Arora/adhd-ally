import { notFound } from "next/navigation";
import api from "@/lib/api";

export type State = {
  name: string;
  population: number;
  ever_received_diagnosis: number;
  current_adhd: number;
  taking_medication: number;
  received_behavioral_treatment: number;
  image_url: string;
};

export async function getStates(page: number) {
  const params = new URLSearchParams();
  params.set("page", String(page));
  params.set("limit", String(250));
  const { data } = await api.get<State[]>(`/states/?${params.toString()}`);
//   console.log({ data });
  return data;
}

export async function getStatesMetadata() {
  const { data } = await api.get<{ count: number; limit: number }>(
    `/states/metadata`
  );
  return data;
}

export async function getStateByName(name: string) {
  try {
    const { data } = await api.get<State>(`/states/${name}`);
    return data;
  } catch {
    return notFound();
  }
}
