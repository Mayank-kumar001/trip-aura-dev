import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";

const initialForm = {
    username: "",
    email: "",
    password: "",
    dob: "",
    showPassword: false,
};

const Signup = () => {
    const [form, setForm] = useState(initialForm);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleTogglePassword = () =>
        setForm((prev) => ({ ...prev, showPassword: !prev.showPassword }));

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Signup submitted!");
        console.log(form);
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
                    name="dob"
                    value={form.dob}
                    onChange={handleChange}
                    className="border rounded-lg px-4 py-2 font-poppins focus:outline-none focus:ring-2 focus:ring-[#875cf5]"
                    max={new Date().toISOString().split("T")[0]}
                    required
                />

                {/* Password with show/hide */}
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
            </form>

            {/* Bottom Redirect */}
            <div className="text-sm text-center text-gray-600 mt-4">
                Already have an account?{" "}
                <Link
                    to="/auth/login"
                    className="text-[#875cf5] hover:underline font-medium"
                >
                    Login here
                </Link>
            </div>
        </AuthLayout>
    );
};

export default Signup;
