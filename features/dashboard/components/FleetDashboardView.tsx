export default function FleetDashboardView({ data }: { data: any }) {
  if (!data) {
    return <p>Not Loaded yet</p>;
  }
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">AeroCompliance Pro</h1>

      <div className="grid grid-cols-4 gap-4">
        <Card label="Fleet" value={data.fleet_size} />
        <Card label="Airworthy" value={data.airworthy} />
        <Card label="Restricted" value={data.restricted} />
        <Card label="Unfit" value={data.unfit} />
      </div>
    </div>
  );
}

function Card({ label, value }: { label: string; value: number }) {
  if (value === undefined) {
    return (
      <div className="border rounded-xl p-4">
        <p className="text-sm text-gray-400">{label}</p>
        <p className="text-xl font-bold">N/A</p>
      </div>
    );
  }
  return (
    <div className="border rounded-xl p-4">
      <p className="text-sm text-gray-400">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}
