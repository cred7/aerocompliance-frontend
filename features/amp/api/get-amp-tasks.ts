import { api } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";

export async function getAmpTasks(aircraftId?: number) {
  const url = aircraftId
    ? endpoints.amp.byAircraft(aircraftId)
    : endpoints.amp.tasks;
  const res = await api.get(url);

  return res.data;
}
