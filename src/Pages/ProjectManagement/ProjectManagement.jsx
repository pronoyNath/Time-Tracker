import React, { useState } from 'react';
import { FaArrowRotateLeft, FaRegTrashCan } from 'react-icons/fa6';
import BtnComponent from '../Test/BtnComponent';
import DisplayComponent from '../Test/DisplayComponent';

const ProjectManagement = () => {

    // for stop watch 
    const [time, setTime] = useState({ms:0, s:0, m:0, h:0});
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
    if(updatedM === 60){
      updatedH++;
      updatedM = 0;
    }
    if(updatedS === 60){
      updatedM++;
      updatedS = 0;
    }
    if(updatedMs === 100){
      updatedS++;
      updatedMs = 0;
    }
    updatedMs++;
    return setTime({ms:updatedMs, s:updatedS, m:updatedM, h:updatedH});
  };

  const stop = () => {
    clearInterval(interv);
    setStatus(2);
  };

  const reset = () => {
    clearInterval(interv);
    setStatus(0);
    setTime({ms:0, s:0, m:0, h:0})
  };

  const resume = () => start();


//   finish stop watch 






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

                            <form className="space-y-8 mt-10 w-full">
                                {/* <div className="space-y-4" >
                                            <div className='flex gap-5'>
                                                <div className="space-y-2 flex-1" >
                                                    <label className="block text-sm text-left">Your name</label>
                                                    <input type="text" name="name" id="name" placeholder="your name" className="w-full px-3 py-3 border rounded-md border-red-500 bg-gray-800 text-gray-100 focus:border-violet-400" defaultValue={userInfo?.name} />
                                                </div>
                                                <div className="space-y-2 flex-1" >

                                                    <label className="block text-sm text-left">Upload Profile Image*</label>
                                                    <input type="file" id="img" name="img" accept="image/*" className="file-input file-input-bordered w-full bg-gray-800 border-red-500" />
                                                </div>
                                            </div>
                                            <div className='flex gap-5'>

                                                <div className="space-y-2 flex-1" >
                                                    <div className="flex justify-between" >
                                                        <label className="text-sm">Blood Group*</label>
                                                    </div>
                                                    <select defaultValue={userInfo?.bloodGroup} name="bloodGroup" className="select select-error w-full px-3 py-2 border rounded-md border-red-500 bg-gray-800 text-gray-100" >

                                                        <option>A+</option>
                                                        <option>A-</option>
                                                        <option>B+</option>
                                                        <option>B-</option>
                                                        <option>AB+</option>
                                                        <option>AB-</option>
                                                        <option>O+</option>
                                                        <option>O-</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className='flex gap-5'>

                                                <div className="space-y-2 flex-1">
                                                    <div className="flex justify-between">
                                                        <label className="text-sm">District*</label>
                                                    </div>
                                                    <select
                                                        defaultValue={userInfo?.district}
                                                        name="district"
                                                        value={selectedDistrict}
                                                        onChange={(e) => {
                                                            setSelectedDistrict(e.target.value);
                                                        }}

                                                        required
                                                        className="select select-error w-full px-3 py-2 border rounded-md border-red-500 bg-gray-800 text-gray-100 "
                                                    >
                                                        <option disabled value="">Select Your District</option>

                                                        {districts.map((district) => (
                                                            <SelectOptions key={district?.id} district={district}></SelectOptions>
                                                        ))}
                                                    </select>
                                                </div>


                                                <div className="space-y-2 flex-1">
                                                    <div className="flex justify-between">
                                                        <label className="text-sm">Upazila*</label>
                                                    </div>
                                                    <select
                                                        name="upazila"
                                                        value={selectedUpazila}
                                                        onChange={(e) => {
                                                            setSelectedUpazila(e.target.value);
                                                        }}
                                                        required
                                                        className="select select-error w-full px-3 py-2 border rounded-md bg-gray-800 text-gray-100 "
                                                    >
                                                        <option disabled value="">Select Your Upazila</option>
                                                        {filteredUpazilas.map((upazila) => (
                                                            <option key={upazila?.id} value={upazila.id}>
                                                                {upazila.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div> */}





                                <form className="max-w-sm mx-auto">

                                    <div className="mb-5">
                                        <label className="block mb-2  text-sm font-medium ">Project Name</label>
                                        <input type="text" id="small-input" className="block text-black w-full p-2  border  rounded-lg sm:text-xs  " />
                                    </div>
                                    <div className="mb-5">
                                        <label className="block  mb-2 text-sm font-medium ">Task Title</label>
                                        <input type="text" id="base-input" className="border text-black  text-sm rounded-lg  block w-full p-2.5   " />
                                    </div>
                                    <div className="mb-5">
                                        <label className="block mb-2 text-sm font-medium  ">Description</label>
                                        <input type="text" id="large-input" className="block   text-black w-full p-4  border  rounded-lg sm:text-md    " />
                                    </div>
                                    <div className="mb-5">
                                        <label className="block mb-2 text-sm font-medium  ">Timer</label>
                                        <input type="text" id="large-input" className="block   text-black w-full p-4  border  rounded-lg sm:text-md    " placeholder='00:00' />
                                    </div>

                                </form>












                                <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md bg-green-500 hover:scale-105 transform transition-transform duration-300 hover:bg-green-400 ">
                                    {/* {
                                                loading ? <ImSpinner9 className='mx-auto animate-spin text-xl'></ImSpinner9> : */}
                                    'Confirm Update'
                                    {/* } */}
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






            {/* projecs lists  */}
            <div className="flex flex-col  p-6 space-y-4 sm:p-10  text-black mt-10" >
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
                                        {/* <h3 className='text-xl font-bold text-black'>00H : 00M : 00S : 00MS</h3> */}
                                        {/* <button className='hover:ease-in-out duration-1000 hover:delay-150 hover:-skew-y-6 hover:origin-top-left hover:rotate-45  btn btn-lg text-white hover:bg-green-600 bg-green-900'> Start</button> */}
                                        {/* <p className="text-sm line-through text-gray-600">75.50€</p> */}
                                        <DisplayComponent time={time}/>
                                        <BtnComponent status={status} resume={resume} reset={reset} stop={stop} start={start}/>
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

            </div>

        </div>
    );
};

export default ProjectManagement;