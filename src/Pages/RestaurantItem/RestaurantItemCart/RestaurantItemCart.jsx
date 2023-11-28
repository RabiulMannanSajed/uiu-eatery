import Cover from "../../Shared/Cover/Cover";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";

const RestaurantItemCart = ({ dataOfRestaurantsInfo }) => {
  const { img, restaurantName, menuName } = dataOfRestaurantsInfo; // this is called destructinng
  const { user } = useContext(AuthContext);
  // this is for pp
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [foods, setFoods] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(dataOfRestaurantsInfo);
  // console.log(menuName);

  useEffect(() => {
    if (menuName) {
      setData(menuName);
      setLoading(true);
    }
  }, [menuName]);

  // this is for food json call
  useEffect(() => {
    fetch("http://localhost:5000/foodItem")
      .then((res) => res.json())
      .then((data) => setFoods(data));
  }, []);

  if (!dataOfRestaurantsInfo) {
    return <div>Loading...</div>;
  }

  // not finish yet
  const handleAddToCart = (item) => {
    const addFood = foods.find((food) => food._id == item);
    console.log(addFood);
    if (user) {
      // we will send those data to our data base
      const orderItem = { foodId: addFood._id };

      fetch("http://localhost:5000/foodCart")
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your work has been saved",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    } else {
      Swal.fire({
        title: "Place Login to order the food !",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  return (
    <div>
      <Cover img={img} title={"Order Food"} restaurantName={restaurantName} />

      <div className="grid grid-cols-3 gap-5 mt-5">
        {loading ? (
          data.map((menuItem) => (
            <div key={menuItem._id} className="card w-96 bg-base-100 shadow-xl">
              <figure>
                <img src={menuItem.image} alt={menuItem.name} />
              </figure>
              <p className="absolute right-0 mr-4 mt-4 px-4 bg-black text-white">
                ${menuItem.price}
              </p>
              <div className="card-body flex flex-col items-center">
                <h2 className="card-title">{menuItem.name}</h2>
                <p>{menuItem.recipe}</p>
                <div className="card-actions justify-end">
                  <button
                    // taking the item id
                    onClick={() => handleAddToCart(menuItem._id)}
                    className="btn bg-slate-300 text-black border-0 border-b-4 mt-4 border-orange-500"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default RestaurantItemCart;
