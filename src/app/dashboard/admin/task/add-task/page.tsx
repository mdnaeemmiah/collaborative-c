"use client";

import React, { useState } from "react";
import { useCreateTaskMutation } from "@/redux/features/task/taskSlice";
import toast, { Toaster } from "react-hot-toast";
import { useGetUsersQuery } from "@/redux/features/user/userSlice";

const AddTaskPage = () => {
  const [createTask, { isLoading }] = useCreateTaskMutation();
  const {data}  =useGetUsersQuery(undefined);

  console.log(data,"data from users");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedTo: "",
    status: "",
    dueDate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const taskData = {
        title: formData.title,
        description: formData.description,
        assignedTo: formData.assignedTo, // must be a valid user ID
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
          <label className="block font-medium mb-1">Assigned To (User ID)</label>
          <input
            type="text"
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
            required
            placeholder="e.g., 683610ee85d14a7116eaa13d"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
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
