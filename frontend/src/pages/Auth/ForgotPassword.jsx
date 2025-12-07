import React, { useState } from "react";
import AuthLayout from "../../layouts/AuthLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API } from "../../utils/apiPath";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState("email"); // email -> OTP
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [fade, setFade] = useState(true);

  // Send Code
  const handleSendCode = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await axiosInstance.post(API.FORGET_PASSWORD, { email });

      // fade out email block
      setFade(false);

      setTimeout(() => {
        setStep("otp");
        setFade(true);
      }, 300);
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong.");
    }
  };

  // Verify OTP
  const handleVerify = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await axiosInstance.post(API.VERIFY_EMAIL, { email, code: otp });

      setMessage("Verified! Now you can reset password.");
    } catch (err) {
      setMessage(err.response?.data?.message || "Invalid code.");
    }
  };

  // Resend Code
  const resendCode = async () => {
    try {
      await axiosInstance.post(API.RESEND_OTP, { email });
      setMessage("New code sent to your email.");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error sending code.");
    }
  };

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="We will send a 6-digit verification code to your email."
    >
      <div
        className={`transition-all duration-300 ${
          fade ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"
        }`}
      >
        {/* STEP 1 → EMAIL INPUT */}
        {step === "email" && (
          <form onSubmit={handleSendCode} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#875cf5]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button
              type="submit"
              className="bg-[#875cf5] text-white rounded-lg py-2 mt-2 font-bold hover:bg-[#7150d6] transition"
            >
              Send Code
            </button>
          </form>
        )}

        {/* STEP 2 → OTP INPUT */}
        {step === "otp" && (
          <form onSubmit={handleVerify} className="flex flex-col gap-4">
            <h2 className="text-center text-sm text-gray-500">
              Verification code sent to <b>{email}</b>
            </h2>

            <input
              type="text"
              placeholder="Enter verification code"
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#875cf5]"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />

            <button
              type="submit"
              className="bg-[#875cf5] text-white rounded-lg py-2 mt-2 font-bold hover:bg-[#7150d6]"
            >
              Verify Code
            </button>

            {/* RESEND CODE */}
            <button
              type="button"
              onClick={resendCode}
              className="text-[#875cf5] mt-2 underline text-sm"
            >
              Resend Code
            </button>
          </form>
        )}

        {message && (
          <p className="text-red-600 text-sm mt-3 text-center">{message}</p>
        )}
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
