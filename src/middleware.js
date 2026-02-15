import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // Middleware logic can be added here if needed
  },
  {
    callbacks: {
      authorized({ req, token }) {
        // Protect specific routes
        const protectedPaths = ["/", "/profile"];

        if (protectedPaths.includes(req.nextUrl.pathname)) {
          return !!token; 
        }
        return true;
      },
    },
    pages: {
      signIn: "/login", 
    },
  },
);

export const config = {
  matcher: ["/", "/profile", "/profile/:path*"],
};
