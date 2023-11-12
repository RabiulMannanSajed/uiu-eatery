import { Outlet, useLocation } from 'react-router-dom';
import NavBar from '../Pages/Shared/NavBar/NavBar';
import Footer from '../Pages/Shared/Footer/Footer';

const Main = () => {
    const location = useLocation(); // this will give u the current location
    const noHederFooter = location.pathname.includes('login') || location.pathname.includes('signup')
    return (
        <div>
            {noHederFooter || <NavBar></NavBar>} {/* when or's before option is false then show nav */}
            <Outlet></Outlet>
            {noHederFooter || <Footer></Footer>}
        </div>
    );
};

export default Main;