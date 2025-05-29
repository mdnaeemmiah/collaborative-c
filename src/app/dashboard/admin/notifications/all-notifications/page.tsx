"use client";

import React, { useState, useEffect } from "react";
import {
  useGetNotificationsQuery,
  useDeleteNotificationMutation,
  useUpdateNotificationMutation,
} from "@/redux/features/notification/notificationSlice";
import { Trash2, Edit2, X } from "lucide-react";

interface Notification {
  id: string;
  message: string;
  userId: string;
  read: boolean;
  createdAt: string;
}

const NotificationPage = () => {
  const { data, isLoading, isError } = useGetNotificationsQuery(undefined);
  const [deleteNotification] = useDeleteNotificationMutation();
  const [updateNotification] = useUpdateNotificationMutation();

  const notifications: Notification[] = data?.data || [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNotification, setEditingNotification] = useState<Notification | null>(null);
  const [formData, setFormData] = useState({
    message: "",
    read: false,
  });

  useEffect(() => {
    if (editingNotification) {
      setFormData({
        message: editingNotification.message,
        read: editingNotification.read,
      });
    }
  }, [editingNotification]);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this notification?")) {
      try {
        await deleteNotification(id).unwrap();
        alert("Notification deleted");
      } catch (error) {
        console.error("Failed to delete notification", error);
      }
    }
  };

  const openModal = (notification: Notification) => {
    setEditingNotification(notification);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingNotification(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    const { name, value, type } = target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (target as HTMLInputElement).checked : value,
    }));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNotification) return;

    try {
      await updateNotification({
        id: editingNotification.id,
        body: {
          message: formData.message,
          read: formData.read,
        },
      }).unwrap();
      alert("Notification updated successfully");
      closeModal();
    } catch (error) {
      console.error("Failed to update notification", error);
      alert("Update failed");
    }
  };

  if (isLoading) return <p>Loading notifications...</p>;
  if (isError) return <p>Failed to load notifications.</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Notifications</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="px-4 py-2 border">Message</th>
              <th className="px-4 py-2 border">User ID</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Created At</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <tr key={notification.id} className="text-center">
                  <td className="px-4 py-2 border">{notification.message}</td>
                  <td className="px-4 py-2 border">{notification.userId}</td>
                  <td className="px-4 py-2 border">
                    {notification.read ? "Read" : "Unread"}
                  </td>
                  <td className="px-4 py-2 border">
                    {new Date(notification.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 border space-x-2">
                    <button
                      onClick={() => openModal(notification)}
                      className="text-blue-500 hover:text-blue-700"
                      title="Edit Notification"
                    >
                      <Edit2 className="w-5 h-5 inline" />
                    </button>
                    <button
                      onClick={() => handleDelete(notification.id)}
                      className="text-red-500 hover:text-red-700"
                      title="Delete Notification"
                    >
                      <Trash2 className="w-5 h-5 inline" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-2 text-center text-gray-500">
                  No notifications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="border-2 rounded p-6 w-full max-w-md  relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              title="Close"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-lg font-semibold mb-4">Edit Notification</h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              {editingNotification && (
                <div>
                  <label className="block mb-1 font-medium">User ID</label>
                  <input
                    type="text"
                    value={editingNotification.userId}
                    disabled
                    className="w-full border border-gray-300 rounded px-3 py-2  cursor-not-allowed"
                  />
                </div>
              )}
              <div>
                <label className="block mb-1 font-medium">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="read"
                  checked={formData.read}
                  onChange={handleChange}
                />
                <label className="font-medium">Mark as Read</label>
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Update Notification
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationPage;
