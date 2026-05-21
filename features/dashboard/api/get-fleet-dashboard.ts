import { api } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";

export async function getFleetDashboard() {
  const { data } = await api.get(endpoints.dashboard.fleet);
  console.log("Fleet Dashboard Data:", data);

  return data;
}
