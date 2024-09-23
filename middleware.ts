import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth"; // Import the auth function directly

export async function middleware(request: NextRequest) {
  // Fetch session directly using the Auth.js auth function
  const session = await auth();

  if (!session) {
    // If the session is not found (user is not authenticated), redirect to login
    const loginUrl = new URL("/api/auth/signin", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Allow the request to continue if authenticated
  return NextResponse.next();
}

// Apply middleware only to specific routes
export const config = {
  matcher: [
    "/issues/:id/edit", // Protect /issues/[id]/edit
    "/issues/new",      // Protect /issues/new
  ],
};
