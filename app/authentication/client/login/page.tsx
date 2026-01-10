"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

export default function LoginClient() {
  const router = useRouter();
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
      <div className="bg-white p-10 rounded shadow-lg flex flex-col items-center">
        <h1 className="text-3xl font-bold">Login</h1>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const res = await signIn("credentials", {
              email: userData.email,
              password: userData.password,
              redirect: false,
            });
            if (res && res.ok) {
              toast.success("Logged in successfully");
              router.push("/dashboard");
            }
          }}
          className="h-1/2 p-10 gap-5 flex flex-col text-center w-[20dvw]"
        >
          <input
            type="text"
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
            className="bg-amber-950 text-white px-8 py-2 m-2 w-fit mx-auto rounded "
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
