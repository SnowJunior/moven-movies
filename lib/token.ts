"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const token_cookie = {
  name: "x-AB",
  options: {
    httpOnly: true,
    maxAge: 5 * 60 * 1000,
    secure: process.env.NODE_ENV === "production",
  },
};

export async function CreateTokenCookie(xToken: string) {
  (await cookies()).set(token_cookie.name, xToken, { ...token_cookie.options });
}

export async function DeleteTokenCookie() {
  (await cookies()).delete(token_cookie.name);
  // await deleteCookie()
  redirect(" /login");
}
