import React, { useEffect, useState } from 'react';
import { FaArrowRotateLeft, FaRegTrashCan } from 'react-icons/fa6';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const TaskCard = ({ task,refetch }) => {
    const { _id, projectName, taskTitle, description, timer } = task;
    const axiosPublic = useAxiosPublic();

    const [running, setRunning] = useState(false);
    const [seconds, setSeconds] = useState(timer || 0);

    const handleStart = () => {
        setRunning(true);
    };

    const handleStop = () => {
        setRunning(false);
    };

    const handleReset = () => {
        setRunning(false);
        setSeconds(timer || 0);
    };

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

    return (
        <ul className="flex flex-col divide-y divide-black">
            <li className="flex flex-col py-2 sm:flex-row sm:justify-between border border-black p-2">
                <div className="flex w-full space-x-2 sm:space-x-4">
                    <div className="flex flex-col justify-between w-full pb-4">
                        <div className="flex justify-between w-full pb-2 space-x-2">
                            <div className="space-y-1">
                                <h3 className="text-xl font-semibold leadi sm:pr-8 hover:ease-in-out duration-1000 hover:delay-150 hover:-skew-y-6 hover:origin-top-left hover:rotate-45">
                                    {projectName}
                                </h3>
                                <h3 className="text-lg leadi sm:pr-8">{taskTitle}</h3>
                                <p className="text-sm text-gray-900">{description}</p>
                            </div>
                            <div className="text-right flex gap-5 items-center">
                                <p className='font-bold'>{formatTime(seconds)}</p>

                                <button className={`${running ? "btn hover:bg-red-400 bg-red-600 border-none text-white hover:scale-110" : "btn hover:bg-orange-400 bg-orange-600 border-none text-white hover:scale-110"}`} onClick={() => {
                                    running ? (handleStop(), handleUpdateTime()) : handleStart();
                                }}>
                                    {running ? 'Stop' : 'Start'}
                                </button>
                                <button className="btn hover:bg-green-400 bg-green-600 border-none text-white hover:scale-110" onClick={handleReset}>
                                    Reset
                                </button>
                            </div>
                        </div>
                        <div className="flex text-sm divide-x">
                            <div>
                                <button
                                    type="button"
                                    className="flex hover:text-red-500 items-center px-2 py-1 pl-0 space-x-1    hover:scale-150  hover:ease-in-out duration-1000 hover:delay-150 hover:-skew-y-6 hover:origin-top-left hover:rotate-3 z-40 hover:shadow-2xl"
                                >
                                    <FaRegTrashCan />
                                    <span>Remove</span>
                                </button>
                            </div>
                            <button
                                type="button"
                                className="flex items-center px-2 py-1 space-x-1 hover:text-orange-500  hover:scale-150  hover:ease-in-out duration-1000 hover:delay-150 hover:-skew-y-6 hover:origin-top-left hover:rotate-3"
                            >
                                <FaArrowRotateLeft />
                                <span>Edit</span>
                            </button>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    );
};

export default TaskCard;
