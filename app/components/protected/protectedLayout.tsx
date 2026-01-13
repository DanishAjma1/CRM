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
      router.push("/");
    }
  }, [status]);

  if (status === "loading")
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="ring-2 ring-transparent rounded-full h-10 w-10 animate-spin border-l-2 border-r-2 border-blue-500"></div>
      </div>
    );

  return children;
}
