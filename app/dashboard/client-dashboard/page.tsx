"use client";
import { signOut } from "next-auth/react";

export default function ClientDashboard() {
  // useEffect(() => {
  //   // Add any necessary side effects here
  // }, [])

  return (
    <div>
      <h1>Welcome to the Client Dashboard</h1>
      <button onClick={() => signOut({ callbackUrl: "/" })}>
        Sign Out
      </button>
    </div>
  );
}
