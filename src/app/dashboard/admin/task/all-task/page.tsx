/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import {
  useGetTasksQuery,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "@/redux/features/task/taskSlice";
import { Trash2, Edit } from "lucide-react";

const Page = () => {
  const { data, isLoading, isError } = useGetTasksQuery(undefined);
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  const tasks = data?.data || [];

  // Modal state
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<any>(null);

  // Open modal and set current task
  const openEditModal = (task: any) => {
    setEditingTask({
      ...task,
      dueDate: task.dueDate ? task.dueDate.slice(0, 10) : "", // format for input type=date
    });
    setModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setModalOpen(false);
    setEditingTask(null);
  };

  // Handle form change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditingTask((prev: any) => ({ ...prev, [name]: value }));
  };

  // Submit updated task
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTask) return;

    // Optional: basic validation
    if (!editingTask.title.trim()) {
      alert("Title is required");
      return;
    }

    try {
      await updateTask({
        id: editingTask._id,
        data: {
          title: editingTask.title,
          description: editingTask.description,
          status: editingTask.status,
          dueDate: editingTask.dueDate,
        },
      }).unwrap();
      alert("Task updated successfully");
      closeModal();
    } catch (err) {
      console.error("Failed to update task", err);
      alert("Failed to update task");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(id).unwrap();
        alert("Task deleted successfully");
      } catch (error) {
        console.error("Failed to delete task:", error);
      }
    }
  };

  if (isLoading) return <p>Loading tasks...</p>;
  if (isError) return <p>Failed to load tasks.</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Tasks</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full  border border-gray-300">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="px-4 py-2 border">Title</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Due Date</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task: any) => (
                <tr key={task._id} className="text-center">
                  <td className="px-4 py-2 border">{task.title}</td>
                  <td className="px-4 py-2 border">{task.description}</td>
                  <td className="px-4 py-2 border capitalize">{task.status}</td>
                  <td className="px-4 py-2 border">
                    {new Date(task.dueDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border flex justify-center gap-2">
                    <button
                      onClick={() => openEditModal(task)}
                      className="text-blue-500 hover:text-blue-700"
                      title="Edit Task"
                    >
                      <Edit className="w-5 h-5 inline" />
                    </button>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="text-red-500 hover:text-red-700"
                      title="Delete Task"
                    >
                      <Trash2 className="w-5 h-5 inline" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-2 text-center text-gray-500">
                  No tasks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && editingTask && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className=" border-2 rounded-lg p-6 w-full max-w-md shadow-lg relative">
            <h3 className="text-lg font-semibold mb-4">Edit Task</h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label htmlFor="title" className="block font-medium mb-1">
                  Title
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={editingTask.title}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block font-medium mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={editingTask.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>

              <div>
                <label htmlFor="status" className="block font-medium mb-1">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={editingTask.status}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option className="bg-black" value="pending">Pending</option>
                  <option className="bg-black" value="in_progress">In Progress</option>
                  <option className="bg-black" value="completed">Completed</option>
                </select>
              </div>

              <div>
                <label htmlFor="dueDate" className="block font-medium mb-1">
                  Due Date
                </label>
                <input
                  id="dueDate"
                  name="dueDate"
                  type="date"
                  value={editingTask.dueDate}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
