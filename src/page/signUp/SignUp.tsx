"use client";
import React, { useState } from "react";
import { signUpTypes } from "./types/types";
import { globalFormHandler } from "@/handlers/FormHandler";
import Image from "next/image";

const SignUp = () => {
  const [formData, setFromData] = useState<signUpTypes>({
    email: "",
    name: "",
    password: "",
    phoneNumber: "",
  });

  const submitHandler = () => {
    console.log("formData", formData);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md">
        <div className="relative transform overflow-hidden rounded-lg bg-white p-8 shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl border border-gray-200">
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

          <form method="POST" className="mt-6 space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-900"
              >
                Name
              </label>
              <input
                id="name"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={formData?.name}
                name="name"
                type="text"
                required
                autoComplete="name"
                onChange={(e) =>
                  globalFormHandler(e.target.id, e.target.value, setFromData)
                }
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-900"
              >
                Phone
              </label>
              <input
                id="phone"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                name="phone"
                value={formData?.phoneNumber}
                type="tel"
                required
                autoComplete="tel"
                pattern="[0-9]{10}"
                onChange={(e) =>
                  globalFormHandler(e.target.id, e.target.value, setFromData)
                }
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900"
              >
                Email Address
              </label>
              <input
                id="email"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                name="email"
                type="email"
                value={formData?.email}
                required
                autoComplete="email"
                onChange={(e) =>
                  globalFormHandler(e.target.id, e.target.value, setFromData)
                }
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <input
                id="password"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                name="password"
                value={formData?.password}
                type="password"
                required
                autoComplete="new-password"
                minLength={6}
                onChange={(e) =>
                  globalFormHandler(e.target.id, e.target.value, setFromData)
                }
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isButtonDisabled} // Disable button if validation fails
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
