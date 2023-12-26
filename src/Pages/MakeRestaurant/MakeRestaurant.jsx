import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
const img_hosting_token = import.meta.env.VITE_Image_Upload_token;

const MakeRestaurant = () => {
  const { register, control, handleSubmit, setValue, getValues, watch } =
    useForm({
      defaultValues: {
        restaurantName: "",
        menuItems: [
          {
            _id: "",
            name: "",
            recipe: "",
            image: "",
            category: "",
            price: 0.0,
          },
        ],
      },
    });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "menuItems",
  });

  const handleAddMenuItem = () => {
    append({
      _id: uuidv4(),
      name: "",
      recipe: "",
      category: "",
      price: 0.0,
    });
  };

  const handleRemoveMenuItem = (index) => {
    remove(index);
  };

  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);

    // Upload restaurant image
    const restaurantImgRes = await fetch(img_hosting_url, {
      method: "POST",
      body: formData,
    });
    const restaurantImgData = await restaurantImgRes.json();
    const restaurantImgUrl = restaurantImgData.success
      ? restaurantImgData.data.display_url
      : null;

    // Upload menu item images
    const menuItemsWithImages = await Promise.all(
      data.menuItems.map(async (menuItem) => {
        const menuItemFormData = new FormData();
        menuItemFormData.append("image", menuItem.image[0]);

        const menuItemImgRes = await fetch(img_hosting_url, {
          method: "POST",
          body: menuItemFormData,
        });
        const menuItemImgData = await menuItemImgRes.json();
        const menuItemImgUrl = menuItemImgData.success
          ? menuItemImgData.data.display_url
          : null;

        return {
          ...menuItem,
          image: menuItemImgUrl,
        };
      })
    );
    // send data to the data base
    fetch("http://localhost:5000/menu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        restaurantName: data.restaurantName,
        img: restaurantImgUrl,
        menuItems: menuItemsWithImages,
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log("Response from server:", responseData);
      })
      .catch((error) => {
        console.error("Error during fetch:", error);
      });
  };

  return (
    <div>
      <div className="text-3xl text-center font-semibold p-24 bg-slate-500 text-slate-200">
        <h2>Make your own Restaurant at United International University</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="ml-10">
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
          {...register("restaurantName")}
        />
        <br />
        <div className="form-control w-full max-w-xs">
          <label className="label ">
            <span className="label-text ">Item Image*</span>
          </label>
          <input
            {...register("image")}
            type="file"
            className="file-input file-input-bordered w-full "
          />
        </div>
        <br />

        {fields.map((menuItem, index) => (
          <div key={menuItem.id}>
            <div className="flex justify-around">
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
                  {...register(`menuItems.${index}._id`)}
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
                  {...register(`menuItems.${index}.name`)}
                />
              </div>
            </div>
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
              {...register(`menuItems.${index}.recipe`)}
            />
            <br />
            <div className="flex justify-around">
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
                  {...register(`menuItems.${index}.category`)}
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
                  {...register(`menuItems.${index}.price`)}
                />
              </div>
              <br />
              <div className="form-control w-full max-w-xs">
                <label className="label ">
                  <span className="label-text ">Item Image*</span>
                </label>
                <input
                  {...register(`menuItems.${index}.image`)}
                  type="file"
                  className="file-input file-input-bordered w-full "
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
