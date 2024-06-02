"use client";
import { updateUser } from "@/app/common/server-helpers";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

export default function ProfilePage() {



  const [Message, setMessage] = useState("");
  const [IsLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

// =======================

const onSubmit: SubmitHandler<any> = async (formData) => {
  if (!session?.user?.id) {
    setMessage("User not logged in.");
    return;
  }

  const dataWithId = { ...formData, id: session.user.id };

  setIsLoading(true);

  try {
    const updatedUser = await updateUser(dataWithId);
    if (updatedUser?.ok) {
      setMessage("Profile updated successfully.");
      router.refresh();
    } else {
      setMessage("Failed to update profile.");
    }
  } catch (error) {
    console.error("Error:", error);
    setMessage("Something went wrong. Please try again.");
  } finally {
    setIsLoading(false);
    signOut();
    
  }
};

// ==========
  return (
    <>
      <div>
        <h2>Your Profile Details are</h2>
        <br />
        {session?.user ? (
          <ul>
            <li>ID: {session.user.id}</li>
            <li>Name: {session.user.name}</li>
            <li>Email: {session.user.email}</li>
            <li>Address: {session.user.address}</li>
          </ul>
        ) : (
          <p>You are currently not logged in</p>
        )}
      </div>



      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="">
          

          <div className="w-full">
           
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

                <br/>

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
                
              </div>
            </div>
            <br />
           
          </div>
          <br />
          <button
            type="submit"
            className={`px-4 py-2 my-2  bg-green-500 font-semibold rounded hover:bg-green-600 focus:outline-none focus:bg-green-600 active:scale-95 ${
              IsLoading ? "opacity-50 animate-pulse cursor-not-allowed" : ""
            }`}
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
