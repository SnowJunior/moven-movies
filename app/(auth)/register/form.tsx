/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import CustomButton from "@/components/button";
import { useState } from "react";
import Link from "next/link";
import { registerUser } from "@/providers/auth/auth.provider";
import { redirect } from "next/navigation";
import { showToast } from "@/hooks/useToast";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const validateForm = (payload: {
    email: string;
    password: string;
    username: string;
  }) => {
    const errors: typeof formErrors = { username: "", email: "", password: "" };

    if (!payload.username.trim()) {
      errors.username = "Username is required.";
    }
    if (!payload.email.trim() || !/\S+@\S+\.\S+/.test(payload.email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!payload.password || payload.password.length < 6) {
      errors.password = "Password must be at least 6 characters long.";
    }

    setFormErrors(errors);
    return !Object.values(errors).some((error) => error !== "");
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const payload = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      username: formData.get("username") as string,
    };

    if (!validateForm(payload)) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await registerUser(payload.email, payload.password, {
        username: payload.username,
      });

      if (!response.success) {
        showToast(
          "error",
          `${response.message || "Registration failed. Please try again."}`
        );
        return;
      }
    } catch (e: any) {
      showToast(
        "error",
        `${e.message || "An unexpected error occurred. Please try again."}`
      );
    } finally {
      setIsLoading(false);
      redirect("/dashboard");
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      className="xsm:w-full p-12 w-full md:p-14 lg:p-16 text-center z-10 bg-white-opacity rounded-lg 2xl:p-20 text-black"
    >
      <div className="flex flex-col w-full gap-4">
        {/* Username Field */}
        <div className="flex flex-col">
          <input
            className={`rounded-md border ${
              formErrors.username ? "border-red-500" : "border-primary"
            } bg-inputColor h-14 px-4 text-start`}
            type="text"
            id="username"
            placeholder="Username"
            required
            name="username"
          />
          {formErrors.username && (
            <p className="text-red-500 text-sm mt-1">{formErrors.username}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="flex flex-col">
          <input
            className={`rounded-md border ${
              formErrors.email ? "border-red-500" : "border-primary"
            } bg-inputColor h-14 px-4 text-start`}
            type="email"
            id="email"
            placeholder="Email"
            required
            name="email"
          />
          {formErrors.email && (
            <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="relative w-full flex flex-col">
          <input
            className={`w-full h-14 bg-inputColor border ${
              formErrors.password ? "border-red-500" : "border-primary"
            } rounded-md px-4 text-start`}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            required
            id="password"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-2 rounded-md flex items-center justify-center border-none"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <AiFillEyeInvisible size={20} />
            ) : (
              <AiFillEye size={20} />
            )}
          </button>
          {formErrors.password && (
            <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
          )}
        </div>
      </div>

      <CustomButton
        title="Sign Up"
        type="submit"
        isLoading={isLoading}
        disabled={isLoading}
      />

      <div className="flex justify-between md:text-base xsm:text-sm items-center gap-2 xsm:gap-6 mt-6">
        <p className="text-lg">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 text-lg font-semibold">
            Sign in
          </Link>
        </p>
      </div>
    </form>
  );
}
