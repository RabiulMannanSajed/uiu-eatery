import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Restaurants from "../Pages/Menu/Restaurants/Restaurants";
import RestaurantItem from "../Pages/RestaurantItem/Restauranitem/RestaurantItem";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/menu',
                element: <Restaurants></Restaurants>
            },
            {
                path: '/restaurantItem/:id',
                element: <RestaurantItem></RestaurantItem>,
                loader: () => fetch("http://localhost:5000/menu")
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            }
        ]
    },
]);
