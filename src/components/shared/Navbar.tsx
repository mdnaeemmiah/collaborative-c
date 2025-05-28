'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Home,
  Bell,
  CheckSquare,
  LogIn,
  LogOut,
  UserCircle
} from 'lucide-react';

const user = {
  isLoggedIn: true,
  name: 'Naeem',
  role: 'admin'
};

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    console.log('User logged out');
    // Add logout logic here
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-md">
      {/* Left Section with Logo and Icons */}
      <div className="flex items-center gap-8 text-gray-700">
        {/* Logo/Brand */}
        <Link href="/" className="text-xl font-bold text-blue-600">
          Collaborative
        </Link>
      </div>

      <div>
        
        {/* Navigation Icons */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-1 hover:text-blue-600">
            <Home size={20} /> Home
          </Link>
          <Link href="/task" className="flex items-center gap-1 hover:text-blue-600">
            <CheckSquare size={20} /> Task
          </Link>
          <Link href="/notification" className="flex items-center gap-1 hover:text-blue-600">
            <Bell size={20} /> Notification
          </Link>
        </div>
      </div>

      {/* Right Side */}
      <div className="relative">
        {!user.isLoggedIn ? (
          <Link
            href="/login"
            className="flex items-center gap-1 text-blue-600 hover:underline"
          >
            <LogIn size={20} /> Login
          </Link>
        ) : (
          <div
            className="flex items-center gap-2 cursor-pointer"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <Image
              src="https://i.pravatar.cc/30"
              alt="avatar"
              width={32}
              height={32}
              className="rounded-full"
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 shadow-md rounded-md border z-50 bg-white">
                <button
                  onClick={() =>
                    user.role === 'admin'
                      ? (window.location.href = '/dashboard/admin')
                      : (window.location.href = '/dashboard/user')
                  }
                  className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
                >
                  <UserCircle size={18} className="mr-2" />
                  Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 hover:bg-gray-100 text-red-600"
                >
                  <LogOut size={18} className="mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
