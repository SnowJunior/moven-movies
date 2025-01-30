'use server'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export default async function middleware(req: NextRequest) {
  const protectedRoutes = ['/dashboard'];

  const currentPath = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(currentPath);

  if (isProtectedRoute) {
    const token = (await cookies()).get('x-AB');

    if (!token) {
      return NextResponse.redirect(new URL('/login', req.nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard'], // Match only the dashboard route
};