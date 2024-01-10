import Lottie from 'lottie-react';
import bannerAnimation from "../../assets/banner-animation.json"
import rightArrow from "../../assets/rightArrow.json"
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div>
            <h3 className=' hover:scale-105  duration-1000 hover:delay-150 hover:-skew-x-6  hover:origin-top-left hover:rotate-45   text-4xl  text-center font-bold my-10 '><span className='text-[#3fa92b]'>Welcome To, </span> Time Tracker Web Appication</h3>
            <div className='max-w-6xl mx-auto'>
                <Lottie animationData={bannerAnimation} className=' hover:scale-105  hover:ease-in-out duration-1000 hover:delay-150 hover:-skew-y-1  hover:origin-center hover:rotate-45'></Lottie>
            </div>

            <Link to={"/dashboard"}>
            <div className='text-3xl text-center my-10 p-5 font-bold w-full max-w-6xl bg-[#3fa92b] text-white mx-auto rounded flex items-center justify-center gap-3 hover:scale-105  hover:shadow-2xl hover:shadow-green-900  hover:ease-in-out cursor-alias duration-1000 hover:delay-150 hover:-skew-x-6  hover:origin-top-left hover:rotate-180 '>
                <h3 className=''>Track Your Time</h3>
                <Lottie animationData={rightArrow} className='w-[100px] h-50px'></Lottie>
            </div>
            </Link>
        </div>
    );
};

export default Banner;