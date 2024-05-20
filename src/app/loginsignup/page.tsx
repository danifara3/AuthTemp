import LoginForm from "@/component/login-form";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default async function LoginSignupPage() {
  // client component in a server component
  // const session=useSession();

  // add loading state
  const session = await getServerSession();
  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full  items-end rounded-lg p-3 md:h-36">
          <div className="w-32 text-white md:w-36  mx-auto">
            {/* <AppLogo /> */}
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
