"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

export default function LoginClient() {
  const router = useRouter();
  const [isloading, setIsLoading] = React.useState(false);
  const [userData, setUserData] = React.useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  return (
    <div className="min-h-screen flex justify-center items-center flex-col bg-white rounded gap-10">
      <div className="bg-white md:p-10 p-4 rounded shadow-lg flex flex-col items-center xl:w-[25dvw] lg:w-[35dvw] md:w-[50dvw] w-[90dvw]">
        <h1 className="text-3xl font-bold">Login</h1>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setIsLoading(true);
            const res = await signIn("credentials", {
              email: userData.email,
              password: userData.password,
              redirect: false,
            });
            if (res && res.ok) {
              toast.success("Logged in successfully");
              setIsLoading(false);
              router.push("/dashboard");
            } else throw new Error("Invalid credentials");
          }}
          className="h-1/2 p-10 gap-5 flex flex-col text-center w-full"
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userData.email}
            onChange={handleChange}
            className="border py-1 px-2 m-2 rounded-2xl"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={userData.password}
            onChange={handleChange}
            className="border py-1 px-2 m-2 rounded-2xl"
          />
          <button
            type="submit"
            disabled={isloading}
            className="bg-amber-950 text-white px-8 py-2 m-2 w-fit mx-auto rounded hover:cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isloading ? (
              <div className="flex items-center gap-2">
                <div className="ring-2 ring-transparent rounded-full h-5 w-5 animate-spin border-l-2 border-r-2 border-amber-900"></div>
                <span>Logging in...</span>
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
