import React, { use, } from 'react';
import { AuthContext } from '../Context/AuthContext/AuthContext';
import Loader from '../Utils/Loader';
import { Navigate } from 'react-router';

const TrainerAndAdminRoute = ({ children }) => {

    const { user, userRole, roleLoading } = use(AuthContext)

    if (roleLoading) {
        <Loader />
    }

    if (!user || userRole !== "admin" && userRole !== "trainer") {
        return <Navigate to='/dashboard/forbidden'>

        </Navigate>
    }

    return children
};

export default TrainerAndAdminRoute;