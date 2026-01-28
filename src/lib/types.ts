export interface Boat {
  id: string;
  name: string;
  type: "catamaran" | "monohull" | "power";
  year: number;
  make: string;
  model: string;
  length_ft: number;
  price_usd: number;
  location: string;
  description: string;
  featured: boolean;
  broker_id: string;
  broker_name: string;
  updated_at: string;
  images: string[];
}

export interface Broker {
  broker_id: string;
  broker_name: string;
  contact_name: string;
  email: string;
  phone: string;
  company_address: string;
  status: "active" | "pending" | "inactive";
  permission_level: "read_only" | "read_write";
  whitelisted_ips: string[];
  client_id: string;
  api_token: string;
  created_at: string;
  last_api_call: string;
  total_listings: number;
}

export interface ApiLog {
  id: string;
  timestamp: string;
  broker_id: string;
  broker_name: string;
  endpoint: string;
  method: string;
  status_code: number;
  ip_address: string;
  response_time_ms: number;
}

export type UserRole = "admin" | "broker";

export interface User {
  role: UserRole;
  broker_id?: string;
  broker_name?: string;
}
