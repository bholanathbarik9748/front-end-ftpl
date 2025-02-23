"use client";
import React, { useState, useEffect } from "react";
import {otpVerification, signUpUser} from "../signUp/services";
const SignUp = () => {
  const [showOtpField, setShowOtpField] = useState(false);
  const [buttonText, setButtonText] = useState("Send OTP");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // Disable Sign Up button initially
  const [otp, setOtp] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false); // Track OTP verification
  const [otpError, setOtpError] = useState(false); // Track OTP input error
  const [passwordError, setPasswordError] = useState(false); // Track password match error
  const [email, setEmail] = useState("");

  // Check password match and enable/disable submit button
  useEffect(() => {
    checkFormValidation(password, confirmPassword);
  }, [password, confirmPassword, isOtpVerified]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!passwordMatch) {
      alert("Passwords do not match.");
      return;
    }

    if (!isOtpVerified) {
      alert("Please verify your OTP before submitting the form.");
      return;
    }

    // Capture form data
    const formData = {
      name: event.target.name.value,
      phone: event.target.phone.value,
      email: event.target.email.value,
      password: password, // Password directly accessed from state
      otp: otp,
    };

    try {
      const response = await signUpUser(formData);
      console.log("Sign-up successful:", response);
      alert("Sign-up successful!"); // Show success message
    } catch (error) {
      alert("Sign-up failed. Please try again.");
    }
    // Log form data in console
    console.log("Form Data:", formData);

    // You can proceed with further form submission logic (e.g., sending data to an API)
  };

  const handleSendOtp = async () => {
    if(email !=""){
    setShowOtpField(true);
    setButtonText("OTP SENT");
    try {
      const otpData = {
        email: {email}
      };
      console.log(otpData);
      const response = await otpVerification(otpData);
      console.log("OTP verified successfully:", response);
    } catch (error) {
      console.error("OTP verification failed:", error);
    }
  }else{
    alert("Enter email ID");
  }
    
  };
  

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  // Function to check form validation (password match and OTP verification)
  const checkFormValidation = (password, confirmPassword) => {
    const isPasswordsMatch = password === confirmPassword;
    setPasswordMatch(isPasswordsMatch);
    setPasswordError(!isPasswordsMatch);

    // Enable Sign Up button only if passwords match and OTP is verified
    setIsButtonDisabled(!(isPasswordsMatch && isOtpVerified));
  };

  // Function to handle OTP change
  const handleOtpChange = (e) => {
    const enteredOtp = e.target.value;
    setOtp(enteredOtp);

    if (enteredOtp === "123") {
      setIsOtpVerified(true); // OTP is verified
      setOtpError(false); // Reset OTP error
    } else {
      setIsOtpVerified(false); // OTP not verified
      setOtpError(true); // Set OTP error
      setIsButtonDisabled(true); // Disable submit button if OTP is incorrect
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="relative w-full max-w-md">
        <div className="group relative transform overflow-hidden rounded-lg bg-white p-8 shadow-lg transition duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl border border-gray-200">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              style={{ height: "100px", width: "auto" }}
              alt="Your Company"
              src="/img/logo/logo.png"
              className="mx-auto h-10 w-auto"
            />
            <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">
              Create Account
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-900">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="text"
                maxLength="10"
                required
                autoComplete="tel"
                pattern="\d*"
                inputMode="numeric"
                className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="new-password"
                className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  autoComplete="new-password"
                  className={`block w-full rounded-md border ${
                    passwordError ? "border-red-500" : "border-gray-300"
                  } bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  {passwordMatch !== null && (
                    <span className={passwordMatch ? "text-green-500" : "text-red-500"}>
                      {passwordMatch ? "✔" : "✖"}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {showOtpField && (
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-900">
                  OTP
                </label>
                <input
                  id="otp"
                  name="otp"
                  autoComplete="tel"
                  pattern="\d*"
                  inputMode="numeric"
                  required
                  className={`block w-full rounded-md border ${
                    otpError ? "border-red-500" : "border-gray-300"
                  } bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                  value={otp}
                  onChange={handleOtpChange}
                />
                {otpError && <span className="text-red-500 ml-2">❌ Invalid OTP</span>}
                {isOtpVerified && <span className="text-green-500 ml-2">✔ OTP Verified</span>}
              </div>
            )}

            <div>
              <button
                type="button"
                onClick={handleSendOtp}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200"
              >
                {buttonText}
              </button>
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
