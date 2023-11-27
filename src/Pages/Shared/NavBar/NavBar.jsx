import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
const NavBar = () => {
  // for login logout
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        alert(`${user?.email} LogOut`);
      })
      .catch((error) => alert(error));
  };
  //  end
  const navPotion = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/menu">Our Restaurant </Link>
      </li>
      {user ? (
        <>
          <button onClick={handleLogOut} className="btn btn-ghost">
            LogOut
          </button>
        </>
      ) : (
        <>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </>
      )}
    </>
  );

  // // implement search
  const [menuData, setMenuData] = useState([]); // set the item data form data base
  const [filteredItem, setFilteredItem] = useState([]);

  useEffect(() => {
    // fetch("http://localhost:5000/fooditem")
      fetch("item.json")
      .then((res) => res.json())
      .then((data) => setMenuData(data));
  }, []);
  console.log(menuData);
  const handleSearch = (event) => {
    const searchFood = event.target.value;
    console.log(searchFood);

    if (searchFood) {
      const filtered = menuData.filter((item) => item.category === searchFood);
      setFilteredItem(filtered);
    } else {
      setFilteredItem([]);
    }
  };

  //search end

  return (
    <>
      <div className="navbar fixed z-10 bg-opacity-30 bg-slate-900 text-white max-w-screen-xl">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            {/* for small device (dropdown-content)*/}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-black"
            >
              {navPotion}
            </ul>
          </div>
          <img src={logo} alt="" />
        </div>
        {/* laptop view */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navPotion}</ul>
        </div>

        {/* implement the new search field  */}

        <div>
          <input
            className="input input-bordered w-24 md:w-auto text-black"
            type="text"
            onBlur={handleSearch}
            placeholder="Search by category"
          />
        </div>
        {/* show search item */}
        <label htmlFor="my_modal_6" className="btn btn-sm">
          Search
        </label>
        <input type="checkbox" id="my_modal_6" className="modal-toggle" />
        <div className="modal" role="dialog">
          <div className="modal-box">
            <div className="grid grid-cols-2 gap-5">
              {filteredItem.length > 0 ? (
                filteredItem.map((item) => (
                  <div key={item._id}>
                    <p className="text-black text-amber-500 text-xl">
                      {item.restaurantName}
                    </p>

                    <p className="text-black">Price: {item.price}$</p>
                  </div>
                ))
              ) : (
                <p className="text-red-500 ">No items found.</p>
              )}
            </div>
            <div className="modal-action">
              <label htmlFor="my_modal_6" className="btn bg-orange-500">
                Close
              </label>
            </div>
          </div>
        </div>
        {/* TODO : when user login then do it  */}

        {/* <div className="navbar-end">
          <span>{user?.email}</span>
        </div> */}
        <div className="indicator">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span className="badge badge-xs badge-primary indicator-item">1</span>
        </div>
      </div>
    </>
  );
};

export default NavBar;
