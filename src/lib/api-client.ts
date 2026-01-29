import type { Boat, Broker, ApiLog } from "./types";
import boatsData from "@/data/boats.json";
import brokersData from "@/data/brokers.json";
import apiLogsData from "@/data/api-logs.json";

// In production, this would come from environment variables
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.brokerlistings.com/v1";

// Simulated delay to mimic real API calls
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Generic API request function
 * In production, this would make actual HTTP requests
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  // Simulate network delay
  await delay(300 + Math.random() * 200);

  // In production, this would be:
  // const response = await fetch(`${API_BASE_URL}${endpoint}`, {
  //   ...options,
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${getToken()}`,
  //     ...options.headers,
  //   },
  // });
  // if (!response.ok) throw new Error(response.statusText);
  // return response.json();

  // For demo, return mock data
  console.log(`[DEMO API] ${options.method || "GET"} ${API_BASE_URL}${endpoint}`);

  // This is where mock data is returned
  // In a real app, this entire function would be replaced with actual fetch calls
  throw new Error("This is a demo - implement mock response handling");
}

// ============================================================================
// BOATS API
// ============================================================================
export async function getBoats(params: {
  type?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  minLength?: number;
  maxLength?: number;
  featured?: boolean;
  page?: number;
  limit?: number;
}) {
  const qs = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      qs.append(key, String(value));
    }
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/public/listings?${qs.toString()}`,
    { cache: "no-store" }
  );

  return await res.json(); // ✅ RETURN FULL OBJECT
}




export async function getBoatById(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/public/listings/${id}`,
    { cache: "no-store" }
  );

  const json = await res.json();

  if (!json.success) {
    throw new Error(json.message || "Failed to load listing");
  }

  return json.data;
}


export async function createBoat(boat: Omit<Boat, "id" | "updated_at">): Promise<Boat> {
  await delay(300);

  // In production: return apiRequest<Boat>('/boats', { method: 'POST', body: JSON.stringify(boat) });

  const newBoat: Boat = {
    ...boat,
    id: `boat-${Date.now()}`,
    updated_at: new Date().toISOString(),
  };

  console.log("[DEMO API] Created boat:", newBoat);
  return newBoat;
}

export async function updateBoat(id: string, updates: Partial<Boat>): Promise<Boat> {
  await delay(250);

  // In production: return apiRequest<Boat>(`/boats/${id}`, { method: 'PUT', body: JSON.stringify(updates) });

  const boat = await getBoatById(id);
  if (!boat) throw new Error("Boat not found");

  const updatedBoat = {
    ...boat,
    ...updates,
    updated_at: new Date().toISOString(),
  };

  console.log("[DEMO API] Updated boat:", updatedBoat);
  return updatedBoat;
}

export async function deleteBoat(id: string): Promise<void> {
  await delay(200);

  // In production: return apiRequest<void>(`/boats/${id}`, { method: 'DELETE' });

  console.log("[DEMO API] Deleted boat:", id);
}

// ============================================================================
// BROKERS API
// ============================================================================

export async function getBrokers(): Promise<Broker[]> {
  await delay(150);
  return [...(brokersData as Broker[])];
}

export async function getBrokerById(id: string): Promise<Broker | null> {
  await delay(100);
  const broker = (brokersData as Broker[]).find((b) => b.broker_id === id);
  return broker || null;
}

export async function updateBroker(id: string, updates: Partial<Broker>): Promise<Broker> {
  await delay(200);

  const broker = await getBrokerById(id);
  if (!broker) throw new Error("Broker not found");

  const updatedBroker = {
    ...broker,
    ...updates,
  };

  console.log("[DEMO API] Updated broker:", updatedBroker);
  return updatedBroker;
}

export async function approveBroker(id: string): Promise<Broker> {
  return updateBroker(id, { status: "active" });
}

export async function rejectBroker(id: string): Promise<void> {
  await delay(200);
  console.log("[DEMO API] Rejected broker:", id);
}

// ============================================================================
// API LOGS
// ============================================================================

export async function getApiLogs(limit = 50): Promise<ApiLog[]> {
  await delay(100);
  return (apiLogsData as ApiLog[]).slice(0, limit);
}

// ============================================================================
// API TOKENS
// ============================================================================

export async function regenerateToken(brokerId: string): Promise<string> {
  await delay(300);

  const newToken = `${brokerId}_token_${Math.random().toString(36).substring(2, 15)}`;
  console.log("[DEMO API] Regenerated token for broker:", brokerId);

  return newToken;
}

// ============================================================================
// IP WHITELIST
// ============================================================================

export async function addWhitelistedIp(brokerId: string, ip: string): Promise<string[]> {
  await delay(200);

  const broker = await getBrokerById(brokerId);
  if (!broker) throw new Error("Broker not found");

  const updatedIps = [...broker.whitelisted_ips, ip];
  console.log("[DEMO API] Added IP to whitelist:", ip);

  return updatedIps;
}

export async function removeWhitelistedIp(brokerId: string, ip: string): Promise<string[]> {
  await delay(200);

  const broker = await getBrokerById(brokerId);
  if (!broker) throw new Error("Broker not found");

  const updatedIps = broker.whitelisted_ips.filter((i) => i !== ip);
  console.log("[DEMO API] Removed IP from whitelist:", ip);

  return updatedIps;
}

export async function getMe() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) return null;
  return res.json();
}
