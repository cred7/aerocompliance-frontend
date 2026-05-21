import { api } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import { Aircraft, AircraftDetail, AircraftType, Operator } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Aircraft Queries
export function useAircraft(id: number) {
  return useQuery({
    queryKey: ["aircraft", id],
    queryFn: async () => {
      const res = await api.get(endpoints.aircraft.detail(id));
      return res.data as Aircraft;
    },
  });
}

export function useAircraftList() {
  return useQuery({
    queryKey: ["aircraft-list"],
    queryFn: async () => {
      const res = await api.get(endpoints.aircraft.aircraft);
      return res.data as Aircraft[];
    },
  });
}

export function useAircraftDetail(id: number, enabled = true) {
  return useQuery({
    queryKey: ["aircraft-detail", id],
    queryFn: async () => {
      const res = await api.get(endpoints.aircraft.aircraftDetail(id));
      return res.data as AircraftDetail;
    },
    enabled,
  });
}

export function useOperators() {
  return useQuery({
    queryKey: ["operators"],
    queryFn: async () => {
      const res = await api.get(endpoints.aircraft.operators);
      return res.data as Operator[];
    },
  });
}

export function useAircraftTypes() {
  return useQuery({
    queryKey: ["aircraft-types"],
    queryFn: async () => {
      const res = await api.get(endpoints.aircraft.aircraftTypes);
      return res.data as AircraftType[];
    },
  });
}

export function useCreateOperator() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<Operator>) => {
      const res = await api.post(endpoints.aircraft.operators, data);
      return res.data as Operator;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["operators"] });
    },
  });
}

export function useCreateAircraftType() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<AircraftType>) => {
      const res = await api.post(endpoints.aircraft.aircraftTypes, data);
      return res.data as AircraftType;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["aircraft-types"] });
    },
  });
}

// Aircraft Mutations
export function useCreateAircraft() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<Aircraft>) => {
      const res = await api.post(endpoints.aircraft.aircraft, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["aircraft-list"] });
    },
  });
}

export function useUpdateAircraft(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<Aircraft>) => {
      const res = await api.put(`${endpoints.aircraft.aircraft}${id}/`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["aircraft", id] });
      queryClient.invalidateQueries({ queryKey: ["aircraft-detail", id] });
      queryClient.invalidateQueries({ queryKey: ["aircraft-list"] });
    },
  });
}

export function useDeleteAircraft(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await api.delete(`${endpoints.aircraft.aircraft}${id}/`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["aircraft-list"] });
    },
  });
}
