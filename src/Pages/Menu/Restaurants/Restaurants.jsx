import { useEffect, useState } from "react";
import RestaurantsCard from "../RestaurantsCard/RestaurantsCard";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

const Restaurants = () => {
    const [restaurants, setRestaurants] = useState([]);
    
    useEffect(() => {
        // fetch("menu.json")
        fetch("http://localhost:5000/menu")
            .then(res => res.json())
            .then(data =>
                // console.log(data);
                setRestaurants(data)
            )
    }, [])
    return (
        <section className="mb-12">
            <SectionTitle
                heading={"Our Popular Restaurants"}
                subHeading={" UIU Food Code "}
            ></SectionTitle>
            <div className="grid grid-cols-3 gap-5 ">
                <Helmet>
                    <title>UIU | Resturent</title>
                </Helmet>
                {
                    restaurants.map(restaurant => <RestaurantsCard
                        key={restaurant._id}
                        restaurant={restaurant}
                    ></RestaurantsCard>)
                }

            </div>
        </section>

    );
};

export default Restaurants;