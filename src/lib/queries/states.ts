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
  const res = api.get("states");
  const data = await res.json<State[]>();
  return data;
}

export async function getStateByName(name: string) {
  try {
    const data = await api.get(`states/${name}`).json<State>();
    return data;
  } catch {
    return notFound();
  }
}
