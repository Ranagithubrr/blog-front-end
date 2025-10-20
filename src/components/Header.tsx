import React from "react";
import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";

const Header = () => {
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();
  const logoutUser = () => {
    logout();
    router.push("/login");
  }
  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-gray-900">
          MyBlog<span className="text-blue-600">.</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
          <Link href="/" className="hover:text-blue-600 transition">Home</Link>
          <Link href="/posts" className="hover:text-blue-600 transition">Posts</Link>
          <Link href="/about" className="hover:text-blue-600 transition">About</Link>
        </nav>

        {/* Login button */}
        {
          !isLoggedIn ?

            <Link
              href="/login"
              className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Login
            </Link>
            : <button
              onClick={logoutUser}
              className="cursor-pointer ml-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
            >
              Logout
            </button>
        }

        {/* Mobile menu placeholder */}
        <button className="md:hidden text-gray-700 hover:text-blue-600">
          ☰
        </button>
      </div>
    </header>
  );
};

export default Header;
