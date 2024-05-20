import { signIn } from "next-auth/react";
import prisma from "../../../prisma/prismaUtil";
import { redirect } from "next/dist/server/api-utils";

export const connectToDatabase = async () => {
  try {
    await prisma.$connect();
  } catch (error) {
    throw new Error("unable to connect to database");
  }
};

type InputsPutSignup = {
  name: string;
  email: string;
  password: string;
};

type InputsPutLogin = {
  email: string;
  password: string;
};

export async function registerNewUser(inputData: InputsPutSignup) {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inputData),
  });

  if (!response.ok) {
    throw new Error("Failed to register user");
  }

  const newUser = await response.json();
  return newUser;
}

export async function loginUser(inputData: InputsPutLogin) {
  const res = signIn("credentials", {
    email: inputData.email,
    password: inputData.password,
    redirect: false,
  });

  return res;
}
