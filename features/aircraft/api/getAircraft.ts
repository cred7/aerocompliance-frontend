import { api } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";

export async function getAircraft() {
  const res = await api.get(endpoints.aircraft.aircraft);

  return res.data;
}
