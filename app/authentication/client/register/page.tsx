"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

export default function RegisterClient() {
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
    <div className="min-h-screen flex justify-center items-center flex-col bg-linear-to-br from-slate-900 via-blue-950 to-slate-900 rounded gap-10">
      <div className="bg-white/5 md:p-10 p-4 rounded shadow-lg flex flex-col items-center  xl:w-[25dvw] lg:w-[35dvw] md:w-[50dvw] w-[90dvw] text-white/70">
        <h1 className="text-3xl font-bold text-white">Register</h1>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (userData.password !== userData.confirmPassword) {
              toast.error("Passwords do not match");
              return;
            }
            const res = await axios.post(
              "/api/auth/register",
              {
                email: userData.email,
                password: userData.password,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              },
            );
            if (res.status === 201) {
              toast.success("User registered successfully");
              router.push("/authentication/client/login");
            } else {
              toast.error("Error registering user");
            }
          }}
          className="h-1/2 p-10 gap-5 flex flex-col text-center w-full"
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userData.email}
            onChange={handleChange}
            className="border-b py-1 px-2 m-2 outline-0"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={userData.password}
            onChange={handleChange}
            className="border-b py-1 px-2 m-2 outline-0"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={userData.confirmPassword}
            onChange={handleChange}
            className="border-b py-1 px-2 m-2 outline-0"
          />
          <button
            type="submit"
            className="border rounded-full text-white px-8 py-2 hover:bg-white/30 duration-200 transition-colors hover:border-transparent hover:text-black w-fit mx-auto hover:cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
