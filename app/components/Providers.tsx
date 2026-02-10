"use client";

import { SessionProvider } from "next-auth/react";
import Navbar from "./navbar";
import { usePathname } from "next/navigation";

export default function Providers({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  return (
    <SessionProvider>
      {path !== "/dashboard/client-dashboard" &&
        path !== "/dashboard/admin-dashboard" && <Navbar />}
      {children}
    </SessionProvider>
  );
}
