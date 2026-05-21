"use client";

import FleetDashboardView from "../components/FleetDashboardView";
import { useFleetDashboard } from "../hooks/use-fleet-dashboard";

export default function FleetDashboard() {
  const { data, isLoading } = useFleetDashboard();

  if (isLoading) return <div>Loading fleet data...</div>;

  return <FleetDashboardView data={data} />;
}
