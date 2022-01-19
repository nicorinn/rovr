export interface Camera {
  id: number;
  name: string;
  rover_id: number;
  full_name: string;
}

export interface Rover {
  id: number;
  name: string;
  landing_date: string;
  launch_date: string;
  status: string;
}

export interface RoverImage {
  id: number;
  sol: number;
  camera: Camera;
  img_src: string;
  earth_date: string;
  rover: Rover;
}

type Coordinate = [number, number];

export interface Waypoint {
  type: string;
  properties: {
    sol: number;
    yaw_deg: number;
    site_pos: number;
    dist_km: number;
    dist_mi: number;
    drivetype: string;
  };
  geometry: { type: string; coordinates: Coordinate };
}
