"use client";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import React from "react";

interface SessProviderProps {
  children: React.ReactNode;
  session?: Session; 
}

export default function AuthProvider({ children , session }: SessProviderProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
