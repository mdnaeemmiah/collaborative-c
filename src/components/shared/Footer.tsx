import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className=" text-white py-8">
      <div className="container mx-auto justify-evenly px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* Column 1: About */}
        <div>
          <h3 className="text-lg font-semibold mb-4">About Us</h3>
          <p className="text-sm text-gray-400">
            Collaborative is a task management platform that helps teams stay organized and productive.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/task" className="hover:underline">Tasks</Link></li>
            <li><Link href="/notification" className="hover:underline">Notifications</Link></li>
            <li><Link href="/login" className="hover:underline">Login</Link></li>
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <p className="text-sm text-gray-400">Email: support@collaborative.com</p>
          <p className="text-sm text-gray-400">Phone: +880 123 456 7890</p>
          <p className="text-sm text-gray-400">Dhaka, Bangladesh</p>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Collaborative. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
