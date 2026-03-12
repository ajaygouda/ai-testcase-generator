// middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth({
    callbacks: {
        authorized: ({ token }) => !!token,
    },
    pages: {
        signIn: "/login",
    },
});

export const config = {
    matcher: [
        "/((?!api/auth|_next/static|_next/image|favicon.ico).*)", // ← covers root / too
    ],
};