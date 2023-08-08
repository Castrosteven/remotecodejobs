import { withAuth } from "next-auth/middleware";
export default withAuth(function middleware() {}, {
  secret: process.env.NEXTAUTH_SECRET,
});
export const config = { matcher: ["/dashboard/:path*"] };
