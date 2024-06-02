"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

export default function MyStory() {
  const [Message, setMessage] = useState("");
  const [IsLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { data: session, update } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // =======================

  const onSubmit: SubmitHandler<any> = async (formData) => {
    console.log(formData);
    const { name } = formData;

    try {
      setIsLoading(true);

      if (!session?.user?.id) {
        setMessage("User not logged in.");

        return;
      }
      const updatedName = update({name:name});
      setIsLoading(false);
      return updatedName;
    } catch (error) {
      console.error("Error:", error);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div>MyStory</div>
      <p>You are not suppose to be here unless you are logged in</p>

      <form onSubmit={handleSubmit(onSubmit)} className="">
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
              placeholder="user new name"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className={`px-4 py-2 my-2  bg-green-500 font-semibold rounded hover:bg-green-600 focus:outline-none focus:bg-green-600 active:scale-95 ${
            IsLoading ? "opacity-50 animate-pulse cursor-not-allowed" : ""
          }`}
        >
          Update
        </button>
      </form>

      {/* <Link href={"/"}> Home </Link> */}
    </>
  );
}
