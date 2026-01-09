import Image from "next/image";
import LoginClient from "./authentication/client/login/page";
import LoginAdmin from "./authentication/admin/page";
import { Toaster } from "react-hot-toast";
import RegisterClient from "./authentication/client/register/page";

export default function Home() {
  return (
    <div>
      <LoginClient />
      <LoginAdmin />
      <RegisterClient />
      <Toaster />
    </div>
  );
}
