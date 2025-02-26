"use client";
import React, { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import BtnLoadingAnimation from "@/componets/btnLoadingAnimation/btnLoadingAnimation";
import { useParams } from "next/navigation";
import { changePasswordTypes } from "./types/types";
import { sendEmailForgotPassword } from "./services";

const ChangePassword = () => {
  const params = useParams();
  const id: string = params.id;
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<changePasswordTypes>({
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordMatch, setPasswordMatch] = useState<boolean | null>(null);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "newPassword" || name === "confirmPassword") {
      setPasswordMatch(
        name === "confirmPassword"
          ? value === formData.newPassword
          : value === formData.confirmPassword
      );
    }
  };

  // Handle form submission
  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.newPassword || !formData.confirmPassword) {
      toast.error("Please fill in both password fields.");
      return;
    }

    if (!passwordMatch) {
      toast.error("Passwords do not match. Please try again.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await sendEmailForgotPassword(id, formData.newPassword);
      if (response.status === "success") {
        toast.success("Your password has been updated successfully!");
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "An unexpected error occurred. Please try again."
      );
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
            <h2 className="mt-4 text-2xl font-bold text-gray-900">
              Forgot Your Password?
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your new password below to reset your account.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={submitHandler} className="mt-6 space-y-5">
            {/* New Password Input */}
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-900"
              >
                Create a New Password
              </label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                required
                autoComplete="new-password"
                className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={formData.newPassword}
                onChange={handleChange}
              />
            </div>

            {/* Confirm Password Input */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-900"
              >
                Confirm Your New Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  autoComplete="new-password"
                  className={`block w-full rounded-md border ${
                    passwordMatch === false
                      ? "border-red-500"
                      : "border-gray-300"
                  } bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  {passwordMatch !== null && (
                    <span
                      className={
                        passwordMatch ? "text-green-500" : "text-red-500"
                      }
                    >
                      {passwordMatch ? "✔" : "✖"}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md flex items-center justify-center gap-2 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? <BtnLoadingAnimation /> : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
