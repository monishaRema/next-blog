import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { userService } from "./service/user.service";
import { Roles } from "./constants/roles";

export async function proxy(request: NextRequest) {
  let isAuthenticated = false;
  let isAdmin = false;
  const pathName = request.nextUrl.pathname
  const { data } = await userService.getSession();



  if (data) {
    isAuthenticated = true;
    isAdmin = data.user.role === Roles.admin;
  }

  //   user is authenticated 
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

//   user is admin and hit /dashboard route
  if (isAdmin && pathName.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/admin-dashboard", request.url));
  }
  //   user is not admin and hit /admin-dashboard route
  if (!isAdmin && pathName.startsWith("/admin-dashboard")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/admin-dashboard",
    "/admin-dashboard/:path*",
  ],
};
