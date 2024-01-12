import { useContext } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';

const UserProfile = () => {
    const {user,logOut} = useContext(AuthContext);
    const handleLogOut = () => {
        logOut()
    }

    return (
        <div className='h-screen'>
            
        <div className="max-w-md p-8 sm:flex sm:space-x-6 bg-green-900 text-gray-100" >
            <div className="flex-shrink-0 w-full mb-6 h-44 sm:h-32 sm:w-32 sm:mb-0" >
                <img src={user?.photoURL} alt="" className="object-cover object-center w-full h-full rounded bg-gray-500    hover:shadow-green-900 hover:scale-150  hover:ease-in-out duration-1000 hover:delay-150 hover:bg-red-500 hover:text-gray-100 hover:-skew-y-6 hover:origin-top-left hover:-rotate-12" />
            </div>
            <div className="flex flex-col space-y-4" >
                <div >
                    <h2 className="text-2xl font-semibold">{user?.displayName}</h2>
                </div>
                <div className="space-y-1" >
                    <span className="flex items-center space-x-2 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-label="Email address" className="w-4 h-4">
                            <path fill="currentColor" d="M274.6,25.623a32.006,32.006,0,0,0-37.2,0L16,183.766V496H496V183.766ZM464,402.693,339.97,322.96,464,226.492ZM256,51.662,454.429,193.4,311.434,304.615,256,268.979l-55.434,35.636L57.571,193.4ZM48,226.492,172.03,322.96,48,402.693ZM464,464H48V440.735L256,307.021,464,440.735Z"></path>
                        </svg>
                        <span className="text-gray-400">{user?.email}</span>
                    </span>
                    <button onClick={handleLogOut} className="py-2 px-6 text-xl rounded-md font-semibold bg-[#2a7b36] uppercase  hover:shadow-2xl hover:shadow-green-900 hover:scale-150  hover:ease-in-out duration-1000 hover:delay-150 hover:bg-red-500 hover:text-gray-100 hover:-skew-y-6 hover:origin-top-left hover:rotate-45">Logout</button>
                </div>
            </div>
        </div>
        </div>
    );
};

export default UserProfile;