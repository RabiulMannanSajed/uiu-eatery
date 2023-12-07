import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Restaurants from "../Pages/Menu/Restaurants/Restaurants";
import RestaurantItem from "../Pages/RestaurantItem/Restauranitem/RestaurantItem";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Dashboard from "../Layout/Dashboard";
import MyCart from "../Pages/Dashboard/MyCart/MyCart";
import AllUsers from "../Pages/Dashboard/Allusers/Allusers";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/menu",
        element: <Restaurants></Restaurants>,
      },
      {
        path: "/restaurantItem/:id", // dinmic route
        element: <RestaurantItem></RestaurantItem>,
        loader: () => fetch("http://localhost:5000/menu"),
        // loader: () => fetch("/menu.json")
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      /* this is way to make the route private  */
      // {
      //   path: "/secret",
      //   element: (
      //     <PrivateRoute>
      //       <Secret></Secret>
      //     </PrivateRoute>
      //   ),
      // },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "myCart",
        element: <MyCart></MyCart>,
      },
      {
        path: "allusers",
        element: <AllUsers></AllUsers>,
      },
    ],
  },
]);
