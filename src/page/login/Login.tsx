"use client";
import React, { useState } from "react";
import { loginTypes } from "./types/types";
import { loginService } from "./services";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import BtnLoadingAnimation from "@/componets/btnLoadingAnimation/btnLoadingAnimation";

const Login = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<loginTypes>({
    email: "",
    password: "",
  });

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await loginService(formData);
      if (response?.status === "success") {
        localStorage.setItem("access_token", response?.data?.access_token);
        router.push("/");
      }
    } catch (error: unknown) {
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md">
        <div className="relative transform overflow-hidden rounded-xl bg-white p-8 shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl border border-gray-200">
          {/* Logo */}
          <div className="text-center">
            <Image
              src="/img/logo/logo.png"
              alt="Company Logo"
              width={64}
              height={64}
              priority
              className="mx-auto h-16 w-auto"
            />
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-gray-900">
              Sign In
            </h2>
          </div>

          {/* Form */}
          <div className="mt-6 space-y-5">
            {/* Email Input */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                required
                autoComplete="email"
                className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                required
                autoComplete="current-password"
                minLength={6}
                className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, password: e.target.value }))
                }
              />
              <div className="flex justify-end">
                <Link
                  href="/forgot-password"
                  className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Sign In Button */}
            <button
              disabled={isLoading}
              onClick={(e) => submitHandler(e)}
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md flex items-center justify-center gap-2"
            >
              {!isLoading ? "Sign In" : <BtnLoadingAnimation />}
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="mt-4 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link
              href="/sign-up"
              className="font-medium text-indigo-600 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
