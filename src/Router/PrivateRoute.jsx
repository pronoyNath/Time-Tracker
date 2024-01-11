import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/loading.json"


const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  // console.log(location);

  if (loading) {
    return  <div className="flex justify-center items-center">
        <Lottie animationData={loadingAnimation}></Lottie>
    </div>
    
  }

  if (user) {
    return children;
  }


  return <Navigate state={location.pathname} to={'/login'} replace></Navigate>
};

export default PrivateRoute;