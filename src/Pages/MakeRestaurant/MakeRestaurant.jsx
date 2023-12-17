import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
const MakeRestaurant = () => {
  const [restaurantName, setRestaurantName] = useState("");
  const [menuName, setMenuItems] = useState([
    {
      _id: "",
      name: "",
      recipe: "",
      image: "",
      category: "",
      price: 0.0,
    },
  ]);

  const handleRestaurantNameChange = (event) => {
    setRestaurantName(event.target.value);
  };

  const handleMenuItemChange = (index, field, value) => {
    const updatedMenuItems = [...menuName];
    updatedMenuItems[index][field] = value;
    setMenuItems(updatedMenuItems);
  };

  const handleAddMenuItem = () => {
    setMenuItems([
      ...menuName,
      {
        _id: uuidv4(),
        name: "",
        recipe: "",
        category: "",
        price: 0.0,
      },
    ]);
  };

  const handleRemoveMenuItem = (index) => {
    const updatedMenuItems = [...menuName];
    updatedMenuItems.splice(index, 1);
    setMenuItems(updatedMenuItems);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // You can access the restaurantName, and menuItems in this function
    // post those info in dataBase'
    const data = {
      restaurantName,
      menuName,
    };

    fetch("http://localhost:5000/menu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log({ restaurantName, menuItems: menuName });
  };

  return (
    <div>
      <div className="text-3xl text-center font-semibold p-24 bg-slate-500 text-slate-200">
        <h2>Make you won Restaurant at United International University</h2>
      </div>
      <form onSubmit={handleSubmit} className="ml-10">
        <label className="label">
          <span className="label-text text-xl font-semibold">
            {" "}
            Restaurant Name:
          </span>
        </label>

        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Enter the Restaurant name You want to make "
          value={restaurantName}
          onChange={handleRestaurantNameChange}
        />
        <br />

        <br />
        {menuName.map((menuItem, index) => (
          <div key={index}>
            <div className="flex justify-around">
              {/* this is for id  */}
              <div className="w-2/4 mr-5">
                <label className="label">
                  <span className="label-text text-xl font-semibold">
                    {" "}
                    Menu Item _id:{" "}
                  </span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Place mantain the index Number  "
                  value={menuItem._id}
                  onChange={(event) =>
                    handleMenuItemChange(index, "_id", event.target.value)
                  }
                />
              </div>
              <div className="w-2/4 ">
                <label className="label">
                  <span className="label-text text-xl font-semibold">
                    {" "}
                    Menu Item Name:
                  </span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Enter the item name "
                  value={menuItem.name}
                  onChange={(event) =>
                    handleMenuItemChange(index, "name", event.target.value)
                  }
                />
              </div>
            </div>{" "}
            <br />
            <label className="label">
              <span className="label-text text-xl font-semibold">
                {" "}
                Menu Item Recipe:
              </span>
            </label>
            <textarea
              className="input input-bordered w-full"
              placeholder="Give a short description about this food item "
              value={menuItem.recipe}
              onChange={(event) =>
                handleMenuItemChange(index, "recipe", event.target.value)
              }
            />
            <br />
            <div className="flex justify-around">
              {/* this is for food category */}
              <div className="w-2/4 mr-5">
                <label className="label">
                  <span className="label-text text-xl font-semibold">
                    {" "}
                    Menu Item Category:
                  </span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Type Of this item (Salad,Drinks,Dessert"
                  value={menuItem.category}
                  onChange={(event) =>
                    handleMenuItemChange(index, "category", event.target.value)
                  }
                />
              </div>
              <div className="w-2/4 ">
                <label className="label">
                  <span className="label-text text-xl font-semibold">
                    {" "}
                    Menu Item Price:
                  </span>
                </label>
                <input
                  type="number"
                  className="input input-bordered w-full"
                  placeholder="Enter the price of the food "
                  value={menuItem.price}
                  onChange={(event) =>
                    handleMenuItemChange(
                      index,
                      "price",
                      parseFloat(event.target.value)
                    )
                  }
                />
              </div>
            </div>
            <button
              className="btn bg-green-400 mt-5"
              type="button"
              onClick={() => handleRemoveMenuItem(index)}
            >
              Remove Item
            </button>
          </div>
        ))}
        <br />
        <button
          className="btn bg-green-400 mt-5"
          type="button"
          onClick={handleAddMenuItem}
        >
          Add Item
        </button>
        <br />
        <button className="btn bg-green-400 mt-5" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default MakeRestaurant;
