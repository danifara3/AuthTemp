import { connectToDatabase } from "@/app/common/server-helpers";
import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/prismaUtil";
import bcrypt from "bcrypt";

export const POST = async (req: Request) => {
  try {
    const { name,address, email, password } = await req.json();
    console.log("Supplied:",{name,address, email, password});
    
    if (!name || !email || !password)
      return NextResponse.json({ message: "Invalid Data" }, { status: 422 });
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectToDatabase();
    const newUser = await prisma.user.create({
      data: { email,address, name, hashedPassword },
    });

    console.log("wasCreated:", newUser);
    
    return NextResponse.json({ newUser }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
