"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Shield } from "lucide-react";
import { toast } from "sonner";

const api = axios.create({
  baseURL:
    (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001") + "/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default function SuperAdminDashboardPage() {
  const router = useRouter();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const me = await api.get("/auth/me");

      if (me.data.role_id !== 1) {
        router.push("/admin/login");
        return;
      }

      const res = await api.get("/admin/brokers");
      setUsers(res.data || []);
    } catch (e) {
      router.push("/admin/login");
    } finally {
      setLoading(false);
    }
  }


  if (loading) return <div className="p-10">Loading…</div>;

  return (
    <DashboardLayout
      title="Super Admin Dashboard"
      userRole="super-admin"
      activeTab="users"
      menuItems={[
        { label: "Users", value: "users", icon: <Users className="h-4 w-4" /> },
        { label: "Permissions", value: "permissions", icon: <Shield className="h-4 w-4" /> },
      ]}
    >
      <Card>
        <CardHeader>
          <CardTitle>Admins & Brokers</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>
                    <Badge>{u.role_name}</Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      size="sm"                    
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
    </DashboardLayout>
  );
}
