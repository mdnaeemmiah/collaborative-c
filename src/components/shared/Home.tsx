import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div
        className="relative h-[80vh] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1601597111047-0c1a3b1e9d1b')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Collaborate. Innovate. Succeed.
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Empower your team to work smarter, communicate better, and build
            meaningful results together.
          </p>
          <Link href="/login">
            <button className="mt-6 bg-blue-600 hover:bg-blue-700 transition px-6 py-3 text-white font-semibold rounded-full shadow-lg">
              Get Started
            </button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Why Choose Us?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-2">
              Real-Time Collaboration
            </h3>
            <p className="text-gray-600">
              Work together on tasks, messages, and feedback in real-time—no
              delays, just productivity.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-2">Smart Notifications</h3>
            <p className="text-gray-600">
              Stay updated without distractions. Get relevant alerts about
              tasks, meetings, and updates.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-2">Seamless Integration</h3>
            <p className="text-gray-600">
              Easily connect with your tools—Slack, Notion, GitHub, Google
              Workspace, and more.
            </p>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-blue-100 py-10 text-center">
        <h3 className="text-2xl font-bold mb-3">
          Ready to boost your team productivity?
        </h3>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow">
          Join Now
        </button>
      </div>
    </div>
  );
};

export default Home;
