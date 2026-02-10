// app/dashboard/admin-dashboard/page.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../lib/authOptions";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/authentication/client/login");
  if (session.user.role === "admin") redirect("/dashboard/admin-dashboard");
  else if (session.user.role === "user") redirect("/dashboard/client-dashboard");

  return <h1>Admin Dashboard</h1>;
}
