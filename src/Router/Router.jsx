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
import AddForum from "../Pages/DashboardPages/Admin/AddForum";
import Forums from "../Pages/Fourms/Fourms";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Forbidden from "../Pages/Forbidden/Forbidden";
import AdminRoute from "../PrivateRoute/AdminRoute";
import TrainerRoute from "../PrivateRoute/TrainerRoute";
import MemberRoute from "../PrivateRoute/MemberRoute";
import BookedTrainer from "../Pages/DashboardPages/Members/BookedTrainer";


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
                element: <PrivateRoute><BeTrainerForm /></PrivateRoute>
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
                element: <PrivateRoute> <BookTrainer /> </PrivateRoute>

            },
            {
                path: '/payment-page',
                element: <PrivateRoute><Payments /></PrivateRoute>
            },

            {
                path: '/posts',
                Component: Forums
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute> <DashboardLayout /></PrivateRoute>,
        children: [




            // admin 

            {
                path: 'all-newsletters',
                element: <AdminRoute> <NewsLetterSubscriber /> </AdminRoute>
            },
            {
                path: 'pending-trainers',
                element: <AdminRoute> <AllPendingTrainer /> </AdminRoute>
            },
            {
                path: 'pending-trainers/trainers-details/:id',
                element: <AdminRoute> <TrainerDetails /> </AdminRoute>
            },
            {
                path: 'add-class',
                element: <AdminRoute> <AddClass /> </AdminRoute>
            },
            {
                path: 'all-trainers-list',
                element: <AdminRoute> <ManageTrainer /> </AdminRoute>
            },

            {
                path: 'add-forums',
                Component: AddForum
            },



            // Trainer

            {
                path: 'manage-slots',
                element: <TrainerRoute> <ManageSlot /> </TrainerRoute>,
                loader: () => fetch('http://localhost:5000/admin-classes')

            },

            {
                path: 'add-new-slot',
                element: <TrainerRoute> <AddNewSlot /> </TrainerRoute>,
            },

            // member 

            {
                path: 'activity-log',
                element: <MemberRoute> <ActivityLog /> </MemberRoute>,
            },

            {
                path: 'profile',
                element: <MemberRoute> <Profile /> </MemberRoute>,
            },

            {
                path:'booked-trainer',
                element:<MemberRoute> <BookedTrainer /> </MemberRoute>,
            },


            // forbidden

            {
                path: 'forbidden',
                Component: Forbidden
            },
        ]
    }

])