"use client";

export default function LoginAdmin() {
  return (
    <div className="min-h-screen flex justify-center items-center flex-col bg-white rounded gap-10">
      <div className="bg-white p-10 rounded shadow-lg flex flex-col items-center max-w-[25dvw]">
        <h1 className="text-2xl font-bold">Login as Admin</h1>
        <div className="p-10 flex flex-col items-center gap-10 text-center">
          <p>
            As an admin you need to signin with your admin credentials.
            Please login with your client credentials if you have.
          </p>
          <button
            type="submit"
            className="bg-amber-950 text-white px-8 py-2 m-2 w-fit mx-auto rounded "
          >
            Login with Admin Credentials
          </button>
        </div>
      </div>
    </div>
  );
}
