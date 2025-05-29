"use client";

import { useGetNotificationsQuery } from '@/redux/features/notification/notificationSlice';
import { useGetUsersQuery } from '@/redux/features/user/userSlice';
import React from 'react';

interface Notification {
  id: string;
  message: string;
  userId: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
}

interface User {
  id: string;
  name?: string;
  email?: string;
  // Add other user properties if available
}

const Page: React.FC = () => {
  const { data: notificationsData, isLoading: isLoadingNotifications, isError: isErrorNotifications } = useGetNotificationsQuery(undefined);
  const { data: usersData, isLoading: isLoadingUsers, isError: isErrorUsers } = useGetUsersQuery(undefined);

  if (isLoadingNotifications || isLoadingUsers) return <p className="p-4">Loading...</p>;
  if (isErrorNotifications || isErrorUsers) return <p className="p-4 text-red-600">Failed to load data.</p>;

  const notifications: Notification[] = notificationsData?.data || [];
  const users: User[] = usersData?.data || [];

  const userMap = new Map(users.map(user => [user.id, user]));

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Notifications</h2>

      {notifications.length === 0 ? (
        <p>No notifications found.</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map(notification => {
            const user = userMap.get(notification.userId);

            return (
              <li key={notification.id} className="border rounded p-4 shadow-sm hover:shadow-md transition">
                <p><strong>Message:</strong> {notification.message}</p>
                <p><strong>User:</strong> {user ? user.name || user.email || user.id : "Unknown User"}</p>
                <p><strong>Status:</strong> {notification.read ? "Read" : "Unread"}</p>
                <p><small>Created: {new Date(notification.createdAt).toLocaleString()}</small></p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Page;
