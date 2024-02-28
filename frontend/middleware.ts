import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  let cookie = request.cookies.get("token");
  if (cookie) {
    return NextResponse.redirect(new URL("/blogs", request.url));
  }
}

export const config = {
  matcher: "/blogs",
};
