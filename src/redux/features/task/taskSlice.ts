import { baseApi } from "../../api/baseApi";

const taskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create a new task
    createTask: builder.mutation({
      query: (taskData) => ({
        url: "/task/create",
        method: "POST",
        body: taskData,
      }),
      invalidatesTags: ["Task"],
    }),

    // Get all tasks
    getTasks: builder.query({
      query: () => ({
        url: "/task",
        method: "GET",
      }),
      providesTags: ["Task"],
    }),

    // Get a single task by ID
    getSingleTask: builder.query({
      query: (taskId: string) => ({
        url: `/task/${taskId}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Task", id }],
    }),

    // Update a task
    updateTask: builder.mutation({
      query: ({ id, body }) => ({
        url: `/task/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Task"],
    }),

    // Delete a task
    deleteTask: builder.mutation({
      query: (taskId: string) => ({
        url: `/task/${taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),
  }),
});

export const {
  useCreateTaskMutation,
  useGetTasksQuery,
  useGetSingleTaskQuery,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = taskApi;
