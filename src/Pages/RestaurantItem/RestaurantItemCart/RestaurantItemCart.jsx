import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";
import { useState } from "react";
import { useEffect } from "react";

const RestaurantItemCart = ({ dataOfRestaurantsInfo }) => {
  const { img, restaurantName, menuName } = dataOfRestaurantsInfo; // this is called destructinng

  // this is for pp
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  console.log(dataOfRestaurantsInfo);
  console.log(menuName);

  useEffect(() => {
    if (menuName) {
      setData(menuName);
      setLoading(true);
    }
  }, [menuName]);

  if (!dataOfRestaurantsInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* <Cover img={img} title={"Order Food"} restaurantName={restaurantName} /> */}

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
                  <button className="btn bg-slate-300 text-black border-0 border-b-4 mt-4 border-orange-500">
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
