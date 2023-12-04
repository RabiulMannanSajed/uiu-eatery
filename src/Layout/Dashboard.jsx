import { NavLink, Outlet } from "react-router-dom";
import { FaCalendar, FaHome, FaShoppingCart, FaWallet } from "react-icons/fa";
const Dashboard = () => {
  return (
    <div>
      <div className="drawer lg:drawer-open ">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
          <Outlet></Outlet>
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side ">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full text-base-content bg-[#d15454]">
            {/* Sidebar content here */}
            <li>
              <NavLink to="/dashboard/home">
                <FaShoppingCart></FaShoppingCart>User Home
              </NavLink>{" "}
            </li>
            <li>
              <NavLink to="/dashboard/reservations">
                <FaShoppingCart></FaShoppingCart>Reservations
              </NavLink>{" "}
            </li>
            <li>
              <NavLink to="/dashboard/myCart">
                <FaShoppingCart></FaShoppingCart>My cart
              </NavLink>{" "}
            </li>
            <li>
              <NavLink to="/dashboard/payment">
                <FaWallet></FaWallet> Payment History
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/myBooking">
                <FaCalendar></FaCalendar> my booking
              </NavLink>
            </li>
            <div className="divider"></div>
            <li>
              <NavLink to="/">
                <FaHome></FaHome> Home
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
