import { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === "/") {
    console.log("TRACK");
  }
}

// See "Matching Paths" below to learn more
export const matcher = {
  matcher: ["/"],
};
