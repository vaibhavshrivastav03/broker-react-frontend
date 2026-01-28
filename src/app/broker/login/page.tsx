"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiRequest } from "@/lib/api";

export default function BrokerLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const res = await apiRequest("/api/auth/login", "POST", {
        email,
        password,
      });

      localStorage.setItem("token", res.token);
      router.push("/broker/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md p-6 border rounded"
      >
        <h1 className="text-2xl font-bold mb-4">Broker Login</h1>

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

        <button className="w-full bg-black text-white py-2 mb-4">
          Login
        </button>

        {/* Register Redirect */}
        <p className="text-center text-sm">
          Don’t have an account?{" "}
          <Link
            href="/broker/register"
            className="text-blue-600 hover:underline"
          >
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
}
