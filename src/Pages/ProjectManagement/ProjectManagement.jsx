import React, { useContext, useEffect, useState } from 'react';
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
    // tanstack query for fetching data
    const { data: tasks = [], refetch } = useQuery({
        queryKey: ['updaetdUserInfo'],
        queryFn: async () => {
            const res = await axiosPublic.get("/task-collection");
            return res.data;
        }
    })

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
                        key={task._id}
                        task={task}
                    ></TaskCard>)
                }

            </div>

        </div>
    );
};

export default ProjectManagement;



