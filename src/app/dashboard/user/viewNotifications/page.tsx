import { useGetNotificationsQuery } from '@/redux/features/notification/notificationSlice';
import { useGetUsersQuery } from '@/redux/features/user/userSlice';
import React from 'react';

const page = () => {
    const {data}  =useGetNotificationsQuery(undefined)
    const {}  =useGetUsersQuery(undefined);

    return (
        <div>
            <h2>notifications</h2>
        </div>
    );
};

export default page;