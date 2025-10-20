import React from "react";

const Footer = () => {
    return (
        <footer className="w-full bg-gray-900 text-gray-300 py-6 mt-10">
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Logo / Site name */}
                <h2 className="text-xl font-semibold text-white">
                    MyBlog<span className="text-blue-500">.</span>
                </h2>

                {/* Navigation Links */}
                <nav className="flex gap-6 text-sm">
                    <a href="#" className="hover:text-blue-400 transition">Home</a>
                    <a href="#" className="hover:text-blue-400 transition">Posts</a>
                    <a href="#" className="hover:text-blue-400 transition">About</a>
                    <a href="#" className="hover:text-blue-400 transition">Contact</a>
                </nav>

                {/* Copyright */}
                <p className="text-sm text-gray-400">
                    © {new Date().getFullYear()} MyBlog. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
