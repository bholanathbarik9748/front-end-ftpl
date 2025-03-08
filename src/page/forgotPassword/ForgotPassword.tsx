"use client";
import React, { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import BtnLoadingAnimation from "@/components/btnLoadingAnimation/btnLoadingAnimation";
import { forgotPasswordChangePassword } from "./services";
import onlyLogo from "../../assets/main_only_logo.png";

const ForgotPassword = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState("");

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await forgotPasswordChangePassword(email);
      if (response?.status === "success") {
        toast.success("A reset password link has been sent to your email.");
        router.push("/login");
      }
    } catch (error: unknown) {
      toast.error(
        error?.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-white vie-blue-100 to-blue-200 px-4">
      <div className="w-full max-w-md">
        <div className="relative transform overflow-hidden rounded-xl bg-white p-8 shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl border border-gray-200">
          {/* Logo */}
          <div className="text-center">
            <Image
              src={onlyLogo}
              alt="Company Logo"
              width={800}
              height={64}
              priority
              className="mx-auto h-16 w-auto"
            />
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-gray-900">
              Forgot Password
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email to receive a password reset link.
            </p>
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
                value={email}
                required
                autoComplete="email"
                className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 shadow-sm focus:border-primary_dark focus:ring-primary_dark sm:text-sm"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={submitHandler}
              className="w-full px-4 py-2 bg-primary_dark text-white rounded-md flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? <BtnLoadingAnimation /> : "Send reset link"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
