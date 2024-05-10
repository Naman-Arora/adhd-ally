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
  const data = await api.get("professionals").json<Professional[]>();
  return data;
}

export async function getProfessionalsByState(name: string) {
  try {
    const data = await api.get(`professionals/state/${name}`).json<Professional[]>();
    return data;
  } catch {
    return [];
  }
}

export async function getProfessionalById(id: string) {
  try {
    const data = await api.get(`professionals/${id}`).json<Professional>();
    return data;
  } catch (e) {
    console.error(e);
    return notFound();
  }
}
