import { api } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import { Notification } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useNotifications(aircraftId?: number) {
  return useQuery({
    queryKey: ["notifications", aircraftId],
    queryFn: async () => {
      const url = aircraftId
        ? endpoints.notifications.byAircraft(aircraftId)
        : endpoints.notifications.notifications;
      const res = await api.get(url);
      return res.data as Notification[];
    },
    refetchInterval: 30000,
  });
}

export function useNotification(id: number) {
  return useQuery({
    queryKey: ["notification", id],
    queryFn: async () => {
      const res = await api.get(endpoints.notifications.detail(id));
      return res.data as Notification;
    },
  });
}

export function usePendingNotifications() {
  return useQuery({
    queryKey: ["pending-notifications"],
    queryFn: async () => {
      const res = await api.get(endpoints.notifications.pending());
      return res.data as Notification[];
    },
    refetchInterval: 30000,
  });
}

export function useRunNotificationEngine() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const res = await api.get(endpoints.notifications.runEngine());
      return res.data as { status: string };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pending-notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}

export function useCreateNotification() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<Notification>) => {
      const res = await api.post(endpoints.notifications.notifications, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["pending-notifications"] });
    },
  });
}

export function useUpdateNotification(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<Notification>) => {
      const res = await api.patch(endpoints.notifications.detail(id), data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notification", id] });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["pending-notifications"] });
    },
  });
}

export function useDeleteNotification(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await api.delete(endpoints.notifications.detail(id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}
