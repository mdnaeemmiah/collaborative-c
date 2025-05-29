"use client";

import { useGetTasksQuery } from "@/redux/features/task/taskSlice";
import React from "react";

interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  status: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

const Page = () => {
  const { data, isLoading, isError } = useGetTasksQuery(undefined);

  const tasks: Task[] = data?.data || [];

  if (isLoading) return <p>Loading tasks...</p>;
  if (isError) return <p>Failed to load tasks.</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Tasks</h1>

      {tasks.length === 0 ? (
        <p className="text-center">No tasks found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="border rounded-lg shadow p-5  hover:shadow-lg transition duration-200"
            >
              <h2 className="text-xl font-semibold mb-2">{task.title}</h2>
              <p className="text-gray-700 mb-2">{task.description}</p>
              <p>
                <span className="font-medium">Assigned To:</span> {task.assignedTo}
              </p>
              <p>
                <span className="font-medium">Status:</span>{" "}
                <span
                  className={
                    task.status === "completed"
                      ? "text-green-600"
                      : task.status === "in_progress"
                      ? "text-yellow-600"
                      : "text-gray-600"
                  }
                >
                  {task.status.replace("_", " ")}
                </span>
              </p>
              <p>
                <span className="font-medium">Due Date:</span>{" "}
                {new Date(task.dueDate).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Created: {new Date(task.createdAt).toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">
                Updated: {new Date(task.updatedAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
