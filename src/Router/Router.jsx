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
import AdminBalance from "../Pages/DashboardPages/Admin/AdminBalance";
import NotFoundPage from "../Pages/NotFound/NotFound";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import TrainerAndAdminRoute from "../PrivateRoute/TrainerAndAdminRoute";
import LatestPostDetails from "../Pages/Home/LatestPostDetails";
import WellcomePage from "../Pages/DashboardPages/WelcomePage/WellcomePage";




export const router = createBrowserRouter([

    {
        path: '/',
        Component: MainLayout,
        children: [
            {
                path: '/',
                Component: Home,
                errorElement: <ErrorPage></ErrorPage>
            },
            {
                path: '/register',
                Component: Register,
                errorElement: <ErrorPage></ErrorPage>
            },
            {
                path: '/login',
                Component: Login,
                errorElement: <ErrorPage></ErrorPage>
            },

            {
                path: '/beATrainer',
                element: <PrivateRoute><BeTrainerForm /></PrivateRoute>,
                errorElement: <ErrorPage></ErrorPage>
            },

            {
                path: '/all-trainers',
                Component: TrainerSection,
                errorElement: <ErrorPage></ErrorPage>
            },
            {
                path: '/trainer-details/:id',
                Component: ApprovedTrainerDetails,
                errorElement: <ErrorPage></ErrorPage>
            },
            {
                path: '/all-classes',
                Component: AllClasses,
                errorElement: <ErrorPage></ErrorPage>
            },
            {
                path: '/book-trainer/:id',
                element: <PrivateRoute> <BookTrainer /> </PrivateRoute>,
                errorElement: <ErrorPage></ErrorPage>

            },
            {
                path: '/payment-page',
                element: <PrivateRoute><Payments /></PrivateRoute>,
                errorElement: <ErrorPage></ErrorPage>
            },

            {
                path: '/posts',
                Component: Forums,
                errorElement: <ErrorPage></ErrorPage>
            },
            {
                path: '/forums-details/:id',
                Component: LatestPostDetails,
                errorElement: <ErrorPage></ErrorPage>
            },
            {
                path: 'user-profile',
                element: <Profile />,
                errorElement: <ErrorPage></ErrorPage>
            },
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute> <DashboardLayout /></PrivateRoute>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [


            // {
            //     index:true,
            //     element: <div>Welcome</div>
            // },

            // admin 
            {
                path: 'user-welcome-page',
                element: <WellcomePage />
            },

            {
                path: 'admin-welcome-page',
                element: <WellcomePage />
            }
            ,
            {
                path: 'trainer-welcome-page',
                element: <WellcomePage />
            }
            ,
            {
                path: 'all-newsletters',
                element: <AdminRoute> <NewsLetterSubscriber /> </AdminRoute>,
                errorElement: <ErrorPage></ErrorPage>
            },
            {
                path: 'pending-trainers',
                element: <AdminRoute> <AllPendingTrainer /> </AdminRoute>,
                errorElement: <ErrorPage></ErrorPage>
            },
            {
                path: 'pending-trainers/trainers-details/:id',
                element: <AdminRoute> <TrainerDetails /> </AdminRoute>,
                errorElement: <ErrorPage></ErrorPage>
            },
            {
                path: 'add-class',
                element: <AdminRoute> <AddClass /> </AdminRoute>,
                errorElement: <ErrorPage></ErrorPage>
            },
            {
                path: 'all-trainers-list',
                element: <AdminRoute> <ManageTrainer /> </AdminRoute>,
                errorElement: <ErrorPage></ErrorPage>
            },
            {
                path: 'balance',
                element: <AdminRoute> <AdminBalance /> </AdminRoute>,
                errorElement: <ErrorPage></ErrorPage>
            },

            {
                path: 'add-forums',
                element: <TrainerAndAdminRoute> <AddForum /> </TrainerAndAdminRoute>,
                errorElement: <ErrorPage></ErrorPage>
            },



            // Trainer

            {
                path: 'manage-slots',
                element: <TrainerRoute> <ManageSlot /> </TrainerRoute>,
                loader: () => fetch('https://fitnessserver-vert.vercel.app/admin-classes'),
                errorElement: <ErrorPage></ErrorPage>

            },

            {
                path: 'add-new-slot',
                element: <TrainerRoute> <AddNewSlot /> </TrainerRoute>,
                errorElement: <ErrorPage></ErrorPage>
            },

            // member 

            {
                path: 'activity-log',
                element: <MemberRoute> <ActivityLog /> </MemberRoute>,
                errorElement: <ErrorPage></ErrorPage>
            },

            {
                path: 'profile',
                element: <MemberRoute> <Profile /> </MemberRoute>,
                errorElement: <ErrorPage></ErrorPage>
            },

            {
                path: 'booked-trainer',
                element: <MemberRoute> <BookedTrainer /> </MemberRoute>,
                errorElement: <ErrorPage></ErrorPage>
            },


            // forbidden

            {
                path: 'forbidden',
                Component: Forbidden
            },
        ]
    },
    {
        path: '*',
        Component: NotFoundPage

    }

])