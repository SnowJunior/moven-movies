/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import CustomButton from "@/components/button";
import { useState } from "react";
import Link from "next/link";
import { registerUser } from "@/providers/auth/auth.provider";
import { useToast } from "@/hooks/use-toast";
import { redirect } from "next/navigation";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const handleRegister = async (e: React.ChangeEvent<HTMLFormElement>) => {
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);

    const payload = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      username: formData.get('username') as string
    };

    try {
      const response = await registerUser(payload.email, payload.password, payload.username);

      if (response !== null) {
        toast({
          title: "Registration Successful",
          variant: "default",
        });
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (e: any) {
      const errorMessage = e.message;
      toast({
        title: "Failed Login",
        description: errorMessage,
        variant: "destructive",
      });

      console.error("This is a login failure", e);
    } finally {
      setIsLoading(false);
      redirect("/login");
    }
  };
  return (
    <form
      onSubmit={handleRegister}
      action="javascript:void(0);"
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

        <input
          className="rounded-md border border-primary bg-inputColor h-14 px-4 text-start"
          type="email"
          id="email"
          placeholder="Email"
          name="email"
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

      <CustomButton title={"Login"} type={"submit"} isLoading={isLoading} />
      <div className="flex justify-between md:text-base xsm:text-sm items-center gap-2 xsm:gap-6 mt-6">
        <div className="text-lg">
          {" "}
          <p data-link="forgot_redirect" className="text-newColor">
            Already have an account?{" "}
            <Link
              href={"/login"}
              className={"text-blue-600 text-lg font-semibold"}
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
}
