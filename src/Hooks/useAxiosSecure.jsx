import axios from 'axios';
import React, { use } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../Context/AuthContext/AuthContext';

const axiosSecure = axios.create({
    baseURL: `https://fitnessserver-vert.vercel.app`
});


const useAxiosSecure = () => {

    const navigate = useNavigate()

    const {signout } = use(AuthContext)

    axiosSecure.interceptors.request.use(config => {
        const token = localStorage.getItem('access-token');
        config.headers.Authorization = `Bearer ${token}`

        return config;
    }, error => {
        return Promise.reject(error)
    })

    axiosSecure.interceptors.response.use(res => {
        return res;
    }, error => {
        const status = error.status;

        if (status === 403) {
            navigate('/dashboard/forbidden')
        } else if (status == 401) {
            signout().then(() => {
                navigate('/login')
            }).catch(() => {

            })

        }

        return Promise.reject(error);


    })

    return axiosSecure;
};

export default useAxiosSecure;