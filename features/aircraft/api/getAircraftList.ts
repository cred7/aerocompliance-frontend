import { api } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";

export async function getAircraftDashboard(id: string) {
  const res = await api.get(endpoints.dashboard.aircraft(id));

  return res.data;
}
