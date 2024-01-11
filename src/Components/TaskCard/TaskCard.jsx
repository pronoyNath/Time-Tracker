import React, { useEffect, useState } from 'react';
import { FaArrowRotateLeft, FaRegTrashCan } from 'react-icons/fa6';

const TaskCard = ({ task }) => {
    const { _id, projectName, taskTitle, description, timer } = task;

    const [running, setRunning] = useState(false);
    const [seconds, setSeconds] = useState(0);

    const handleStart = () => {
        setRunning(true);
    };

    const handleStop = () => {
        setRunning(false);
    };

    const handleReset = () => {
        setRunning(false);
        setSeconds(0);
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
                                <p>{formatTime(seconds)}</p>

                                <button className="btn" onClick={running ? handleStop : handleStart}>
                                    {running ? 'Stop' : 'Start'}
                                </button>
                                <button className="btn" onClick={handleReset}>
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
