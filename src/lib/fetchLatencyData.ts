export async function fetchLatencyData(): Promise<
  { region: string; latency: number }[]
> {
  const REGIONS = [
    "us-east-1",
    "us-west-2",
    "eu-west-1",
    "ap-south-1",
    "ap-northeast-1",
    "sa-east-1",
    "ca-central-1",
    "me-south-1",
  ];

  // Simulate latency with random values
  return REGIONS.map((region) => ({
    region,
    latency: Math.floor(Math.random() * 200 + 50), // 50ms to 250ms
  }));
}
