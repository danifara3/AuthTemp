"use client";
import Link from "next/link";
import NavLinks from "@/component/nav-links";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function SideNav() {
  const router = useRouter();
  const [IsLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();

  const logoutHandler = async () => {
    await signOut();
    router.push('/'); // Redirect to the home page or login page after sign out
  };

  return (
    <div className="flex h-full flex-col  px-3 py-4 md:px-2">
      {status === "authenticated" && (
        <button 
          onClick={logoutHandler} 
          className={`px-4 py-2 my-2  bg-green-500 font-semibold rounded hover:bg-green-600 focus:outline-none focus:bg-green-600 active:scale-95 ${
            IsLoading ? "opacity-50 animate-pulse cursor-not-allowed" : ""
          }`}
        >
          Logout {session?.user?.name}
        </button>
      )}
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
      </div>
    </div>
  );
}
