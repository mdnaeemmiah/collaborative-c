/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useCreateNotificationMutation } from "@/redux/features/notification/notificationSlice";
import { useGetUsersQuery } from "@/redux/features/user/userSlice";
import toast, { Toaster } from "react-hot-toast";

const AddNotificationPage = () => {
  const [createNotification, { isLoading }] = useCreateNotificationMutation();
  const { data: users, isLoading: userLoading } = useGetUsersQuery(undefined);

  const [formData, setFormData] = useState({
    message: "",
    userId: "",
    read: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const notificationData = {
        message: formData.message,
        userId: formData.userId,
        read: formData.read,
      };

      await createNotification(notificationData).unwrap();
      toast.success("Notification created successfully!");

      setFormData({
        message: "",
        userId: "",
        read: false,
      });
    } catch (error) {
      toast.error("Failed to create notification!");
      console.error("Notification creation error:", error);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto border-2">
      <Toaster />
      <h2 className="text-2xl font-bold mb-4">Add Notification</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={3}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Assign to User</label>
          <select
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option className="bg-black" value="">Select a user</option>
            {userLoading ? (
              <option disabled>Loading users...</option>
            ) : (
              users?.data?.map((user: any) => (
                <option className="bg-black" key={user._id} value={user._id}>
                  {user.name ? `${user.name} (${user._id})` : user._id}
                </option>
              ))
            )}
          </select>
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
          disabled={isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {isLoading ? "Creating..." : "Create Notification"}
        </button>
      </form>
    </div>
  );
};

export default AddNotificationPage;
