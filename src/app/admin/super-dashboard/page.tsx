"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { DashboardLayout } from "@/components/dashboard-layout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

import {
  LayoutDashboard,
  Ship,
  Users,
  UserCog,
  CheckCircle,
  Key,
  Activity,
  Star,
  Trash2,
  Search,
  Copy,
  Check,
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
export default function SuperAdminDashboardPage() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);

  const [admins, setAdmins] = useState<any[]>([]);
  const [brokers, setBrokers] = useState<any[]>([]);
  const [boats, setBoats] = useState<any[]>([]);
  const [pendingBrokers, setPendingBrokers] = useState<any[]>([]);
  const [pendingBoats, setPendingBoats] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const [showAddBroker, setShowAddBroker] = useState(false);
  const [showAddAdmin, setShowAddAdmin] = useState(false);

  const [newBroker, setNewBroker] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    password: "",
    role_id: 2,
  });

  /* ================= AUTH + INITIAL LOAD ================= */
  useEffect(() => {
    async function init() {
      try {
        const me = await api.get("/auth/me");
        if (me.data.role_id !== 1) {
          router.push("/admin/login");
          return;
        }

        // Load overview immediately
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
    if (activeTab === "admins") loadAdmins();
    if (activeTab === "approvals") loadApprovals();
    if (activeTab === "logs") loadLogs();
  }, [activeTab, page, search]);

  /* ================= LOADERS ================= */
  async function loadOverview() {
    if (!boats.length) await loadBoats();
    if (!brokers.length) await loadBrokers();
    if (!logs.length) await loadLogs();
    if (!pendingBrokers.length || !pendingBoats.length) await loadApprovals();
  }

  async function loadAdmins() {
    const res = await api.get("/super-admin/admins");
    setAdmins(res.data);
  }

  async function loadBrokers() {
    const res = await api.get("/super-admin/brokers");
    setBrokers(res.data);
  }

  async function loadBoats() {
    const res = await api.get("/super-admin/listings");
    setBoats(res.data);
  }

  async function loadApprovals() {
    const [b, v] = await Promise.all([
      api.get("/super-admin/brokers/pending"),
      api.get("/super-admin/boats/pending"),
    ]);

    setPendingBrokers(b.data);
    setPendingBoats(v.data);
  }

  async function loadLogs() {
    const res = await api.get("/super-admin/api-logs");
    setLogs(res.data);
  }

  /* ================= ACTIONS (NO FULL RELOAD) ================= */
  async function createBroker() {
    await api.post("/auth/create-boat-manager", newBroker);
    toast.success("Broker created");
    setShowAddBroker(false);
    setNewBroker({ name: "", email: "", password: "" });
    loadBrokers();
  }

  async function createAdmin() {
    await api.post("/auth/create-admin", newAdmin);
    toast.success("Admin created");
    setShowAddAdmin(false);
    setNewAdmin({ name: "", email: "", password: "", role_id: 2 });
    loadAdmins();
  }

  async function approveBroker(id: number) {
    await api.post(`/super-admin/brokers/${id}/approve`);
    setPendingBrokers(p => p.filter(b => b.id !== id));
    toast.success("Broker approved");
  }

  async function rejectBroker(id: number) {
    await api.post(`/super-admin/brokers/${id}/reject`);
    setPendingBrokers(p => p.filter(b => b.id !== id));
    toast.success("Broker rejected");
  }

  async function approveBoat(id: number) {
    await api.post(`/super-admin/boats/${id}/approve`);
    setPendingBoats(p => p.filter(v => v.id !== id));
    toast.success("Boat approved");
  }

  async function rejectBoat(id: number) {
    await api.post(`/super-admin/boats/${id}/reject`);
    setPendingBoats(p => p.filter(v => v.id !== id));
    toast.success("Boat rejected");
  }

  async function deleteAdmin(id: number) {
    await api.delete(`/super-admin/users/${id}`);
    setAdmins(a => a.filter(x => x.id !== id));
    toast.success("Admin deleted");
  }

  async function deleteBroker(id: number) {
    await api.delete(`/super-admin/users/${id}`);
    setBrokers(b => b.filter(x => x.id !== id));
    toast.success("Broker deleted");
  }

  async function deleteListing(id: number) {
    await api.delete(`/super-admin/listing-delete/${id}`);
    setBoats(b => b.filter(x => x.id !== id));
    toast.success("Listing deleted");
  }

  function copy(text: string, key: string) {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1200);
  }

  /* ================= DERIVED ================= */
  const activeBrokers = brokers.filter(b => b.status === "active");

  const filteredBoats = useMemo(() => {
    return boats.filter(b =>
      !search ||
      b.title?.toLowerCase().includes(search.toLowerCase()) ||
      b.broker_name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [boats, search]);

  const paginatedBoats = filteredBoats.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  if (loading) return <div className="p-10">Loading…</div>;

  /* ================= UI ================= */
  return (
    <DashboardLayout
      title="Super Admin Dashboard"
      userRole="super-admin"
      activeTab={activeTab}
      onTabChange={setActiveTab}
      menuItems={[
        { label: "Overview", value: "overview", icon: <LayoutDashboard className="h-4 w-4" /> },
        { label: "Boats", value: "boats", icon: <Ship className="h-4 w-4" /> },
        { label: "Brokers", value: "brokers", icon: <Users className="h-4 w-4" /> },
        { label: "Admins", value: "admins", icon: <UserCog className="h-4 w-4" /> },
        { label: "Approvals", value: "approvals", icon: <CheckCircle className="h-4 w-4" /> },
        { label: "API Keys", value: "api-keys", icon: <Key className="h-4 w-4" /> },
        { label: "Logs", value: "logs", icon: <Activity className="h-4 w-4" /> },
      ]}
    >
      {/* ================= OVERVIEW ================= */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">Overview</h2>
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card><CardHeader><CardDescription>Total Listings</CardDescription></CardHeader><CardContent><CardTitle>{boats.length}</CardTitle></CardContent></Card>
              <Card><CardHeader><CardDescription>Active Brokers</CardDescription></CardHeader><CardContent><CardTitle>{activeBrokers.length}</CardTitle></CardContent></Card>
              <Card><CardHeader><CardDescription>Pending Approvals</CardDescription></CardHeader><CardContent><CardTitle>{pendingBrokers.length + pendingBoats.length}</CardTitle></CardContent></Card>
              <Card><CardHeader><CardDescription>API Logs</CardDescription></CardHeader><CardContent><CardTitle>{logs.length}</CardTitle></CardContent></Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader>
                <CardContent>
                  {logs.slice(0,5).map(l => (
                    <div key={l.id} className="flex justify-between text-sm space-y-3">
                      <span>{l.endpoint}</span>
                      <Badge>{l.status_code}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Broker Distribution</CardTitle></CardHeader>
                <CardContent>
                  {brokers.map(b => (
                    <div key={b.id} className="flex justify-between space-y-3">
                      <span>{b.name} <br /> {b.total_listings}</span>
                      <Badge>{b.status}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* ================= BOATS ================= */}
      {activeTab === "boats" && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">Boats</h2>
          <Card>
            <CardHeader>
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search listings..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Broker</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Featured</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedBoats.map(b => (
                    <TableRow key={b.id}>
                      <TableCell>{b.title}</TableCell>
                      <TableCell>{b.broker_name}</TableCell>
                      <TableCell>${Number(b.price_usd || 0).toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={b.status === "pending" ? "destructive" : b.status === "publish" ? "default": "secondary"}>
                          {b.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant={b.flag === "featured" ? "default" : "outline"}
                          onClick={() => toggleFeatured(b.id, b.flag)}
                        >
                          <Star
                            className={`h-4 w-4 ${
                              b.flag === "featured" ? "fill-current" : ""
                            }`}
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

              <div className="flex justify-end gap-2 pt-4">
                <Button disabled={page === 1} onClick={() => setPage(p => p - 1)}>Prev</Button>
                <Button disabled={page * pageSize >= filteredBoats.length} onClick={() => setPage(p => p + 1)}>Next</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ================= BROKERS ================= */}
      {activeTab === "brokers" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">Brokers</h2>

            <Button onClick={() => setShowAddBroker(true)}>
              + Add Broker
            </Button>
          </div>

          {showAddBroker && (
            <Card>
              <CardHeader>
                <CardTitle>Create Broker</CardTitle>
                <CardDescription>
                  This will create a broker (boat manager) account
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <Input
                  placeholder="Name"
                  value={newBroker.name}
                  onChange={(e) => setNewBroker({ ...newBroker, name: e.target.value })}
                />
                <Input
                  placeholder="Email"
                  value={newBroker.email}
                  onChange={(e) => setNewBroker({ ...newBroker, email: e.target.value })}
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={newBroker.password}
                  onChange={(e) =>
                    setNewBroker({ ...newBroker, password: e.target.value })
                  }
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
                    <TableHead>Broker Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Permission</TableHead>
                    <TableHead>Listings</TableHead>
                    <TableHead>IPs</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {brokers.map((b) => (
                    <TableRow key={b.broker_id}>
                      <TableCell>{b.name}</TableCell>
                      <TableCell>
                        <Badge variant={b.status === "active" ? "default" : "secondary"}>
                          {b.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{b.permission_level}</Badge>
                      </TableCell>
                      <TableCell>{b.total_listings}</TableCell>
                      <TableCell>{b.whitelisted_ips.length}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="destructive" onClick={() => deleteBroker(b.id)}>
                          <Trash2 className="h-4 w-4" />
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

      {/* ================= ADMINS ================= */}
      {activeTab === "admins" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">Admins</h2>

            <Button onClick={() => setShowAddAdmin(true)}>
              + Add Admin
            </Button>
          </div>

          {showAddAdmin && (
            <Card>
              <CardHeader>
                <CardTitle>Create Admin</CardTitle>
                <CardDescription>
                  This will create a admin account
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <Input
                  placeholder="Name"
                  value={newAdmin.name}
                  onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                />
                <Input
                  placeholder="Email"
                  value={newAdmin.email}
                  onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={newAdmin.password}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, password: e.target.value })
                  }
                />

                <div className="flex gap-2">
                  <Button onClick={createAdmin}>Create</Button>
                  <Button variant="outline" onClick={() => setShowAddAdmin(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          <Card>
            <CardHeader><CardTitle>Admins</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {admins.map(a => (
                    <TableRow key={a.id}>
                      <TableCell>{a.name}</TableCell>
                      <TableCell>{a.email}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="destructive" onClick={() => deleteAdmin(a.id)}>
                          <Trash2 className="h-4 w-4" />
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
      {activeTab === "approvals" && (
        <div className="space-y-6">
                   
          <h2 className="text-2xl font-bold text-slate-900">Boat Approval</h2>
          {pendingBoats.map(v => (
            <Card key={v.id}>
              <CardHeader><CardTitle>{v.title}</CardTitle></CardHeader>
              <CardContent className="flex gap-3">
                <Button onClick={() => approveBoat(v.id)}>Approve</Button>
                <Button variant="destructive" onClick={() => rejectBoat(v.id)}>Reject</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* ================= API KEYS ================= */}
      {activeTab === "api-keys" && (
        <div className="space-y-4">
          {brokers.filter(b => b.status === "active").map(b => (
            <Card key={b.id}>
              <CardHeader><CardTitle>{b.name}</CardTitle></CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <code className="flex-1 bg-slate-100 p-2 rounded">{b.api_token}</code>
                  <Button size="sm" variant="outline" onClick={() => copy(b.api_token, b.id)}>
                    {copiedKey === b.id ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

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
