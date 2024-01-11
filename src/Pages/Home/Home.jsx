import Navbar from '../../Components/Navbar/Navbar';
import Banner from '../../Components/Banner/Banner';
import Footer from '../../Components/Footer/Footer';

const Home = () => {
    return (
        <div className='font-poppins overflow-hidden'>
            <Navbar></Navbar>
            <Banner></Banner>
            <Footer></Footer>
        </div>
    );
};

export default Home;