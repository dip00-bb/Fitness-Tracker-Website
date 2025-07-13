import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Register from "../Pages/Auth/Register";
import Login from "../Pages/Auth/Login";
import Home from "../Pages/Home/Home";
import BeTrainerForm from "./BeTrainer";
import NewsLetterSubscriber from "../Pages/DashboardPages/Admin/NewsLetterSubscriber";
import DashboardLayout from "../Pages/DashboardPages/DashboardHome/Dashboard";
import AllPendingTrainer from "../Pages/DashboardPages/Admin/AllPendingTrainer";
import TrainerDetails from "../Pages/DashboardPages/Admin/TrainerDetails";
import TrainerSection from "../Pages/Trainers/AllTrainers";
import ApprovedTrainerDetails from "../Pages/Trainers/ApprovedTrainerDetails";
import AddClass from "../Pages/DashboardPages/Admin/AddClass";
import AllClasses from "../Pages/Classes/AllClasses";
import ManageTrainer from "../Pages/DashboardPages/Admin/ManageTrainer";
import ManageSlot from "../Pages/DashboardPages/Trainer/ManageSlot";
import AddNewSlot from "../Pages/DashboardPages/Trainer/AddNewSlot";
import BookTrainer from "../Pages/Trainers/BookTrainer";
import Payments from "../Pages/Payment/Payments";
import Profile from "../Pages/DashboardPages/Members/Profile";
import ActivityLog from "../Pages/DashboardPages/Members/ActivityLog";


export const router = createBrowserRouter([

    {
        path: '/',
        Component: MainLayout,
        children: [
            {
                path: '/',
                Component: Home
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
                path: '/beATrainer',
                Component: BeTrainerForm
            },

            {
                path: '/all-trainers',
                Component: TrainerSection
            },
            {
                path: '/trainer-details/:id',
                Component: ApprovedTrainerDetails
            },
            {
                path: '/all-classes',
                Component: AllClasses
            },
            {
                path: '/book-trainer/:id',
                Component:BookTrainer

            },
            {
                path:'/payment-page',
                Component:Payments
            },
        ]
    },
    {
        path: '/dashboard',
        Component: DashboardLayout,
        children: [

            // admin 

            {
                path: 'all-newsletters',
                Component: NewsLetterSubscriber
            },
            {
                path: 'pending-trainers',
                Component: AllPendingTrainer
            },
            {
                path: 'pending-trainers/trainers-details/:id',
                Component: TrainerDetails
            },
            {
                path: 'add-class',
                Component: AddClass
            },
            {
                path: 'all-trainers-list',
                Component: ManageTrainer
            },



            // Trainer

            {
                path: 'manage-slots',
                Component: ManageSlot,
                loader:()=>fetch('http://localhost:5000/admin-classes')

            },

            {
                path: 'add-new-slot',
                Component: AddNewSlot
            },

            // member 

            {
                path:'activity-log',
                Component:ActivityLog
            },

            {
                path:'profile',
                Component:Profile
            }

        ]
    }

])