"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

export default function LoginAdmin() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-blue-950 to-slate-900  flex justify-center items-center flex-col bg-white rounded gap-10">
      <div className="bg-white/5 p-10 rounded shadow-lg flex flex-col items-center xl:w-[30dvw] lg:w-[35dvw] md:w-[50dvw] w-[90dvw] text-white/70">
        <h1 className="text-2xl font-bold text-white">Login as Admin</h1>
        <div className="p-10 flex flex-col items-center gap-10 text-center">
          <p>
            As an admin you need to signin with your admin credentials. Please
            login with your client credentials if you have.
          </p>
          <button
            type="submit"
            disabled={loading}
            className="border rounded-full text-white px-8 py-2 hover:bg-white/30 duration-200 transition-colors hover:border-transparent hover:text-black w-fit mx-auto hover:cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
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
