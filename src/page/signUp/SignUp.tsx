"use client";
import React, { useState, useEffect } from "react";
import { otpVerification, signUpUser } from "../signUp/services";
import Image from "next/image";
import { signUpTypes } from "./types/types";
import toast from "react-hot-toast";
import { decryptOTP } from "@/utils/decryptOtp";
import { useRouter } from "next/navigation";
import BtnLoadingAnimation from "@/components/btnLoadingAnimation/btnLoadingAnimation";
import onlyLogo from "../../assets/main_only_logo.png";
import Cookies from "js-cookie";
import Link from "next/link";

const SignUp = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<signUpTypes>({
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });
  const [showOtpField, setShowOtpField] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(null);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState(false);
  const [otpData, setOtpData] = useState<string | null>("");
  const [passwordError, setPasswordError] = useState(false);
  const [isOtpSend, setIsOtpSend] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    checkFormValidation(formData.password, formData.confirmPassword);
  }, [formData.password, formData.confirmPassword, isOtpVerified]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await signUpUser(formData);
      if (response?.status === "success") {
        Cookies.set("access_token", response?.data?.access_token, {
          expires: 30,
        });
        router.push("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleSendOtp = async () => {
    setIsLoading(true);
    if (formData.email !== "") {
      try {
        const response = await otpVerification({ email: formData.email });
        const decryptedOtp = await decryptOTP(response?.data?.otp_token);
        setOtpData(decryptedOtp);
        if (response?.status === "success") {
          toast.success("Otp send successfully");
          setIsOtpSend(true);
          setShowOtpField(true);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    } else {
      toast.error("Enter email ID");
    }
    setIsLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const checkFormValidation = (password: string, confirmPassword: string) => {
    const isPasswordsMatch = password === confirmPassword;
    setPasswordMatch(isPasswordsMatch);
    setPasswordError(!isPasswordsMatch);
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const enteredOtp = e.target.value;
    setFormData((prev) => ({ ...prev, otp: enteredOtp }));

    if (enteredOtp === otpData) {
      setIsOtpVerified(true);
      setOtpError(false);
    } else {
      setIsOtpVerified(false);
      setOtpError(true);
    }
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-white vie-primary_light to-primary_mid px-4">
        <div className="relative w-full max-w-md">
          <div className="group relative transform overflow-hidden rounded-lg bg-white p-8 shadow-lg transition duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl border border-gray-200">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <Image
                src={onlyLogo}
                alt="Company Logo"
                width={800}
                height={64}
                priority
                className="mx-auto h-16 w-auto"
              />
              <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">
                Create Account
              </h2>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm space-y-6"
            >
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-900"
                >
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  placeholder="Enter your name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 shadow-sm focus:border-primary_dark focus:ring-primary_dark sm:text-sm"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-900"
                >
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Enter your phone number"
                  type="text"
                  maxLength={15}
                  required
                  autoComplete="tel"
                  pattern="\d*"
                  inputMode="numeric"
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 shadow-sm focus:border-primary_dark focus:ring-primary_dark sm:text-sm"
                  value={formData?.phoneNumber}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-900"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  autoComplete="email"
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 shadow-sm focus:border-primary_dark focus:ring-primary_dark sm:text-sm"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-900"
                >
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  id="password"
                  placeholder="Enter your password"
                  name="password"
                  type="password"
                  required
                  autoComplete="new-password"
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 shadow-sm focus:border-primary_dark focus:ring-primary_dark sm:text-sm"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-900"
                >
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    placeholder="Enter your confirm password"
                    name="confirmPassword"
                    type="password"
                    required
                    autoComplete="new-password"
                    className={`block w-full rounded-md border  ${
                      passwordError ? "border-red-500" : "border-gray-300"
                    } px-3 py-2 border-gray-300 bg-gray-50 text-gray-900 shadow-sm focus:border-primary_dark focus:ring-primary_dark sm:text-sm`}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
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

              {showOtpField && (
                <div className="space-y-2">
                  <label
                    htmlFor="otp"
                    className="block text-sm font-medium text-gray-900"
                  >
                    OTP <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="otp"
                    name="otp"
                    placeholder="Enter your otp"
                    autoComplete="tel"
                    pattern="\d*"
                    inputMode="numeric"
                    required
                    className={`block w-full rounded-md border ${
                      otpError ? "border-red-500" : "border-gray-300"
                    } border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 shadow-sm focus:border-primary_dark focus:ring-primary_dark sm:text-sm`}
                    value={formData.otp}
                    onChange={handleOtpChange}
                  />
                  {otpError && (
                    <span className="text-red-500 ml-2">❌ Invalid OTP</span>
                  )}
                  {isOtpVerified && (
                    <span className="text-green-500 ml-2">✔ OTP Verified</span>
                  )}
                </div>
              )}

              {isOtpSend ? (
                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full px-4 py-2 bg-primary_dark text-white rounded-md flex items-center justify-center gap-2"
                  >
                    {!isLoading ? "Sign Up" : <BtnLoadingAnimation />}
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={handleSendOtp}
                    className="w-full px-4 py-2 bg-primary_dark text-white rounded-md flex items-center justify-center gap-2"
                  >
                    {!isLoading ? "Verify email" : <BtnLoadingAnimation />}
                  </button>
                </div>
              )}

              {isOtpSend && (
                <p
                  className="mt-4 text-center text-sm text-gray-600"
                  onClick={handleSendOtp}
                >
                  Re-send otp
                </p>
              )}
              <p className="text-center text-sm text-gray-600 mt-4">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-primary_dark hover:underline"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
