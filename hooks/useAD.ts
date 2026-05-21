import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import { ADCompliance, AirworthinessDirective } from "@/types";

// AD Queries
export function useADs() {
  return useQuery({
    queryKey: ["ads"],
    queryFn: async () => {
      const res = await api.get(endpoints.ad.ads);
      return res.data as AirworthinessDirective[];
    },
  });
}

export function useAD(id: number) {
  return useQuery({
    queryKey: ["ad", id],
    queryFn: async () => {
      const res = await api.get(endpoints.ad.adDetail(id));
      return res.data as AirworthinessDirective;
    },
  });
}

export function useADCompliances(aircraftId?: number) {
  return useQuery({
    queryKey: ["ad-compliances", aircraftId],
    queryFn: async () => {
      const url = aircraftId 
        ? endpoints.ad.byAircraft(aircraftId)
        : endpoints.ad.compliances;
      const res = await api.get(url);
      return res.data as ADCompliance[];
    },
  });
}

export function useOverdueADs() {
  return useQuery({
    queryKey: ["overdue-ads"],
    queryFn: async () => {
      const res = await api.get(endpoints.ad.overdue());
      return res.data as ADCompliance[];
    },
  });
}

// AD Mutations
export function useCreateAD() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<AirworthinessDirective>) => {
      const res = await api.post(endpoints.ad.ads, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ads"] });
    },
  });
}

export function useUpdateAD(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<AirworthinessDirective>) => {
      const res = await api.put(endpoints.ad.adDetail(id), data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ads"] });
      queryClient.invalidateQueries({ queryKey: ["ad", id] });
    },
  });
}

export function useDeleteAD(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await api.delete(endpoints.ad.adDetail(id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ads"] });
    },
  });
}
