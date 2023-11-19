import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";
import { useState } from "react";
import { useEffect } from "react";
// import orderCover from '../../../assets/shop/banner2.jpg'

const RestaurantItemCart = ({ dataOfRestaurantsInfo }) => {
  /**  this is for client to understand why this  is showing error
   *  when i am reload the page this is showing me error the value of map is undefine
   * why , how can take help from chatgpt ,how we use
   */

  //     const { img, restaurantName, menuName } = dataOfRestaurantsInfo;

  //     // this is for pp
  //     const [loading, setLoading] = useState(false)
  //     const [data, setData] = useState([])

  //     console.log(dataOfRestaurantsInfo);
  //     console.log(menuName);

  //     // this is will solve the reload problem when we reload the page showing the it is undefine  to solve this problem

  //     /// this is for pp is work then put it
  //     useEffect(() => {
  //         setTimeout(() => {
  //             const items = menuName;
  //             setData(items);
  //             setLoading(true)
  //         }, 1000);
  //     }, [menuName])

  //     if (!dataOfRestaurantsInfo) {
  //         return <div>Loading...</div>
  //     }

  //     // TODO : Error
  //     //   after come to  the page then it okk if i reload the page this time the value of menuItem is undefine
  //     // solve the issue
  //     return (
  //         <div >
  //             <Helmet>
  //                 <title>UIU Eater | Order Food</title>
  //             </Helmet>
  //             <Cover img={img} title={"Order Food"} restaurantName={restaurantName}></Cover>
  //             <h4 className="text-4xl">TODO : here show the data of specific restaurant item map the data from to find or use</h4>

  //             <div className="grid grid-cols-3 gap-5">
  //                 {
  //                     data.map((menuItem) => (
  //                         <div key={menuItem._id} className="card w-96 bg-base-100 shadow-xl">
  //                             <figure><img src={menuItem.image} alt={menuItem.name} />
  //                             </figure>
  //                             <p className="absolute right-0 mr-4 mt-4 px-4 bg-black text-white">${menuItem.price}</p>
  //                             <div className="card-body flex flex-col items-center ">
  //                                 <h2 className="card-title">{menuItem.name}</h2>
  //                                 <p>{menuItem.recipe}</p>
  //                                 <div className="card-actions justify-end">
  //                                     <button className="btn bg-slate-300 text-black border-0 border-b-4 mt-4 border-orange-500">Add to Cart</button>
  //                                 </div>
  //                             </div>
  //                         </div>
  //                     ))
  //                 }
  //             </div>
  //         </div>
  //     );
  // }

  // end

  const { img, restaurantName, menuName } = dataOfRestaurantsInfo; // this is called destructinng

  // this is for pp
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  console.log(dataOfRestaurantsInfo);
  console.log(menuName);

  // Check if menuName is not undefined before setting data
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
      <Helmet>
        <title>UIU Eater | Order Food</title>
      </Helmet>
      <Cover img={img} title={"Order Food"} restaurantName={restaurantName} />

      <div className="grid grid-cols-3 gap-5 mt-5">
        {/* tarnary oparetor  */}
        {/*  condition ? ture : false  */}
        {loading ? (
          data.map((menuItem) => (
            // all from degiui card

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
