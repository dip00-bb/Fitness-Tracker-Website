import React, { useContext, } from 'react';
import { AuthContext } from '../Context/AuthContext/AuthContext';
import Loader from '../Utils/Loader';
import { Navigate } from 'react-router';

const TrainerRoute = ({children}) => {

    const {user,userRole,roleLoading}=useContext(AuthContext)

    if( roleLoading || !user ){
      return  <Loader/>
    }

    if(userRole !== "trainer"){
        return <Navigate to='/dashboard/forbidden'>

        </Navigate>
    }

    return children
};

export default TrainerRoute;