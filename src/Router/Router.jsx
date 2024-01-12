import { createBrowserRouter } from 'react-router-dom';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';
import Dashboard from '../Pages/Dashboard/Dashboard';
import PrivateRoute from './PrivateRoute';
import ProjectManagement from '../Pages/ProjectManagement/ProjectManagement';
import Test from '../Pages/Test/Test';
import Check from '../Pages/Test/Check';
import UserProfile from '../Pages/Dashboard/userProfile/userProfile';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home></Home>
    },
    {
        path: "/register",
        element: <Register></Register>
    },
    {
        path: "/test",
        element: <Check></Check>
    },
    {
        path: "/login",
        element: <Login></Login>
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: 'project-management',
                element: <ProjectManagement></ProjectManagement>
            },
            {
                path: 'profile',
                element: <UserProfile></UserProfile>
            }
        ]
    },
]);


export default router;