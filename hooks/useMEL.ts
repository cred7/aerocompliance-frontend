import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import { MELItem } from "@/types";

export function useMELItems(aircraftId?: number) {
  return useQuery({
    queryKey: ["mel-items", aircraftId],
    queryFn: async () => {
      const url = aircraftId
        ? `${endpoints.mel.mel}?aircraft_id=${aircraftId}`
        : endpoints.mel.mel;
      const res = await api.get(url);
      return res.data as MELItem[];
    },
  });
}

export function useMELItem(id: number) {
  return useQuery({
    queryKey: ["mel-item", id],
    queryFn: async () => {
      const res = await api.get(`${endpoints.mel.mel}${id}/`);
      return res.data as MELItem;
    },
  });
}

export function useCreateMEL() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<MELItem>) => {
      const res = await api.post(endpoints.mel.mel, data);
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["mel-items", variables.aircraft],
      });
      queryClient.invalidateQueries({ queryKey: ["mel", variables.aircraft] });
    },
  });
}

export function useUpdateMEL(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<MELItem>) => {
      const res = await api.put(`${endpoints.mel.mel}${id}/`, data);
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["mel-item", id] });
      queryClient.invalidateQueries({ queryKey: ["mel-items", data.aircraft] });
      queryClient.invalidateQueries({ queryKey: ["mel", data.aircraft] });
    },
  });
}

export function useDeleteMEL(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await api.delete(`${endpoints.mel.mel}${id}/`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mel-items"] });
    },
  });
}
