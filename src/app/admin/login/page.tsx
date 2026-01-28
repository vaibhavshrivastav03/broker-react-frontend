"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const API_BASE =
  (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001") + "/api";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      // 1️⃣ Login
      const loginRes = await axios.post(`${API_BASE}/auth/login`, {
        email,
        password,
      });

      localStorage.setItem("token", loginRes.data.token);

      // 2️⃣ Get role
      const meRes = await axios.get(`${API_BASE}/auth/me`, {
        headers: {
          Authorization: `Bearer ${loginRes.data.token}`,
        },
      });

      const roleId = meRes.data.role_id;

      // 3️⃣ Redirect by role
      if (roleId === 1) {
        router.push("/admin/super-dashboard");
      } else if (roleId === 2) {
        router.push("/admin/dashboard");
      } else {
        router.push("/admin/login");
      }
    } catch (err: any) {
      setError("Invalid credentials");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleLogin} className="w-full max-w-md p-6 border rounded">
        <h1 className="text-2xl font-bold mb-4">Admin Login</h1>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="w-full bg-black text-white py-2">Login</button>
      </form>
    </div>
  );
}
