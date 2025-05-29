import { baseApi } from "../../api/baseApi";

const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create a new notification
    createNotification: builder.mutation({
      query: (notificationData) => ({
        url: "/notification/create",
        method: "POST",
        body: notificationData,
      }),
      invalidatesTags: ["Notification"],
    }),

    // Get all notifications
    getNotifications: builder.query({
      query: () => ({
        url: "/notification",
        method: "GET",
      }),
      providesTags: ["Notification"],
    }),

    // Get a single notification by ID
    getSingleNotification: builder.query({
      query: (notificationId: string) => ({
        url: `/notification/${notificationId}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Notification", id }],
    }),

    // Update a notification
    updateNotification: builder.mutation({
      query: ({ id, body }) => ({
        url: `/notification/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Notification"],
    }),

    // Delete a notification
    deleteNotification: builder.mutation({
      query: (notificationId: string) => ({
        url: `/notification/${notificationId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notification"],
    }),
  }),
});

export const {
  useCreateNotificationMutation,
  useGetNotificationsQuery,
  useGetSingleNotificationQuery,
  useUpdateNotificationMutation,
  useDeleteNotificationMutation,
} = notificationApi;
