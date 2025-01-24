"use client";

import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import CustomButton from "@/components/button";
import Link from "next/link";
import { loginUser } from "@/providers/auth/auth.provider";
import { redirect } from "next/navigation";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);

    try {
      const response = await loginUser(
        formData.get("email") as string,
        formData.get("password") as string
      );

      if (response !== null) {
        redirect("/dashboard");
      }
    } catch (e: unknown) {
      console.error("This is a login failure", e);
    }
  };
  return (
    <form
      onSubmit={handleLogin}
      className="xsm:w-full p-12 w-full md:p-14 lg:p-16 text-center z-10 bg-white-opacity rounded-lg 2xl:p-20 text-black"
    >
      <div className="flex flex-col w-full gap-4">
        <input
          className="rounded-md border border-primary bg-inputColor h-14 px-4 text-start"
          type="text"
          id="username"
          placeholder="Username"
          name="username"
        />
        <div className="relative w-full border-none rounded-md">
          <input
            className="w-full h-14 bg-inputColor border border-primary rounded-md px-4 text-start"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            id="password"
          />
          <button
            className="absolute inset-y-0 right-2 rounded-md flex items-center justify-center border-none"
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          >
            {showPassword ? (
              <AiFillEyeInvisible size={20} />
            ) : (
              <AiFillEye size={20} />
            )}
          </button>
        </div>
      </div>
      <div className="flex justify-between md:text-base xsm:text-sm items-center gap-2 xsm:gap-6 mt-6">
        <div className="">
          {""}
          <a
            href="/sign-up"
            data-link="signup_redirect"
            className="text-newColor"
          >
            Create Account
          </a>
        </div>
        <div className="">
          {" "}
          <a
            href="/forgot-password"
            data-link="forgot_redirect"
            className="text-newColor"
          >
            Forgot Password?
          </a>
        </div>
      </div>

      <Link href={"/dashboard"}>Dashboard</Link>

      <CustomButton title={"Login"} type={"submit"} />
    </form>
  );
}
