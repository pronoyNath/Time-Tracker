import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import registrationAnimation from '../../assets/registrationAnimaiton.json'

// import useAxiosPublic from "../../Hooks/UsePublicAxios";
import { imageUpload } from "../../api/ImageUploadApi";
import { FaSpinner } from "react-icons/fa6";
// import Swal from "sweetalert2";

const Register = () => {
    const { createUser, updateUserProfile, loading } = useContext(AuthContext);
    // const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const [registerError, setRegisterError] = useState('');
    // console.log(location);
    // const navigate = useNavigate();


    const handleRegister = async (e) => {
        e.preventDefault();

        const form = new FormData(e.currentTarget);
        const name = form.get('name');

        //image uploading using hosting side (imgbb api)
        const img = e.target.img.files[0]
        const imageData = await imageUpload(img)
        //    console.log(imageData.data.display_url);
        const imageURL = imageData?.data?.display_url

        const email = form.get('email');
        const password = form.get('password');
        const confirmPassword = form.get('confirmPassword');

        const currentUser = {
            name,
            email,
            imageURL
        }
        console.log(currentUser);


        if (password !== confirmPassword) {
            setRegisterError("Confirm Password is not matching")
            return
        }


        setRegisterError('');
        // console.log(img);
        if (password.length < 6) {
            setRegisterError('Password is less than 6 characters');
            return;
        } else if (!/[A-Z]/.test(password)) {
            setRegisterError("Password should have at least one capital letter");
            return;
        } else if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password)) {
            setRegisterError("Password should have at least one special character (#,*,&...etc)");
            return;
        }


        //creating user
        createUser(email, password)
            .then(async (res) => {
                const currentUser = {
                    name,
                    email,
                    imageURL
                }
                // const { data } = await axiosPublic.post('/user-info', currentUser)
                // console.log("responseee", data);
                // Registration successful, update user profile
                return updateUserProfile(name, imageURL);
            })
            .then(() => {
                //  toast pop-up

                // Swal.fire({
                //     position: "top-end",
                //     icon: "success",
                //     title: "Register Successfully",
                //     showConfirmButton: false,
                //     timer: 1500
                // });

                navigate('/');

            })
            .catch((err) => {
                console.error(err);
                setRegisterError(err.message);
                // Swal.fire({
                //     position: "top-end",
                //     icon: "error",
                //     title: "Fill the Form Correctly!",
                //     showConfirmButton: false,
                //     timer: 1500
                // });
            });
    }


    return (
        <div data-aos="zoom-in" className=" ">

            <div className="hero min-h-[700px] overflow-x-hidden" style={{ backgroundImage: 'url(https://i.ibb.co/p3Y9Qvc/Time-Management-Tips.png)' }}>
                <div className="hero-overlay bg-opacity-40"></div>
                <div className="hero-content  text-neutral-content">
                    <div className="max-w-6xl flex items-center">

                        <div className="hidden md:block flex-1">
                            <Lottie animationData={registrationAnimation} className=""></Lottie>
                        </div>

                        <div className="w-full flex-1 max-w-xl rounded-md shadow p-5 sm:p-8 dark:bg-green-800 dark:text-gray-100" >
                            <h2 className="mb-3 text-3xl font-semibold text-center">Register your account</h2>
                            <p className="text-sm text-center dark:text-gray-400 hover:scale-110 transform transition-transform duration-300">Already have an account?
                                <Link to='/login' rel="noopener noreferrer" className="focus:underline hover:underline ml-5 text-green-500 text-xl">login here</Link>
                            </p>

                            <form onSubmit={handleRegister} action="" className="space-y-8">
                                <div className="space-y-4" >
                                    <div className="space-y-2 flex-1" >
                                        <label className="block text-sm py-3 text-left">Upload Profile Image*</label>
                                        <input type="file" id="img" name="img" accept="image/*" className="file-input file-input-bordered w-full text-gray-400" required />
                                    </div>

                                    <div className="space-y-2" >
                                        <label className="block text-sm text-left">Name</label>
                                        <input type="name" name="name" id="name" placeholder="abc" className="w-full px-3 py-2 border rounded-md   text-black focus:dark:border-violet-400" required />
                                    </div>
                                    <div className="space-y-2" >
                                        <label className="block text-sm text-left">Email address</label>
                                        <input type="email" name="email" id="email" placeholder="xyz@gmail.com" className="w-full px-3 py-2 border rounded-md   text-black focus:dark:border-violet-400" required />
                                    </div>
                                    <div className="space-y-2" >
                                        <div className="flex justify-between" >
                                            <label name="password" className="text-sm">Password</label>

                                        </div>
                                        <input type="password" name="password" id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md   text-black focus:dark:border-violet-400" required />
                                    </div>
                                    <div className="space-y-2" >
                                        <div className="flex justify-between" >
                                            <label name="password" className="text-sm">Confirm Password</label>

                                        </div>
                                        <input type="password" name="confirmPassword" id="confirmPassword" placeholder="*****" className="w-full px-3 py-2 border rounded-md   text-black focus:dark:border-violet-400" required />
                                    </div>
                                    <p className='text-red-500'>{registerError}</p>
                                </div>

                                <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md dark:bg-green-500 dark:text-white hover:scale-105 transform transition-transform duration-300">
                                    {
                                        loading ? <FaSpinner className='mx-auto animate-spin text-xl'></FaSpinner> : 'Register'
                                    }
                                </button>

                            </form>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Register;