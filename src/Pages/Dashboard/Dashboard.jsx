import { useContext, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
// import useAxiosPublic from "../../Hooks/UsePublicAxios";
import clockAnimation from "../../assets/clockAnimation.json"
import Lottie from "lottie-react";
import timeAnimation from "../../assets/timerAnimation.json"
import deadPool from "../../assets/deadPool.json"
import killer from "../../assets/killer.json"


const Dashboard = () => {
    const [open, setOpen] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const isDashboardActive = location.pathname === `/dashboard`;


    // const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState([]);

    // useEffect(() => {
    //     axiosPublic.get(`/user/${user?.email}`)
    //         .then(({ data }) => setUserInfo(data))
    // }, [user?.email, axiosPublic])




    let Menus = [];

    Menus = [
        { title: "Dashboard", src: "https://i.ibb.co/pZdfyDq/Chart-fill.png", link: '/dashboard' },
        { title: "Tasks", src: "https://i.ibb.co/W6kRqk6/to-do-list.png", link: 'tasks' },
        { title: "User Profile", src: "https://i.ibb.co/4gS8Pbb/profile.png", gap: true, link: 'profile' },
    ];


    // console.log(userRole, "----->", Menus);


    return (
        <div className="flex ">
            <div
                className={` ${open ? "w-72" : "w-20 "
                    } bg-green-900  p-5 z-50 pt-8 relative duration-300 h-auto`}
            >
                <img
                    src="https://i.ibb.co/TPWHKZL/control.png"
                    className={`absolute cursor-pointer -right-3 top-9 w-7 border-[#59c444]
           border-2 rounded-full  ${!open && "rotate-180"}`}
                    onClick={() => setOpen(!open)}
                />
                <div onClick={() => navigate('/')} className="flex gap-x-4 items-center">
                    {/* <img
                        src="https://i.ibb.co/WKbfkZD/task-1.png"
                        className={`cursor-pointer duration-500 ${open && "rotate-[360deg]  w-[200px] h-[70px]"
                            }`}
                    /> */}

                    <div className="flex justify-center items-center  hover:scale-105 hover:transition hover:ease-in-out duration-1000 hover:delay-150 hover:-skew-y-6 hover:origin-top-left hover:rotate-6">
                        <div className={`inline-block ${!open && "hidden"}`}><Lottie animationData={clockAnimation} className="w-[100px] "></Lottie></div>
                        {
                            open &&
                            <h3 className="text-xl ml-5 text-white inline-block">Time Tracker</h3>
                        }
                    </div>

                </div>
                <ul className="pt-6">
                    {Menus.map((Menu, index) => (
                        <li
                            onClick={() => {
                                navigate(`${Menu.link}`);
                            }}
                            key={index}
                            className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-20" : "mt-2"} ${index === 0 && "border border-green-500"}
              ${location.pathname == `/dashboard/${Menu?.link}` ? "bg-green-500" : ""}
              
              `}
                        >

                            <img src={Menu.src} className="h-[20px] w-[20px]" />
                            <span className={`${!open && "hidden"} origin-left duration-200`}>
                                {Menu.title}
                            </span>


                        </li>
                    ))}
                </ul>
            </div>
            <div className=" flex-1 p-7 z-0bg-gray-700 overflow-hidden">

                {
                    isDashboardActive &&
                    <div className="h-[700px] md:w-full">
                        <div className="flex gap-10 justify-between items-center">
                        <h3 className="text-base md:text-3xl text-center font-semibold uppercase">Welcome {userInfo?.name}</h3>  <Lottie animationData={deadPool} className="w-[200px] hover:scale-125  hover:ease-in-out duration-500 hover:delay-150  hover:origin-center hover:rotate-2 "></Lottie>
                        </div>
                        {/* <p className="p-10 text-black ">
                            <span className="font-semibold">  How to Use the Drag-and-Drop Feature:</span><br /><br />
                            <span className="font-semibold underline"> To-Do:</span>   <br />
                            Start with your tasks in the 'To-Do' section.<br />
                            Simply click, hold, and drag a task card to initiate movement.<br /><br />
                            <span className="font-semibold underline">  In Progress:</span>  <br />
                            Drag the task card to the 'In Progress' section when you begin working on it.<br /><br />
                            <span className="font-semibold underline"> Complete:</span>    <br />

                            Once a task is finished, effortlessly move it to the 'Complete' section.<br />
                        </p> */}

                        <section className="p-6 my-6 bg-green-600 text-gray-100">
                            <div className="container mx-auto " >
                                <div className="flex p-4 justify-center space-x-4 rounded-lg md:space-x-6 bg-green-700 text-gray-100" >
                                    <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4" >
                                    <Lottie animationData={timeAnimation} className="w-[100px] hover:scale-150  hover:ease-in-out duration-500 hover:delay-150  hover:origin-top-left hover:rotate-180 "></Lottie>
                                    </div>
                                    <div className="flex flex-col justify-center align-middle hover:scale-150  hover:ease-in-out duration-500 hover:delay-150 hover:skew-x-6 hover:origin-top-left hover:rotate-6" >
                                        <p className="text-3xl font-semibold leadi"><span>300</span>H</p>
                                        <p className="capitalize">Total Working Hour</p>
                                    </div>
                                    <div>
                                   
                                    </div>
                                </div>

                            </div>
                        </section>

                        <div  className="flex gap-10 justify-center items-center max-w-5x">
                        <h3 className="underline text-base md:text-3xl text-center font-semibold uppercase">Don't Forget To Track Your Time...</h3>
                                <Lottie animationData={killer} className="w-[100px] hover:scale-150  hover:ease-in-out duration-500 hover:delay-150  hover:origin-center hover:rotate-3 hover:z-20"></Lottie>
                        </div>
                    </div>
                }

                <Outlet></Outlet>
            </div>
        </div>
    );
};
export default Dashboard;