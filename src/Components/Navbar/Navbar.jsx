import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import clockAnimation from "../../assets/clockAnimation.json"
import Lottie from "lottie-react";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const handleLogOut = () => {
        logOut()
    }

    const links = <>
        <li className="text-xl  hover:shadow-2xl hover:shadow-green-900 hover:scale-150  hover:ease-in-out duration-1000 hover:delay-75 hover:-skew-y-6 hover:origin-top-left hover:rotate-45 bg-[#3fa92b] rounded">
            <NavLink
                to="/"
                className={({ isActive }) =>
                    isActive ? "active px-2 py-1 rounded flex items-center border-b-4 border-gray-100  " : ""
                }
            >
                Home
            </NavLink>
        </li>

        <li className="text-xl hover:shadow-2xl hover:shadow-green-900 hover:scale-150  hover:ease-in-out duration-1000 hover:delay-75 hover:-skew-y-6 hover:origin-top-left hover:rotate-12 bg-[#3fa92b] ">
            <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                    isActive ? "active px-2 py-1 rounded flex items-center  border-b-4 border-gray-100  " : ""
                }
            >
                Dashboard
            </NavLink>
        </li>
    </>

    return (

        <div className="bg-[#3fa92b]">
            <div className="navbar max-w-6xl mx-auto  text-gray-100 font-bold">

                <div className="navbar-start">
                    <div className="dropdown z-40">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="bg-[#33302e] dropdown-content mt-3 z-[1] px-2 py-5 rounded shadow-2xl border-2 border-[#dbb878] w-52">
                            {links}
                        </ul>
                    </div>
                    <Link to='/'>
                        <div className="flex justify-center items-center   hover:scale-125  hover:ease-in-out duration-1000 hover:delay-150 hover:-skew-y-6 hover:origin-top-left hover:rotate-3">
                            <div className="inline-block"><Lottie animationData={clockAnimation} className="w-[100px] "></Lottie></div>
                            <h3 className="text-2xl ml-5 inline-block">Time Tracker</h3>
                        </div>
                    </Link>
                </div>

                <div className="navbar justify-center w-auto hidden lg:flex">
                    <ul className="flex gap-5 px-1 ">
                        {links}
                    </ul>
                </div>


                <div className="navbar-end ">
                    <div className="mr-1 text-xs  ">
                        <p className="">{user?.displayName}</p>
                        <p className="hidden lg:block">{user?.email}</p>
                    </div>
                    <div>
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar mr-2">
                            <div className="w-16 rounded-full">
                                <img src={user ?
                                    user?.photoURL ? user?.photoURL : "https://www.pixelwibes.com/template/timetracker/html/dist/assets/images/profile_av.svg"
                                    : "https://www.pixelwibes.com/template/timetracker/html/dist/assets/images/profile_av.svg"
                                } />

                            </div>
                        </label>

                    </div>

                    {
                        user ? <Link onClick={handleLogOut} className="py-2 px-6 text-xl text-[#3fa92b] rounded-md font-semibold bg-[#2a7b36] uppercase  hover:shadow-2xl hover:shadow-green-900 hover:scale-150  hover:ease-in-out duration-1000 hover:delay-150 hover:bg-red-500 hover:text-gray-100 hover:-skew-y-6 hover:origin-top-left hover:rotate-45">Logout</Link> :
                            <Link to={'/login'} className="py-2 px-10 text-xl text-[#3fa92b] rounded-md font-semibold bg-[#FBF6EE] uppercase  hover:shadow-2xl hover:shadow-green-900 hover:scale-150  hover:ease-in-out duration-500 hover:delay-150 hover:-skew-y-6 hover:origin-top-left hover:rotate-45 ">login</Link>
                    }

                </div>
            </div>
        </div>
    );
};

export default Navbar;