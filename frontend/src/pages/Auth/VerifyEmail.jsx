import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API } from "../../utils/apiPath";

const VerifyEmail = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";

  const inputRefs = useRef([]);

  useEffect(() => {
    if (!email) {
      setError("No email provided. Please go back and signup first.");
    } else {
      inputRefs.current[0]?.focus();
    }
  }, [email]);

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setError("");
    const fullOtp = otp.join("");

    if (fullOtp.length < 6) {
      setError("Please enter the complete 6-digit code.");
      return;
    }

    try {
      await axiosInstance.post(API.VERIFY_EMAIL, { email, code: fullOtp });
      alert("Email verified successfully!");
      navigate("/auth/login");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP, try again.");
    }
  };

  const handleResend = async () => {
    if (!email) return;

    setError("");
    try {
      await axiosInstance.post(API.RESEND_OTP, { email });
      alert("New OTP sent to your email.");
    } catch (err) {
      setError(err.response?.data?.message || "Error resending OTP.");
    }
  };

  return (
    <AuthLayout
      title="Verify Your Email"
      subtitle={email ? `Enter the 6-digit code sent to ${email}` : ""}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex justify-between">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => (inputRefs.current[idx] = el)}
              id={`otp-input-${idx}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className="w-12 h-12 border rounded-lg text-center text-xl font-semibold focus:ring-2 focus:ring-[#875cf5] focus:outline-none"
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={!email}
          className="bg-[#875cf5] text-white rounded-lg py-2 font-bold font-poppins hover:bg-[#7150d6] transition shadow disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Verify Email
        </button>

        {error && <span className="text-red-600 text-sm mt-2">{error}</span>}
      </form>

      {email && (
        <p className="text-center text-sm text-gray-600 mt-4">
          Didn’t receive the code?{" "}
          <button
            className="text-[#875cf5] hover:underline"
            type="button"
            onClick={handleResend}
          >
            Resend
          </button>
        </p>
      )}

      <div className="text-center text-sm text-gray-500 mt-2">
        <Link to="/auth/login" className="hover:underline text-[#875cf5]">
          Go back to Login
        </Link>
      </div>
    </AuthLayout>
  );
};

export default VerifyEmail;
