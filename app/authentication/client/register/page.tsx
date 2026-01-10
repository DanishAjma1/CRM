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
    <div className="min-h-screen flex justify-center items-center flex-col bg-white rounded gap-10">
      <div className="bg-white p-10 rounded shadow-lg flex flex-col items-center">
        <h1 className="text-3xl font-bold">Register</h1>
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
              }
            );
            if (res.status === 201) {
              toast.success("User registered successfully");
              router.push("/authentication/client/login");
            } else {
              toast.error("Error registering user");
            }
          }}
          className="h-1/2 p-10 gap-5 flex flex-col text-center w-[20dvw]"
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
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={userData.confirmPassword}
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
