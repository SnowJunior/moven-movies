/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import CustomButton from "@/components/button";
import { loginUser } from "@/providers/auth/auth.provider";
import { showToast } from "@/hooks/useToast";

export default function SignInForm() {
  // Set various component states
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  // Validation function
  const validateForm = (payload: { email: string; password: string }) => {
    const errors: typeof formErrors = { email: "", password: "" };

    if (!payload.email.trim() || !/\S+@\S+\.\S+/.test(payload.email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!payload.password || payload.password.length < 6) {
      errors.password = "Password must be at least 6 characters long.";
    }

    setFormErrors(errors);
    return !Object.values(errors).some((error) => error !== "");
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent default form submission
    e.preventDefault();

    // Handle form data collection and sanitization
    const formData = new FormData(e.currentTarget);
    const payload = {
      email: (formData.get("email") as string)?.trim(),
      password: (formData.get("password") as string)?.trim(),
    };

    // Form checks
    if (!validateForm(payload)) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      // Send data to login logic
      const response = await loginUser(payload.email, payload.password);

      if (!response.success) {
        showToast(
          "error",
          "Invalid email or password."
        );
      }
      setIsLoading(false);
      return;
    } catch (error: any) {
      setIsLoading(false);
      showToast("error", error.message);
      return;
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="p-8 w-full md:p-14 lg:p-16 text-center z-10 bg-white rounded-lg xl:p-20 text-black"
    >
      <div className="flex flex-col w-full gap-4">
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

      <div className="flex justify-between md:text-base xsm:text-sm items-center gap-2 xsm:gap-6 mt-6">
        <a href="/register" className="text-newColor">
          Create Account
        </a>
        <a href="/forgot-password" className="text-newColor">
          Forgot Password?
        </a>
      </div>

      <CustomButton title="Login" type="submit" isLoading={isLoading} />
    </form>
  );
}
