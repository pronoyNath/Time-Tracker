import React, { useContext, useState } from 'react';
import { FaArrowRotateLeft, FaRegTrashCan } from 'react-icons/fa6';
import BtnComponent from '../Test/BtnComponent';
import DisplayComponent from '../Test/DisplayComponent';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { ImSpinner9 } from "react-icons/im";
import { AuthContext } from '../../Provider/AuthProvider';
import TaskCard from '../../Components/TaskCard/TaskCard';
import { useQuery } from '@tanstack/react-query';

const ProjectManagement = () => {

    const { user, loading } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    // const [tasks, setTasks] = useState([]);

    // for stop watch 
    const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 });
    const [interv, setInterv] = useState();
    const [status, setStatus] = useState(0);
    // Not started = 0
    // started = 1
    // stopped = 2

    const start = () => {
        run();
        setStatus(1);
        setInterv(setInterval(run, 10));
    };

    var updatedMs = time.ms, updatedS = time.s, updatedM = time.m, updatedH = time.h;

    const run = () => {
        if (updatedM === 60) {
            updatedH++;
            updatedM = 0;
        }
        if (updatedS === 60) {
            updatedM++;
            updatedS = 0;
        }
        if (updatedMs === 100) {
            updatedS++;
            updatedMs = 0;
        }
        updatedMs++;
        return setTime({ ms: updatedMs, s: updatedS, m: updatedM, h: updatedH });
    };

    const stop = () => {
        clearInterval(interv);
        setStatus(2);
    };

    const reset = () => {
        clearInterval(interv);
        setStatus(0);
        setTime({ ms: 0, s: 0, m: 0, h: 0 })
    };

    const resume = () => start();


    //   finish stop watch 


    const handleCreateProject = (e) => {

        e.preventDefault();

        const form = new FormData(e.currentTarget);
        const projectName = form.get('projectName');
        const taskTitle = form.get('taskTitle');
        const description = form.get('description');
        const timer = form.get('timer')
        const data = { projectName, taskTitle, description, timer, }
        console.log(data);

        axiosPublic.post('/task-collection', data)
            .then(({ data }) => {

                if (data?.insertedId) {
                    document.getElementById('my_modal_5').close();
                    // refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Project Created Successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }

            })
            .catch((error) => {
                // Show error toast if update fails
                document.getElementById('my_modal_5').close();
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Failed to Create Project",
                    showConfirmButton: false,
                    timer: 1500
                });

            });

    }


    // fetching data of taskCollection
    // tanstack query for updated data get 
    const { data: tasks = [], refetch } = useQuery({
        queryKey: ['updaetdUserInfo'],
        queryFn: async () => {
            const res = await axiosPublic.get("/task-collection");
            return res.data;
        }
    })

    // axiosPublic.get("/task-collection")
    // .then(({ data }) => { setTasks(data) })

    return (
        <div className=' '>

            {/* modal start */}
            <div className=" ">


                {/* Open the modal using document.getElementById('ID').showModal() method */}
                <button className="text-4xl text-center w-full font-bold p-5 bg-green-900  uppercase text-gray-100
              hover:scale-100  hover:ease-in-out hover:bg-green-600 duration-1000 hover:delay-150 hover:skew-y-1 hover:origin-center " onClick={() => document.getElementById('my_modal_5').showModal()}>Creat Project <span>+</span></button>
                <dialog id="my_modal_5" className="modal text-gray-100 modal-bottom -z-10 sm:modal-middle">
                    <div className="modal-box bg-green-800">
                        <h3 className="font-bold text-3xl text-center uppercase">Create project</h3>
                        <div className="modal-action">

                            <form onSubmit={handleCreateProject} className="w-full mx-auto">

                                <div className="mb-5">
                                    <label className="block mb-2  text-sm font-medium ">Project Name</label>
                                    <input type="text" name='projectName' id="small-input" className="block text-black w-full p-2  border  rounded-lg sm:text-xs  " />
                                </div>
                                <div className="mb-5">
                                    <label className="block  mb-2 text-sm font-medium ">Task Title</label>
                                    <input type="text" name='taskTitle' id="base-input" className="border text-black  text-sm rounded-lg  block w-full p-2.5   " />
                                </div>
                                <div className="mb-5">
                                    <label className="block mb-2 text-sm font-medium  ">Description</label>
                                    <input type="text" name='description' id="large-input" className="block   text-black w-full p-4  border  rounded-lg sm:text-md    " />
                                </div>
                                <div className="mb-5">
                                    <label className="block mb-2 text-sm font-medium  ">Timer</label>
                                    <input type="text" defaultValue={"0000"} name='timer' id="large-input" className="block   text-black w-full p-4  border  rounded-lg sm:text-md    " placeholder='00:00' />
                                </div>


                                <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md bg-green-500 hover:scale-105 mb-5 transform transition-transform duration-300 hover:bg-green-400 ">
                                    {
                                        loading ? <ImSpinner9 className='mx-auto animate-spin text-xl'></ImSpinner9> :
                                            " Create Project"
                                    }
                                </button>



                                <form method="dialog" className=''>
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn w-full hover:bg-slate-500 hover:border-none">Close</button>
                                </form>
                            </form>








                            {/* </form> */}



                        </div>
                    </div>
                </dialog>

            </div>

            <div className="flex flex-col  p-6 space-y-4 sm:p-10  text-black mt-10" >
                <h2 className="text-xl font-semibold">My Projects</h2>

                {
                    tasks.map(task => <TaskCard
                        key={task.id}
                        time={time}
                        resume={resume}
                        reset={reset}
                        start={start}
                        status={status}
                        task={task}
                    ></TaskCard>)
                }

            </div>
            {/* projecs lists  */}
            {/* <div className="flex flex-col  p-6 space-y-4 sm:p-10  text-black mt-10" >
                <h2 className="text-xl font-semibold">My Projects</h2>
                <ul className="flex flex-col divide-y divide-black">
                    <li className="flex flex-col py-2 sm:flex-row sm:justify-between border border-black p-2">
                        <div className="flex w-full space-x-2 sm:space-x-4" >
                            <div className="flex flex-col justify-between w-full pb-4" >
                                <div className="flex justify-between w-full pb-2 space-x-2" >
                                    <div className="space-y-1" >
                                        <h3 className="text-xl font-semibold leadi sm:pr-8 hover:ease-in-out duration-1000 hover:delay-150 hover:-skew-y-6 hover:origin-top-left hover:rotate-45">Polaroid camera</h3>
                                        <h3 className="text-lg leadi sm:pr-8">Polaroid camera</h3>
                                        <p className="text-sm text-gray-900">Classic</p>
                                    </div>
                                    <div className="text-right flex gap-5 items-center" >
                    
                                        <DisplayComponent time={time} />
                                        <BtnComponent status={status} resume={resume} reset={reset} stop={stop} start={start} />
                                    </div>
                                </div>
                                <div className="flex text-sm divide-x" >
                                    <div>
                                        <button type="button" className="flex hover:text-red-500 items-center px-2 py-1 pl-0 space-x-1    hover:scale-150  hover:ease-in-out duration-1000 hover:delay-150 hover:-skew-y-6 hover:origin-top-left hover:rotate-3 z-40 hover:shadow-2xl">
                                            <FaRegTrashCan />
                                            <span>Remove</span>
                                        </button>
                                    </div>
                                    <button type="button" className="flex items-center px-2 py-1 space-x-1 hover:text-orange-500  hover:scale-150  hover:ease-in-out duration-1000 hover:delay-150 hover:-skew-y-6 hover:origin-top-left hover:rotate-3">
                                        <FaArrowRotateLeft />
                                        <span>Edit</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </li>

                </ul>

            </div> */}

        </div>
    );
};

export default ProjectManagement;