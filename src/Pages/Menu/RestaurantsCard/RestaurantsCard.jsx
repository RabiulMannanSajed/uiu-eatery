import { Link } from "react-router-dom";
// import useMenu from "../../../hooks/useMenu";

const RestaurantsCard = ( {restaurant}) => {
    const { restaurantName, img, _id } = restaurant;
    
    // const [restaurantsinfo] = useMenu()
    // const menuId = restaurantsinfo.map(id => id._id === _id);
    // console.log("Menu Id", menuId);
    
    return (
        <div>
            <Link to={`/restaurantItem/${_id}`}>
                <div className="card card-compact w-96 bg-base-100 shadow-xl">
                    <figure><img src={img} alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">{restaurantName}</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div className="card-actions justify-end">
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default RestaurantsCard;