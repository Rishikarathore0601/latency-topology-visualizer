export interface Exchange {
  id: string;
  name: string;
  lat: number;
  lon: number;
  location: string;
  provider: "AWS" | "GCP" | "Azure";
}
