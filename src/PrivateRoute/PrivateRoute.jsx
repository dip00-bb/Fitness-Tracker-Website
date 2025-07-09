import React, { use } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Navigate, useLocation } from 'react-router';
import Loader from '../Loader/Loader';

const PrivateRoute = ({children}) => {
    const {user,isLoading}=use(AuthContext);

    const location=useLocation();

    if(isLoading){
        return <Loader></Loader>
    }

    if(user && user?.email){
        return children
    }else {
        return <Navigate state={location.pathname} to='/login'></Navigate>
    }
};

export default PrivateRoute;