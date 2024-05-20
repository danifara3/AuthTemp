"use client";
import Link from "next/link";
import NavLinks from "@/component/nav-links";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

// import { PowerIcon } from '@heroicons/react/24/outline';
// import { signOut } from '@/auth';

export default function SideNav() {
  const router = useRouter();
  const logoutHandler = async () => {
    await signOut();
  };
  const { data, status } = useSession();
  return (
    <div className="flex h-full flex-col border-r-2 border-blue-500 px-3 py-4 md:px-2">
      {status === "authenticated" && (
        <button onClick={logoutHandler}>Logout {data.user?.name} </button>
      )}
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
      </div>
    </div>
  );
}
