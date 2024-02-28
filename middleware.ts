import { getToken } from "next-auth/jwt";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { $authHost } from "./http";

export async function middleware(request: NextRequest) {
  // if (typeof window !== "undefined") {
  //   const response = await $authHost.get('/api/v1/auth')
  //   console.log(response)
  //   if (response.status === 200) {
  //     return NextResponse.redirect(new URL('/projects', request.url))
  //   }  
  //   return NextResponse.redirect(new URL('/login', request.url))    
  // }

}

export const config = {
    matcher: ['/((?!api|static|favicon.ico).*)'],
};