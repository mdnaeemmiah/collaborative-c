"use client";

import { useGetNotificationsQuery } from "@/redux/features/notification/notificationSlice";
import React from "react";

interface Notification {
  id: string;
  message: string;
  userId: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
}

const Page = () => {
  const { data, isLoading, isError } = useGetNotificationsQuery(undefined);
  const notifications: Notification[] = data?.data || [];

  if (isLoading) return <p className="p-4">Loading notifications...</p>;
  if (isError) return <p className="p-4 text-red-600">Failed to load notifications.</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Notifications</h2>

      {notifications.length === 0 ? (
        <p className="text-center text-gray-500">No notifications found.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="border rounded-lg shadow-md p-4 hover:shadow-lg transition "
            >
              <h3 className="text-lg font-semibold mb-2 ">
                {notification.message}
              </h3>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">User ID:</span> {notification.userId}
              </p>
              <p className="text-sm mb-1">
                <span className="font-medium">Status:</span>{" "}
                <span
                  className={
                    notification.read ? "text-green-600 font-semibold" : "text-yellow-600 font-semibold"
                  }
                >
                  {notification.read ? "Read" : "Unread"}
                </span>
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Created: {new Date(notification.createdAt).toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">
                Updated: {new Date(notification.updatedAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
