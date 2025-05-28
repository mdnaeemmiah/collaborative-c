"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Home,
  Bell,
  CheckSquare,
  LogIn,
  LogOut,
  UserCircle,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import img1 from "../../assets/images/avatar.jpg";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Successfully logged out!");
    setTimeout(() => {
      router.push("/login");
    }, 1500);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full shadow-md px-4 py-3 bg-white">
      <div className="flex flex-wrap items-center justify-between max-w-7xl mx-auto">
        {/* Left: Logo */}
        <Link href="/" className="text-xl font-bold text-blue-600 cursor-pointer">
          Collaborative
        </Link>

        {/* Center: Navigation */}
        <div className="flex items-center gap-4 flex-wrap text-gray-700 mt-2 sm:mt-0">
          <Link href="/" className="flex items-center gap-1 hover:text-blue-600 cursor-pointer">
            <Home size={20} /> Home
          </Link>
          <Link href="/task" className="flex items-center gap-1 hover:text-blue-600 cursor-pointer">
            <CheckSquare size={20} /> Task
          </Link>
          <Link href="/notification" className="flex items-center gap-1 hover:text-blue-600 cursor-pointer">
            <Bell size={20} /> Notification
          </Link>
        </div>

        {/* Right: Auth Section */}
        <div className="relative mt-2 sm:mt-0" ref={dropdownRef}>
          {!user ? (
            <Link href="/login" className="flex items-center gap-1 text-blue-600 hover:underline cursor-pointer">
              <LogIn size={20} /> Login
            </Link>
          ) : (
            <div className="relative flex items-center gap-2 cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>
              {/* Avatar */}
              <Image
                src={img1}
                alt="avatar"
                width={32}
                height={32}
                className="rounded-full object-cover"
              />

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-40 shadow-lg rounded-md border z-50 ">
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      if (user.role === "admin") {
                        router.push("/dashboard/admin");
                      } else {
                        router.push("/dashboard/user");
                      }
                    }}
                    className="flex items-center w-full px-4 py-2 hover:bg-gray-500 cursor-pointer"
                  >
                    <UserCircle size={18} className="mr-2" />
                    Dashboard
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 hover:bg-gray-500 text-red-600 cursor-pointer"
                  >
                    <LogOut size={18} className="mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
