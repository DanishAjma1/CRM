"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

export default function LoginAdmin() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  return (
    <div className="min-h-screen flex justify-center items-center flex-col bg-white rounded gap-10">
      <div className="bg-white p-10 rounded shadow-lg flex flex-col items-center max-w-[25dvw]">
        <h1 className="text-2xl font-bold">Login as Admin</h1>
        <div className="p-10 flex flex-col items-center gap-10 text-center">
          <p>
            As an admin you need to signin with your admin credentials. Please
            login with your client credentials if you have.
          </p>
          <button
            type="submit"
            disabled={loading}
            className="bg-amber-950 text-white px-8 py-2 m-2 w-fit mx-auto rounded disabled:opacity-50"
            onClick={async (e) => {
              e.preventDefault();
              setLoading(true);
              try {
                const res = await signIn("google", {
                  callbackUrl: "/dashboard",
                });
                res?.ok && router.push("/dashboard");
              } catch (error) {
                toast.error("An error occurred during login");
              } finally {
                setLoading(false);
              }
            }}
          >
            {loading ? "Signing in..." : "Login with Google"}
          </button>
        </div>
      </div>
    </div>
  );
}
