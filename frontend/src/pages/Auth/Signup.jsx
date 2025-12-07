import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import axiosInstance from "../../utils/axiosInstance"; // Make sure axiosInstance is configured
import { API } from "../../utils/apiPath";

const initialForm = {
  username: "",
  email: "",
  password: "",
  dateOfBirth: "",
  showPassword: false,
};

const Signup = () => {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleTogglePassword = () =>
    setForm((prev) => ({ ...prev, showPassword: !prev.showPassword }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axiosInstance.post(API.SIGNUP, {
        username: form.username,
        email: form.email,
        password: form.password,
        dateOfBirth: form.dateOfBirth
      });

      // If signup success, redirect to VerifyEmail page with email
      navigate("/verify-email", { state: { email: form.email } });
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Try again.");
    }
  };

  return (
    <AuthLayout title="Sign Up" subtitle="Create your free account.">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Username */}
        <input
          type="text"
          name="username"
          placeholder="Full Name"
          value={form.username}
          onChange={handleChange}
          className="border rounded-lg px-4 py-2 font-poppins focus:outline-none focus:ring-2 focus:ring-[#875cf5]"
          required
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border rounded-lg px-4 py-2 font-poppins focus:outline-none focus:ring-2 focus:ring-[#875cf5]"
          required
        />

        {/* Date of Birth */}
        <input
          type="date"
          name="dateOfBirth"
          value={form.dateOfBirth}
          onChange={handleChange}
          className="border rounded-lg px-4 py-2 font-poppins focus:outline-none focus:ring-2 focus:ring-[#875cf5]"
          max={new Date().toISOString().split("T")[0]}
          required
        />

        {/* Password */}
        <div className="relative">
          <input
            type={form.showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="border rounded-lg w-full px-4 py-2 font-poppins focus:outline-none focus:ring-2 focus:ring-[#875cf5]"
            required
          />
          <button
            type="button"
            tabIndex={-1}
            className="absolute inset-y-0 right-3 flex items-center text-[#875cf5] focus:outline-none"
            onClick={handleTogglePassword}
          >
            {form.showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-[#875cf5] text-white rounded-lg py-2 mt-2 font-bold font-poppins hover:bg-[#7150d6] transition shadow"
        >
          Create Account
        </button>

        {error && <span className="text-red-600 text-sm mt-2">{error}</span>}
      </form>

      {/* Bottom Redirect */}
      <div className="text-sm text-center text-gray-600 mt-4">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-[#875cf5] hover:underline font-medium"
        >
          Login here
        </Link>
      </div>
    </AuthLayout>
  );
};

export default Signup;
