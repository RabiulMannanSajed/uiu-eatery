import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
const img_hosting_token = import.meta.env.VITE_Image_Upload_token;

const MakeRestaurant = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      restaurantName: "",
    },
  });

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

    // send data to the data base
    fetch("http://localhost:5000/menu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        restaurantName: data.restaurantName,
        img: restaurantImgUrl,
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        Swal.fire("Added successfully");
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
            <span className="label-text ">Restaurant Image</span>
          </label>
          <input
            {...register("image")}
            type="file"
            className="file-input file-input-bordered w-full "
          />
        </div>
        <br />
        <button className="btn bg-green-400 mt-5" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default MakeRestaurant;
