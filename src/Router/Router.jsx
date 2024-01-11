import { createBrowserRouter } from 'react-router-dom';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';
import Dashboard from '../Pages/Dashboard/Dashboard';
import PrivateRoute from './PrivateRoute';
import ProjectManagement from '../Pages/ProjectManagement/ProjectManagement';
import Test from '../Pages/Test/Test';

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
        element: <Test></Test>
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
            }
        ]
    },
]);


export default router;