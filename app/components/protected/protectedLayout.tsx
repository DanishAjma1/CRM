"use client";
import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      signOut({ redirect: false });
      router.push("/authentication/client/login");
    }
  }, [status]);

  if (status === "loading") return null;

  return children;
}
