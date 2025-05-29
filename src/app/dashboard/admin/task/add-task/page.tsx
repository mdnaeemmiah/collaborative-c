/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useCreateTaskMutation } from "@/redux/features/task/taskSlice";
import toast, { Toaster } from "react-hot-toast";
import { useGetUsersQuery } from "@/redux/features/user/userSlice";

const AddTaskPage = () => {
  const [createTask, { isLoading }] = useCreateTaskMutation();
  const { data: users, isLoading: userLoading } = useGetUsersQuery(undefined);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedTo: "",
    status: "",
    dueDate: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const taskData = {
        title: formData.title,
        description: formData.description,
        assignedTo: formData.assignedTo,
        status: formData.status,
        dueDate: formData.dueDate,
      };

      await createTask(taskData).unwrap();
      toast.success("Task created successfully!");

      setFormData({
        title: "",
        description: "",
        assignedTo: "",
        status: "",
        dueDate: "",
      });
    } catch (error) {
      toast.error("Failed to create task!");
      console.error("Task creation error:", error);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto border-2">
      <Toaster />
      <h2 className="text-2xl font-bold mb-4">Add Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={3}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Assign to User</label>
          <select
            name="assignedTo"
            value={formData.assignedTo}
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

        <div>
          <label className="block font-medium mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option className="bg-black" value="">Select status</option>
            <option className="bg-black" value="pending">Pending</option>
            <option className="bg-black" value="in_progress">In Progress</option>
            <option className="bg-black" value="completed">Completed</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {isLoading ? "Creating..." : "Create Task"}
        </button>
      </form>
    </div>
  );
};

export default AddTaskPage;
