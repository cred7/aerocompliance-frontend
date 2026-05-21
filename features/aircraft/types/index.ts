export type Operator = {
  id: number;
  name: string;
};

export type AircraftType = {
  id: number;
  name: string;
};

export type Aircraft = {
  id: number;

  registration: string;

  operator: Operator;

  aircraft_type: AircraftType;

  status: "AIRWORTHY" | "RESTRICTED" | "UNFIT";
};

export type AircraftDashboard = Aircraft & {
  flight_hours: number;
  cycles: number;
  location: string;
};
