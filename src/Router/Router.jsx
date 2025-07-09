import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Register from "../Pages/Auth/Register";
import Login from "../Pages/Auth/Login";
import Home from "../Pages/Home/Home";
import BeTrainerForm from "./BeTrainer";
import NewsLetterSubscriber from "../Pages/DashboardPages/Admin/NewsLetterSubscriber";
import DashboardLayout from "../Pages/DashboardPages/DashboardHome/Dashboard";


export const router = createBrowserRouter([

    {
        path: '/',
        Component: MainLayout,
        children: [
            {
                path:'/',
                Component:Home
            },
            {
                path: '/register',
                Component: Register
            },
            {
                path: '/login',
                Component: Login
            },

            {
                path:'/beATrainer',
                Component:BeTrainerForm
            }
        ]
    },
    {
        path:'/dashboard',
        Component:DashboardLayout,
        children:[
            {
                path:'all-newsletters',
                Component:NewsLetterSubscriber
            }
        ]
    }

])