import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API } from "../../utils/apiPath";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const togglePassword = () =>
    setForm((prev) => ({ ...prev, showPassword: !prev.showPassword }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axiosInstance.post(API.LOGIN, {
        email: form.email,
        password: form.password,
      });

      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        navigate("./components/TripauraAgentComponent");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <AuthLayout title="Login" subtitle="Welcome back! Login to your account.">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            onClick={togglePassword}
          >
            {form.showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {/* Forgot Password */}
        <Link
          to="/forgot-password"
          className="text-sm text-[#875cf5] hover:underline font-medium text-right"
        >
          Forgot Password?
        </Link>

        {/* Submit */}
        <button
          type="submit"
          className="bg-[#875cf5] text-white rounded-lg py-2 mt-2 font-bold font-poppins hover:bg-[#7150d6] transition"
        >
          Login
        </button>

        {error && <span className="text-red-600 text-sm mt-2">{error}</span>}
      </form>

      {/* Redirect */}
      <div className="text-sm text-center text-gray-600 mt-5">
        New here?{" "}
        <Link
          to="/signup"
          className="text-[#875cf5] hover:underline font-medium"
        >
          Create account
        </Link>
      </div>
    </AuthLayout>
  );
};

export default Login;
