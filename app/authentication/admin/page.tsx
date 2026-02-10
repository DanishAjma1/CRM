"use client";

import axios from "axios";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

export default function LoginAdmin() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  return (
    <div className="min-h-screen flex justify-center items-center flex-col bg-white rounded gap-10">
      <div className="bg-white p-10 rounded shadow-lg flex flex-col items-center xl:w-[30dvw] lg:w-[35dvw] md:w-[50dvw] w-[90dvw]">
        <h1 className="text-2xl font-bold">Login as Admin</h1>
        <div className="p-10 flex flex-col items-center gap-10 text-center">
          <p>
            As an admin you need to signin with your admin credentials. Please
            login with your client credentials if you have.
          </p>
          <button
            type="submit"
            disabled={loading}
            className="bg-amber-950 text-white px-12 py-2 m-2 w-fit mx-auto rounded disabled:opacity-50"
            onClick={async () => {
              setLoading(true);
              try {
                await signIn("google", { callbackUrl: "/dashboard" });
                // await signIn("/api/google-ads/connect", {
                //   callbackUrl: "/dashboard",
                // });
              } catch (error) {
                toast.error("Error logging in as admin");
                setLoading(false);
              }
            }}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
