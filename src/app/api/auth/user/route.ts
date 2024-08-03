import { connectToDatabase } from "@/app/common/server-helpers";
import prisma from "../../../../../prisma/prismaUtil";
import { NextResponse } from "next/server";
import { user } from "../../utils/AuthOptions";


export const GET = async () => {
  try {
    await connectToDatabase();
    const users = await prisma.user.findMany();
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "server error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const PUT = async (req: Request) => {
  try {
    const data: user = await req.json();
    console.log("Supplied:", { data });

    if (!data)
      return NextResponse.json({ message: "Invalid Data" }, { status: 422 });
    const { id, ...userDetails } = data;

    await connectToDatabase();
    const updatedUserDetails = await prisma.user.update({
      data: { ...userDetails },
      where: {
        id,
      },
    });

    console.log("UpdatedDetails:", updatedUserDetails);

    return NextResponse.json({ updatedUserDetails }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
