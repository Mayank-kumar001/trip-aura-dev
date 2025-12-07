import React from "react";

const AuthLayout = ({ children, title, subtitle }) => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fcfbfc] px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <h1 className="text-3xl font-bold text-center text-[#875cf5] font-poppins mb-2">{title}</h1>
            {subtitle && <p className="text-center text-gray-500 mb-6 font-poppins">{subtitle}</p>}
            {children}
        </div>
    </div>
);

export default AuthLayout;
