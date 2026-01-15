
export enum IncidentType {
  SNATCHING = 'Mobile/Cash Snatching',
  THEFT = 'Vehicle Theft',
  HARASSMENT = 'Harassment',
  ROBBERY = 'Armed Robbery',
  OTHER = 'Other'
}

export interface Incident {
  id: string;
  type: IncidentType;
  description: string;
  lat: number;
  lng: number;
  timestamp: string;
  isVerified: boolean;
}

export interface UserLocation {
  lat: number;
  lng: number;
}
