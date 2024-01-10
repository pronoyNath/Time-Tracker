import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaCircleCheck } from "react-icons/fa6";
import Lottie from "lottie-react";
import loginAnimation from "../../assets/loginAnimation.json"
import { FaSpinner } from "react-icons/fa6";
// import Swal from "sweetalert2";
// import useAxiosPublic from "../../Hooks/UsePublicAxios";

const Login = () => {
    const { signIn, googleSignIn, loading } = useContext(AuthContext);
    const navigate = useNavigate();
    // const axiosPublic = useAxiosPublic();

    const location = useLocation();
    // console.log(location);
    // const navigate = useNavigate();
    const [loginError, setLoginError] = useState('');

    const handleLogin = e => {
        e.preventDefault();

        const form = new FormData(e.currentTarget);
        const email = form.get('email')
        const password = form.get('password')

        //clear error
        setLoginError('')

console.log(email,password);
        // log in 
        signIn(email, password)
            .then(result => {
                console.log(result);
                // Swal.fire({
                //     position: "top-end",
                //     icon: "success",
                //     title: "Logged in Successfully",
                //     showConfirmButton: false,
                //     timer: 1500
                // });

                navigate(`${location?.state ? location.state : '/'}`);
             

            })
            .catch(err => {
                console.log(err.message);
                setLoginError(err.message)

            })

    }

    //login by google
    const handleGoogle = () => {
        googleSignIn()
            .then(async result => {
                console.log(result?.user);
                const currentUser = {name: result?.user?.displayName,email:result?.user?.email,imageURL:result?.user?.photoURL};
                console.log(currentUser);
                // const { data } = await axiosPublic.post('/user-info',currentUser)
                // console.log("responseee", data);
                // Swal.fire({
                //     position: "top-end",
                //     icon: "success",
                //     title: "Logged in Successfully",
                //     showConfirmButton: false,
                //     timer: 1500
                // });

                navigate(`${location?.state ? location.state : '/'}`);

            })
            .catch(err => {
                console.log(err);
                setLoginError(err.message)
            })
    }


    return (
        <div data-aos="zoom-in" className="">


            <div className="hero  min-h-[700px] overflow-x-hidden" style={{ backgroundImage: 'url(https://i.ibb.co/qndKgCK/login.pnghttps://i.ibb.co/qndKgCK/login.png)' }}>
                <div className="hero-overlay bg-opacity-50"></div>
                <div className="hero-content  text-neutral-content">
                    <div className="max-w-6xl flex items-center">

                        <div className="hidden md:block flex-1">
                            <Lottie animationData={loginAnimation} className=""></Lottie>
                        </div>

                        <div className="w-full flex-1 max-w-xl rounded-md shadow p-5 sm:p-8 bg-green-800 text-gray-100" >
                            <h2 className="mb-3 text-3xl font-semibold text-center">Login to your account</h2>
                            <p className="text-sm text-center text-gray-400 hover:scale-110 transform transition-transform duration-300">Dont have account?
                                <Link to='/register' rel="noopener noreferrer" className="focus:underline hover:underline ml-5 text-green-500 text-xl">Register here</Link>
                            </p>

                            <form onSubmit={handleLogin} action="" className="space-y-8">
                                <div className="space-y-4" >
                                    <div className="space-y-2" >
                                        <label className="block text-sm text-left">Email address</label>
                                        <input type="email" name="email" id="email" placeholder="xyz@gmail.com" className="w-full px-3 py-2 border rounded-md  text-black focus:border-violet-400" />
                                    </div>
                                    <div className="space-y-2" >
                                        <div className="flex justify-between" >
                                            <label name="password" className="text-sm">Password</label>

                                        </div>
                                        <input type="password" name="password" id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md   text-black focus:border-violet-400" />
                                    </div>
                                    <p className='text-red-500'>{loginError}</p>
                                </div>

                                <button onClick={handleGoogle} aria-label="Login with Google" type="button" className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ri focus:ri border-gray-400 focus:ri hover:bg-green-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                                        <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                                    </svg>
                                    <p>Login with Google</p>
                                </button>


                                <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md bg-green-500 text-white hover:scale-105 transform transition-transform duration-300">
                                    {
                                        loading ? <FaSpinner className='mx-auto animate-spin text-xl'></FaSpinner> : 'Login'
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

export default Login;