"use client";
import { useSession } from "next-auth/react";
import React from "react";

export default function ProfilePage() {
  const { data } = useSession();
  return (
    <>
      <div>
        <h2>Your Profile Details are</h2>
        <br />
       {data?<ul>
          <li>Name: {data?.user?.name}</li>
          <li>Email: {data?.user?.email}</li>
        </ul>:<p>You re currently not logged in</p>}
      </div>
    </>
  );
}
