"use client";

import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { SubmitHandler, useForm } from "react-hook-form";
import { loginUser, registerNewUser } from "@/app/common/server-helpers";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [Message, setMessage] = useState("");
  const [IsLoading, setIsLoading] = useState(false);
  const { status } = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit: SubmitHandler<any> = async (data) => {
    console.log(data);

    setIsLoading(true);
    if (isLogin) {
      try {
        const user = await loginUser(data);
        if (user?.ok) {
          setMessage("Logged in successfully");
          console.log("userlogged in:", user);
          // router.push("/dashboard");
          router.refresh();
        }
      } catch (error) {
        console.error("Error:", error);
        setMessage("Something went wrong. Please try again.");
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        const newUser = await registerNewUser(data);
        if (newUser) setMessage("Profile Created successfully");
        router.push("/loginsignup");
        setIsLogin(true)
      } catch (error) {
        console.error("Error:", error);
        setMessage("Something went wrong. Please try again.");
      } finally {
        setIsLogin(true)
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <Link href={"/"}>Home </Link>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
          <h1 className={` mb-3 text-2xl`}>
            Signup to continue.
            <br />
            <br />
          </h1>

          <div className="w-full">
            {!isLogin && (
              <>
                <div>
                  <label
                    className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <div className="relative">
                    <input
                      className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                      id="name"
                      {...register("name")}
                      type="text"
                      name="name"
                      placeholder="user"
                      required
                    />
                  </div>
                </div>

                <br />

                <div>
                  <label
                    className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                    htmlFor="name"
                  >
                    Address
                  </label>
                  <div className="relative">
                    <input
                      className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                      id="address"
                      {...register("address")}
                      type="text"
                      name="address"
                      placeholder="address"
                      required
                    />
                  </div>
                </div>
              </>
            )}

            <br />
            <div>
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="email"
              >
                Email
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="email"
                  type="email"
                  {...register("email")}
                  name="email"
                  placeholder="user@nextmail.com"
                  required
                />
                {/* <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
              </div>
            </div>
            <br />
            <div className="mt-4">
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="password"
                  type="password"
                  {...register("password")}
                  name="password"
                  placeholder="123456"
                  required
                  minLength={4}
                />
                {/* <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
              </div>
            </div>
          </div>
          <br />
          <button
            type="submit"
            className={`px-4 py-2 my-2  bg-green-500 font-semibold rounded hover:bg-green-600 focus:outline-none focus:bg-green-600 active:scale-95 ${
              IsLoading ? "opacity-50 animate-pulse cursor-not-allowed" : ""
            }`}
          >
            {isLogin ? "Login" : "Signup"}
          </button>
        </div>
      </form>
      <button
        onClick={() => setIsLogin(!isLogin)}
        className="text-blue-500 hover:text-blue-400 mt-2 cursor-pointer"
      >
        {isLogin ? "Switch to Signup" : "Switch to Login"}
      </button>
    </>
  );
}
