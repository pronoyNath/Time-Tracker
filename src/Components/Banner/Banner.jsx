import Lottie from 'lottie-react';
import React from 'react';
import bannerAnimation from "../../assets/banner-animation.json"

const Banner = () => {
    return (
        <div>
            <h3 className='text-4xl text-center font-bold my-10'><span className='text-[#3fa92b]'>Welcome To, </span> Time Tracker Web Appication</h3>
            <div className='max-w-6xl mx-auto'>
            <Lottie animationData={bannerAnimation}></Lottie>
            </div>
        </div>
    );
};

export default Banner;