
"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
// use for server-component i guess
// import { getServerSession } from "next-auth";
// import { AuthOptions } from "./api/auth/[...nextauth]/route";

export default function HomeBlog() {
  // a way to check who is logged in
// const data = await getServerSession(AuthOptions);
// console.log(data);
const router =useRouter();
const logoutHandler=async ()=>{
await signOut();
}


// const loginHandler=async ()=>{
//  router.push("/api/auth/signin")
//   }

const{data,status}=useSession()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <p>{JSON.stringify(data)}</p>,
        <h1>welcome to the blog page, go to <Link href={"/dashboard"}> Dashboard </Link></h1>
        <p> lots of other content</p>

       
        {status ==="authenticated" && (<button onClick={logoutHandler}>Logout</button>)}

       {status ==="unauthenticated" && (<>
        <Link href={"/loginsignup"}>Login or Signup </Link>
       </>)}
      </div>
    </main>
  );
}
