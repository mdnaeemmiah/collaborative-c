"use client";

import React from "react";
import { useGetTasksQuery, useDeleteTaskMutation ,useUpdateTaskMutation} from "@/redux/features/task/taskSlice";
import { Trash2 } from "lucide-react";

const Page = () => {
  const { data, isLoading, isError } = useGetTasksQuery(undefined);
  const [deleteTask] = useDeleteTaskMutation();
  console.log(data,"data from getTasksQuery");

  // Adjust here based on your data structure:
  const tasks = data?.data || [];

  React.useEffect(() => {
    console.log("Tasks data:", data);
  }, [data]);

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
            <tr className="bg-gray-700">
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
                  <td className="px-4 py-2 border">
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
    </div>
  );
};

export default Page;
