import React from 'react';
import PublicLayout from '../layout/PublicLayout';
import SignUpUser from '../pages/SignUpUser';
import SignInUser from '../pages/SignInUser';
import PageNotFound from '../pages/PageNotFound'; // Import your PageNotFound component

const PublicRoutes = [
    {
        path: "/",
        element: <PublicLayout><SignUpUser userType='user' /></PublicLayout>
    },
    {
        path: "/admin-signup",
        element: <PublicLayout><SignUpUser userType='admin' /></PublicLayout>
    },
    {
        path: "/user-login",
        element: <PublicLayout><SignInUser userType="user" /></PublicLayout>
    },
    {
        path: "/admin-login",
        element: <PublicLayout><SignInUser userType="admin" /></PublicLayout>
    },
    {
        path: "*", // This acts as a catch-all route for undefined paths
        element: <PublicLayout><PageNotFound /></PublicLayout>
    }
];

export default PublicRoutes;
