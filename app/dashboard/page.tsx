"use client";

import React from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ProtectedLayout from "../components/protected/protectedLayout";
import ClientDashboard from "./client-dashboard/page";

export default function Dashboard() {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <div>
      <ProtectedLayout>
        {session?.user?.role === "admin" ? (
          <div className="p-4">
            <h1 className="text-xl font-bold">{session.googleAccessToken}</h1>
            <button onClick={() => signOut({ callbackUrl: "/" })}>
              Sign Out
            </button>
          </div>
        ) : (
          <>
            <h2>{session?.user?.role}</h2>
            <ClientDashboard />
          </>
        )}
      </ProtectedLayout>
    </div>
  );
}
