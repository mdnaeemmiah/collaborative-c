"use client";

import { useGetTasksQuery } from '@/redux/features/task/taskSlice';
import { useGetUsersQuery } from '@/redux/features/user/userSlice';
import React from 'react';

interface Task {
  _id: string;
  title: string;
  description: string;
  assignedTo: string;
  status: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
}

const Page: React.FC = () => {
  const { data: tasksData, isLoading: isLoadingTasks, isError: isErrorTasks } = useGetTasksQuery(undefined);
  const { data: usersData, isLoading: isLoadingUsers, isError: isErrorUsers } = useGetUsersQuery(undefined);

  if (isLoadingTasks || isLoadingUsers) return <p>Loading...</p>;
  if (isErrorTasks || isErrorUsers) return <p className="text-red-600">Failed to load data.</p>;

  const tasks: Task[] = tasksData?.data || [];
  const users: User[] = usersData?.data || [];

  // Create a set of valid user _ids for quick lookup
  const userIds = new Set(users.map(user => user._id));

  // Filter tasks where assignedTo matches a valid user _id
  const filteredTasks = tasks.filter(task => userIds.has(task.assignedTo));

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Tasks Assigned to Users</h2>

      {filteredTasks.length === 0 ? (
        <p>No tasks assigned to valid users found.</p>
      ) : (
        filteredTasks.map(task => {
          const assignedUser = users.find(user => user._id === task.assignedTo);

          return (
            <div
              key={task._id}
              className="border rounded p-4 mb-4 shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-2">{task.title}</h3>
              <p className="mb-1">{task.description}</p>
              <p>
                <strong>Assigned To:</strong>{" "}
                {assignedUser ? assignedUser.name || assignedUser.email || assignedUser._id : "Unknown User"}
              </p>
              <p><strong>Status:</strong> {task.status.replace("_", " ")}</p>
              <p><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Page;
