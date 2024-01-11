 {/* modal start */}
 <div className=" ">


 {/* Open the modal using document.getElementById('ID').showModal() method */}
 <button className="text-4xl text-center w-full font-bold p-5 bg-green-900  uppercase text-gray-100
hover:scale-100  hover:ease-in-out hover:bg-green-600 duration-1000 hover:delay-150 hover:skew-y-1 hover:origin-center " onClick={() => document.getElementById('my_modal_5').showModal()}>Creat Project <span>+</span></button>
 <dialog id="my_modal_5" className="modal text-gray-100  modal-bottom -z-10 sm:modal-middle">
     <div className="modal-box bg-green-800">
         <h3 className="font-bold text-3xl text-center uppercase">Update Profile</h3>
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
                     
                     <div  className="mb-5">
                         <label className="block mb-2  text-sm font-medium ">Small input</label>
                         <input type="text" id="small-input" className="block text-black w-full p-2  border  rounded-lg sm:text-xs  "/>
                     </div>
                     <div className="mb-5">
                         <label  className="block  mb-2 text-sm font-medium ">Base input</label>
                         <input type="text" id="base-input" className="border text-black  text-sm rounded-lg  block w-full p-2.5   "/>
                     </div>
                     <div className="mb-5">
                         <label className="block mb-2 text-sm font-medium  ">Large input</label>
                         <input type="text" id="large-input" className="block   text-black w-full p-4  border  rounded-lg sm:text-md    "/>
                     </div>
                    
                 </form>












                 <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md bg-green-500 hover:scale-105 transform transition-transform duration-300 hover:bg-green-400 ">
                     {/* {
                                 loading ? <ImSpinner9 className='mx-auto animate-spin text-xl'></ImSpinner9> : */}
                     'Confirm Update'
                     {/* } */}
                 </button>

                 <form method="dialog" className='border'>
                     {/* if there is a button in form, it will close the modal */}
                     <button className="btn w-full hover:bg-slate-500 hover:border-none">Close</button>
                 </form>
             </form>



         </div>
     </div>
 </dialog>

</div>
