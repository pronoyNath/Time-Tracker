import React, { useContext, useEffect, useState } from 'react';
import { FaArrowRotateLeft, FaRegTrashCan } from 'react-icons/fa6';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { ImSpinner9 } from 'react-icons/im';
import { AuthContext } from '../../Provider/AuthProvider';

const TaskCard = ({ task, refetch }) => {
    const { _id, projectName, taskTitle, description, timer } = task;
    const axiosPublic = useAxiosPublic();
    const { user, loading } = useContext(AuthContext);

    const [running, setRunning] = useState(false);
    const [seconds, setSeconds] = useState(timer || 0);

    const handleStart = () => {
        setRunning(true);
    };

    const handleStop = () => {
        setRunning(false);
    };

    // const handleReset = () => {
    //     setRunning(false);
    //     setSeconds(timer || 0);
    // };

    useEffect(() => {
        let interval;

        if (running) {
            interval = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds + 1);
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [running]);

    const handleUpdateTime = () => {
        console.log(seconds);

        axiosPublic
            .put(`/update-time/${_id}`, { seconds })
            .then(({ data }) => {
                if (data?.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Project Timer Updated',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            })
            .catch((error) => {
                // Show error toast if update fails
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Failed To Update Timer',
                    showConfirmButton: false,
                    timer: 1500,
                });
            });
    };

    const formatTime = (time) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;

        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    // remove task 
    const handleDelete = () => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, remove it!"
        }).then((result) => {
            if (result.isConfirmed) {
                // fetch(`https://grand-hotel-sand.vercel.app/bookingconfirm/${id}`, {
                //     method: 'DELETE'
                // })
                axiosPublic.delete(`/project-delete/${_id}`)
                    .then(({ data }) => {
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                'Removed!',
                                'Project task has been removed.',
                                'success'
                            )

                            refetch();
                            // const remaining = bookingList.filter(product => product._id !== id)
                            // setBookingList(remaining)
                        }
                    })
            }
        });
    }

    const handleUpdate = (e) => {

        e.preventDefault();

        const form = new FormData(e.currentTarget);
        const projectName = form.get('projectName');
        const taskTitle = form.get('taskTitle');
        const description = form.get('description');
        const userEmail = user?.email;
        const data = { projectName, taskTitle, description, userEmail }
        console.log(data);

        axiosPublic.put(`/project-update/${_id}`, data)
            .then(({ data }) => {

                if (data?.modifiedCount > 0) {
                    document.getElementById(`my_modal_${_id}`).close();
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Project Updated Successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }

            })
            .catch((error) => {
                // Show error toast if update fails
                document.getElementById(`my_modal_${_id}`).close();
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Failed to Update Project",
                    showConfirmButton: false,
                    timer: 1500
                });

            });

    }

    return (
        <ul className="flex flex-col divide-y divide-black">
            <li className="flex flex-col py-2 sm:flex-row sm:justify-between border border-black p-2">
                <div className="flex w-full space-x-2 sm:space-x-4">
                    <div className="flex flex-col justify-between w-full pb-4">
                        <div className="flex justify-between w-full pb-2 space-x-2">
                            <div className="space-y-1  w-full">
                                <div className='flex justify-between items-center w-full'>
                                <div>
                                <h3 className="text-sm md:text-lg lg:text-xl font-semibold leadi sm:pr-8 hover:ease-in-out duration-1000 hover:delay-150 hover:-skew-y-6 hover:origin-top-left hover:rotate-45">
                                    {projectName}
                                </h3>
                                </div>
                                <div className="text-right flex gap-2 md:gap-5 items-center">
                                <p className='font-bold text-xs md:text-base'>{formatTime(seconds)}</p>

                                <button className={`${running ? "btn btn-xs md:btn-md hover:bg-red-400 bg-red-600 border-none text-white hover:scale-110" : "btn btn-xs md:btn-md hover:bg-orange-400 bg-orange-600 border-none text-white hover:scale-110"}`} onClick={() => {
                                    running ? (handleStop(), handleUpdateTime()) : handleStart();
                                }}>
                                    {running ? 'Stop' : 'Start'}
                                </button>
                                {/* <button className="btn hover:bg-green-400 bg-green-600 border-none text-white hover:scale-110" onClick={handleReset}>
                                    Reset
                                </button> */}
                            </div>
                                </div>
                                <h3 className="text-xs md:text-base lg:text-lg leadi sm:pr-8">{taskTitle}</h3>
                                <p className="text-xs lg:text-sm text-gray-900">{description}</p>
                            </div>
                            {/* <div className="text-right flex gap-5 items-center">
                                <p className='font-bold text-xs md:text-base'>{formatTime(seconds)}</p>

                                <button className={`${running ? "btn btn-xs md:btn-md hover:bg-red-400 bg-red-600 border-none text-white hover:scale-110" : "btn btn-xs md:btn-md hover:bg-orange-400 bg-orange-600 border-none text-white hover:scale-110"}`} onClick={() => {
                                    running ? (handleStop(), handleUpdateTime()) : handleStart();
                                }}>
                                    {running ? 'Stop' : 'Start'}
                                </button> */}
                                {/* <button className="btn hover:bg-green-400 bg-green-600 border-none text-white hover:scale-110" onClick={handleReset}>
                                    Reset
                                </button> */}
                            {/* </div> */}
                        </div>
                        <div className="flex text-sm divide-x">
                            <div>
                                <button onClick={() => handleDelete()}
                                    type="button"
                                    className="flex hover:text-red-500 items-center px-2 py-1 pl-0 space-x-1    hover:scale-150  hover:ease-in-out duration-1000 hover:delay-150 hover:-skew-y-6 hover:origin-top-left hover:rotate-3 z-40 hover:shadow-2xl"
                                >
                                    <FaRegTrashCan />
                                    <span>Remove</span>
                                </button>
                            </div>
                            {/* <button
                                type="button"
                                className="flex items-center px-2 py-1 space-x-1 hover:text-orange-500  hover:scale-150  hover:ease-in-out duration-1000 hover:delay-150 hover:-skew-y-6 hover:origin-top-left hover:rotate-3"
                            >
                                <FaArrowRotateLeft />
                                <span>Edit</span>
                            </button> */}


                            {/* modal start */}
                            <div className=" ">


                                {/* Open the modal using document.getElementById('ID').showModal() method */}
                                <button className="flex items-center px-2 py-1 space-x-1 hover:text-orange-500  hover:scale-150  hover:ease-in-out duration-1000 hover:delay-150 hover:-skew-y-6 hover:origin-top-left hover:rotate-3" onClick={() => document.getElementById(`my_modal_${_id}`).showModal()}>
                                    <FaArrowRotateLeft />
                                    <span>Edit</span>
                                </button>
                                <dialog id={`my_modal_${_id}`} className="modal text-gray-100 modal-bottom -z-10 sm:modal-middle">
                                    <div className="modal-box bg-green-800">
                                        <h3 className="font-bold text-3xl text-center uppercase">Update Project Task</h3>
                                        <div className="modal-action">

                                            <form onSubmit={handleUpdate} className="w-full mx-auto">

                                                <div className="mb-5">
                                                    <label className="block mb-2  text-sm font-medium ">Project Name</label>
                                                    <input type="text" defaultValue={projectName} name='projectName' id="small-input" className="block text-black w-full p-2  border  rounded-lg sm:text-xs  " />
                                                </div>
                                                <div className="mb-5">
                                                    <label className="block  mb-2 text-sm font-medium ">Task Title</label>
                                                    <input type="text" defaultValue={taskTitle} name='taskTitle' id="base-input" className="border text-black  text-sm rounded-lg  block w-full p-2.5   " />
                                                </div>
                                                <div className="mb-5">
                                                    <label className="block mb-2 text-sm font-medium  ">Description</label>
                                                    <input type="text" defaultValue={description} name='description' id="large-input" className="block   text-black w-full p-4  border  rounded-lg sm:text-md    " />
                                                </div>
                                                <div className="mb-5">
                                                    <label className="block mb-2 text-sm font-medium  ">Timer</label>
                                                    <input type="text" disabled defaultValue={timer} name='timer' id="large-input" className="block   text-black w-full p-4  border  rounded-lg sm:text-md    " placeholder='00:00' />
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
                                        </div>
                                    </div>
                                </dialog>

                            </div>


                        </div>
                    </div>
                </div>
            </li>
        </ul>
    );
};

export default TaskCard;
