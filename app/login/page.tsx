"use client";

import { loginUser } from "@/lib/auth";
import { endpoints } from "@/lib/endpoints";
import { setToken } from "@/lib/token";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const url = process.env.NEXT_PUBLIC_API_URL;
  const dataa = endpoints.users;
  console.log("API URL:", url, "Endpoints:", dataa);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (!username || !password) {
        setError("Username and password are required");
        setIsLoading(false);
        return;
      }

      const res = await loginUser({ username, password });

      if (res?.access) {
        setToken(res.access);
        router.push("/");
      } else {
        setError("Login failed: No token received");
      }
    } catch (err: any) {
      setError(err?.message || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white text-black">
      <div className="w-full max-w-6xl px-4 py-12">
        <div className="mx-auto max-w-xl bg-white border border-gray-300 p-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-black">
              AeroCompliance Pro
            </h1>
            <p className="text-sm text-gray-600">
              Maintenance control infrastructure
            </p>
            <p className="text-sm text-gray-600">
              url data {url} endpoints {dataa}
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Username
              </label>
              <input
                type="text"
                className="w-full bg-white border border-gray-300 px-4 py-2 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full bg-white border border-gray-300 px-4 py-2 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-300 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-black text-white px-4 py-3 font-medium hover:bg-gray-900 disabled:bg-gray-400 transition-colors"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
