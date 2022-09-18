/* eslint-disable @next/next/no-server-import-in-page */
import { NextResponse } from "next/server";

const signedinPages = ["/", "/favorites", "/library"];

export function middleware(req) {
  if (signedinPages.find((p) => p === req.nextUrl.pathname)) {
    const token = req.cookies.BANANA_ACCESS_TOKEN;

    if (!token) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }
  }
}
