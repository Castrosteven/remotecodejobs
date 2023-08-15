import { withAuth } from "next-auth/middleware";
export default withAuth(function middleware() {}, {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    newUser: "",
    error: "",
    signIn: "/login",
    signOut: "",
    verifyRequest: "",
  },
});
export const config = { matcher: "/dashboard" };
