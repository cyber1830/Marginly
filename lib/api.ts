export type Benchmark = {
  zipcode: string;
  city?: string;
  comparableMenus: number;
  illustrative: boolean;
  items: Array<{
    name: string;
    yourPrice: number;
    median: number;
    opportunity: number;
  }>;
  gaps: string[];
};
export type Order = {
  id: string;
  items: string;
  total: number;
  status: string;
};
export type Report = {
  period: string;
  illustrative: boolean;
  metrics: {
    commissionSaved: number;
    directOrderMix: number;
    repeatCustomerValue: number;
  };
};
export type Campaign = {
  id: string;
  title: string;
  status: string;
  copy: string;
};
export type VisualAsset = {
  id: string;
  dish: string;
  status: string;
  authenticity: string;
};

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, init);
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  return response.json() as Promise<T>;
}
export const api = {
  benchmark: (zipcode?: string) =>
    request<Benchmark>(
      `/api/benchmark${zipcode ? `?zipcode=${encodeURIComponent(zipcode)}` : ""}`,
    ),
  orders: () => request<{ orders: Order[] }>("/api/orders"),
  reports: () => request<Report>("/api/reports"),
  storefront: () =>
    request<{ status: string; restaurant: string; menuItems: number }>(
      "/api/storefront",
    ),
  marketing: () => request<{ campaigns: Campaign[] }>("/api/marketing"),
  visuals: () => request<{ assets: VisualAsset[] }>("/api/visuals"),
};
