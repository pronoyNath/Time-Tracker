import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";



const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  // console.log(location);

  if (loading) {
    return  <div className="flex min-h-screen justify-center my-24">
                 <div className="flex flex-col m-8 rounded shadow-md w-60 sm:w-80 animate-pulse h-96" >
            <div className="h-48 rounded-t bg-gray-700" ></div>
            <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 bg-gray-900" >
            <div className="w-full h-6 rounded bg-gray-700" ></div>
                <div className="w-full h-6 rounded bg-gray-700" ></div>
                <div className="w-3/4 h-6 rounded bg-gray-700" ></div>
            </div>
         </div>
     </div>
  }

  if (user) {
    return children;
  }


  return <Navigate state={location.pathname} to={'/login'} replace></Navigate>
};

export default PrivateRoute;