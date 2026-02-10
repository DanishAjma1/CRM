"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ProtectedLayout from "../components/protected/protectedLayout";
export default function Dashboard() {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <div>
      <ProtectedLayout>
        <>
          {session?.user?.role === "admin" &&
            router.push("/dashboard/admin-dashboard")}
        </>
        <>
          {session?.user?.role === "user" &&
            router.push("/dashboard/client-dashboard")}
        </>
      </ProtectedLayout>
    </div>
  );
}
