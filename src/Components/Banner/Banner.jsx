import Lottie from 'lottie-react';
import React from 'react';
import bannerAnimation from "../../assets/banner-animation.json"
import rightArrow from "../../assets/rightArrow.json"

const Banner = () => {
    return (
        <div>
            <h3 className='text-4xl text-center font-bold my-10'><span className='text-[#3fa92b]'>Welcome To, </span> Time Tracker Web Appication</h3>
            <div className='max-w-6xl mx-auto'>
            <Lottie animationData={bannerAnimation}></Lottie>
            </div>

            <div className='text-3xl text-center my-10 p-5 font-bold w-full max-w-6xl bg-[#3fa92b] text-white mx-auto rounded flex items-center justify-center gap-3  hover:shadow-2xl hover:shadow-green-200 hover:transition hover:ease-in-out duration-1000 hover:delay-150 hover:translate-l-9 hover:rotate-3 '>
                <h3 className=''>Track Your Time</h3>
                <Lottie animationData={rightArrow} className='w-[100px] h-50px'></Lottie>
            </div>
        </div>
    );
};

export default Banner;