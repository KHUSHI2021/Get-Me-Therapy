import NextAuth from "next-auth/next";
import { authOptions } from "./options";

const handler = NextAuth(authOptions)

export {handler as GET , handler as POST} // IN THIS TYPE OF FILES KOI BHI METHODE KA NAAM LIKHLI VO NHI CHALEGA ISILIYE USE KRTE HAI INH VERBS KA GET POST