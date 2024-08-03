import NextAuth from "next-auth";
import { AuthOptions } from "../../utils/AuthOptions";

// the options are imported
// const handler = NextAuth(AuthOptions);
// export {handler as GET, handler as POST}
// Define the User type

// Define the User type



const handler = NextAuth(AuthOptions);

export { handler as GET, handler as POST };
