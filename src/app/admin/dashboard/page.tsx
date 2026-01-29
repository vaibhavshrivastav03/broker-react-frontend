"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { DashboardLayout } from "@/components/dashboard-layout";
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription,
} from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

import {
  LayoutDashboard, Ship, Users, CheckCircle,
  Key, Activity, Star, Search, Copy, Check,
} from "lucide-react";
import { toast } from "sonner";

/* ================= API ================= */
const api = axios.create({
  baseURL: (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001") + "/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});


/* ================= PAGE ================= */
export default function AdminDashboardPage() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);

  const [brokers, setBrokers] = useState<any[]>([]);
  const [boats, setBoats] = useState<any[]>([]);
  const [pendingBoats, setPendingBoats] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  
/* 🔥 ADD BROKER STATE */
  const [showAddBroker, setShowAddBroker] = useState(false);
  const [newBroker, setNewBroker] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  /* ================= AUTH ================= */
  useEffect(() => {
    async function init() {
      try {
        const res = await api.get("/auth/me");
        if (res.data.role_id !== 2) {
          router.push("/admin/login");
          return;
        }

        // ✅ LOAD OVERVIEW IMMEDIATELY AFTER LOGIN
        await loadOverview();

      } catch {
        localStorage.removeItem("token");
        router.push("/admin/login");
      } finally {
        setLoading(false);
      }
    }

    init();
  }, []);


  /* ================= TAB-BASED LOAD ================= */
  useEffect(() => {
    if (activeTab === "overview") loadOverview();
    if (activeTab === "boats") loadBoats();
    if (activeTab === "brokers" || activeTab === "api-keys") loadBrokers();
    if (activeTab === "approvals") loadPendingBoats();
    if (activeTab === "logs") loadLogs();
  }, [activeTab, page, search]);

  /* ================= LOADERS ================= */
  async function loadOverview() {
    if (!boats.length) await loadBoats();
    if (!brokers.length) await loadBrokers();
    if (!logs.length) await loadLogs();
  }

  /* ================= ACTIONS ================= */
  async function createBroker() {
    if (!newBroker.name || !newBroker.email || !newBroker.password) {
      toast.error("All fields are required");
      return;
    }

    try {
      await api.post("/auth/create-boat-manager", newBroker);
      toast.success("Broker created successfully");
      setShowAddBroker(false);
      setNewBroker({ name: "", email: "", password: "" });
      loadBrokers();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to create broker");
    }
  }

  async function deleteBroker(id: number) {
  if (!confirm("Delete this broker?")) return;

  try {
    await api.delete(`/admin/users/${id}`);
    toast.success("Broker deleted");

    // ✅ Update local state (no full reload)
    setBrokers(prev => prev.filter(b => b.id !== id));
  } catch {
    toast.error("Failed to delete broker");
  }
}


  async function loadBoats() {
    const res = await api.get("/admin/listings", {
      params: { page, limit: pageSize, search },
    });
    setBoats(res.data);
  }

  async function loadBrokers() {
    const res = await api.get("/admin/brokers");
    setBrokers(res.data);
  }

  async function loadPendingBoats() {
    const res = await api.get("/admin/boats/pending");
    setPendingBoats(res.data);
  }

  async function loadLogs() {
    const res = await api.get("/admin/api-logs");
    setLogs(res.data);
  }

  /* ================= ACTIONS ================= */
  async function approveBoat(id: number) {
    await api.post(`/admin/boats/${id}/approve`);
    toast.success("Approved");
    setPendingBoats(prev => prev.filter(v => v.id !== id));
  }

  async function rejectBoat(id: number) {
    await api.post(`/admin/boats/${id}/reject`);
    toast.success("Rejected");
    setPendingBoats(prev => prev.filter(v => v.id !== id));
  }

  async function toggleFeatured(id: number, is_featured: boolean) {
    await api.patch(`/admin/vessels/${id}/feature`, {
      is_featured: !is_featured,
    });

    setBoats((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, is_featured: !b.is_featured } : b
      )
    );
  }


  async function deleteListing(id: number) {
    if (!confirm("Delete listing?")) return;
    await api.delete(`/admin/listing-delete/${id}`);
    setBoats(prev => prev.filter(b => b.id !== id));
    toast.success("Deleted");
  }

  function copy(text: string, key: string) {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1200);
  }

  if (loading) return <div className="p-10">Loading…</div>;

  const activeBrokers = brokers.filter(b => b.status === "active");

  /* ================= UI ================= */
  return (
    <DashboardLayout
      title="Admin Dashboard"
      userRole="admin"
      activeTab={activeTab}
      onTabChange={setActiveTab}
      menuItems={[
        { label: "Overview", value: "overview", icon: <LayoutDashboard className="h-4 w-4" /> },
        { label: "Boats", value: "boats", icon: <Ship className="h-4 w-4" /> },
        { label: "Brokers", value: "brokers", icon: <Users className="h-4 w-4" /> },
        { label: "Approvals", value: "approvals", icon: <CheckCircle className="h-4 w-4" /> },
        { label: "API Keys", value: "api-keys", icon: <Key className="h-4 w-4" /> },
        { label: "Logs", value: "logs", icon: <Activity className="h-4 w-4" /> },
      ]}
    >

{/* ================= OVERVIEW ================= */}
{activeTab === "overview" && (
  <div className="space-y-6">
    
    {/* TOP STATS */}
    <div className="grid md:grid-cols-4 gap-4">
      <Card>
        <CardHeader>
          <CardDescription>Total Listings</CardDescription>
        </CardHeader>
        <CardContent>
          <CardTitle>{boats.length}</CardTitle>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardDescription>Active Brokers</CardDescription>
        </CardHeader>
        <CardContent>
          <CardTitle>{activeBrokers.length}</CardTitle>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardDescription>Pending Approvals</CardDescription>
        </CardHeader>
        <CardContent>
          <CardTitle>{pendingBoats.length}</CardTitle>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardDescription>API Logs</CardDescription>
        </CardHeader>
        <CardContent>
          <CardTitle>{logs.length}</CardTitle>
        </CardContent>
      </Card>
    </div>

    {/* BOTTOM SECTION */}
    <div className="grid lg:grid-cols-2 gap-6">
      
      {/* RECENT ACTIVITY */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {logs.slice(0, 5).map((l) => (
            <div
              key={l.id}
              className="flex items-center justify-between text-sm"
            >
              <span className="truncate">{l.endpoint}</span>
              <Badge>{l.status_code}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* BROKER DISTRIBUTION */}
      <Card>
        <CardHeader>
          <CardTitle>Broker Distribution</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {brokers.map((b) => (
            <div
              key={b.id}
              className="flex items-center justify-between"
            >
              <span>
                {b.name}
                <br />
                <span className="text-xs text-muted-foreground">
                  {b.total_listings} listings
                </span>
              </span>
              <Badge variant={b.status === "active" ? "default" : "secondary"}>
                {b.status}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

    </div>
  </div>
)}



{/* ================= BOATS ================= */}
{activeTab === "boats" && (
  <Card>
    <CardHeader>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          className="pl-9"
          placeholder="Search boats..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Broker</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Featured</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {boats.map(b => (
            <TableRow key={b.id}>
              <TableCell>{b.title}</TableCell>
              <TableCell>{b.broker_name}</TableCell>
              <TableCell><Badge>{b.status}</Badge></TableCell>
              <TableCell>
                <Button
                  size="sm"
                  variant={b.is_featured ? "default" : "outline"}
                  onClick={() => toggleFeatured(b.id, b.is_featured)}
                >
                  <Star
                    className={`h-4 w-4 ${b.is_featured ? "fill-current" : ""}`}
                  />
                </Button>
              </TableCell>
              <TableCell>
                <Button size="sm" variant="destructive" onClick={() => deleteListing(b.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
)}

{/* ================= BROKERS ================= */}
{activeTab === "brokers" && (
  <div className="space-y-6">
    
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold">Brokers</h2>
      <Button onClick={() => setShowAddBroker(true)}>+ Add Broker</Button>
    </div>

    {showAddBroker && (
      <Card>
        <CardHeader>
          <CardTitle>Create Broker</CardTitle>
          <CardDescription>Boat manager account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Name"
            value={newBroker.name}
            onChange={e => setNewBroker({ ...newBroker, name: e.target.value })}
          />
          <Input
            placeholder="Email"
            value={newBroker.email}
            onChange={e => setNewBroker({ ...newBroker, email: e.target.value })}
          />
          <Input
            type="password"
            placeholder="Password"
            value={newBroker.password}
            onChange={e => setNewBroker({ ...newBroker, password: e.target.value })}
          />
          <div className="flex gap-2">
            <Button onClick={createBroker}>Create</Button>
            <Button variant="outline" onClick={() => setShowAddBroker(false)}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    )}

    <Card>
      <CardContent className="pt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Permission</TableHead>
              <TableHead>Listings</TableHead>
              <TableHead>IPs</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {brokers.map(b => (
              <TableRow key={b.id}>
                <TableCell className="font-medium">{b.name}</TableCell>
                <TableCell>{b.email}</TableCell>

                <TableCell>
                  <Badge
                    variant={b.status === "active" ? "default" : "secondary"}
                  >
                    {b.status}
                  </Badge>
                </TableCell>

                <TableCell>
                  <Badge variant="outline">{b.permission_level}</Badge>
                </TableCell>

                <TableCell>{b.total_listings}</TableCell>

                <TableCell>
                  {Array.isArray(b.whitelisted_ips)
                    ? b.whitelisted_ips.length
                    : 0}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteBroker(b.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>

  </div>
)}


{/* ================= APPROVALS ================= */}
{activeTab === "approvals" && pendingBoats.map(v => (
  <Card key={v.id}>
    <CardHeader><CardTitle>{v.title}</CardTitle></CardHeader>
    <CardContent className="flex gap-2">
      <Button onClick={() => approveBoat(v.id)}>Approve</Button>
      <Button variant="destructive" onClick={() => rejectBoat(v.id)}>Reject</Button>
    </CardContent>
  </Card>
))}

{/* ================= API KEYS ================= */}
{activeTab === "api-keys" && brokers.filter(b => b.status === "active").map(b => (
  <Card key={b.id}>
    <CardHeader><CardTitle>{b.name}</CardTitle></CardHeader>
    <CardContent className="flex gap-2">
      <code className="flex-1 bg-slate-100 p-2 rounded">{b.api_token}</code>
      <Button size="sm" variant="outline" onClick={() => copy(b.api_token, b.id)}>
        {copiedKey === b.id ? <Check /> : <Copy />}
      </Button>
    </CardContent>
  </Card>
))}

{/* ================= LOGS ================= */}
{activeTab === "logs" && (
  <Card>
    <CardHeader><CardTitle>API Logs</CardTitle></CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Endpoint</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>IP</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map(l => (
            <TableRow key={l.id}>
              <TableCell>{l.endpoint}</TableCell>
              <TableCell><Badge>{l.status_code}</Badge></TableCell>
              <TableCell>{l.ip_address}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
)}

    </DashboardLayout>
  );
}
