"use client";

import { getToken } from "@/lib/token";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    // console.log("Token:", token);
    // const isValid = api.get(endpoints.users);
    // if (!isValid) {
    //   console.error("Token validation failed");
    //   router.push("/login");
    // }

    if (!token) {
      router.push("/login");
    }
  }, []);

  return <>{children}</>;
}
