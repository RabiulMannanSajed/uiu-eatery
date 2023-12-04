import { FaTrashAlt } from "react-icons/fa";
import useCart from "../../../hooks/useCart";
import Swal from "sweetalert2";

const MyCart = () => {
  const [foodCart, refetch] = useCart();
  console.log(foodCart);

  const total = foodCart.reduce((sum, item) => item.price + sum, 0);

  // this is for  delete
  const handelDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/foodCarts/${item._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          });
      }
    });
  };

  return (
    <div>
      <div className="uppercase font-bold flex justify-evenly items-center h-[60px]">
        <h2>this is my cart{foodCart.length} </h2>
        <p>total Price : BDT {total}</p>
        <button className="btn btn-warning">PAY</button>
      </div>

      {/* table part  */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label># </label>
              </th>
              <th>Food Image</th>
              <th>Food Name</th>
              <th>Price </th>
              <th>Action</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {foodCart.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar items-center">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={item.img}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                      <h1 className="text-sm ">{item.restaurantName}</h1>
                    </div>
                  </div>
                </td>
                <td>{item.name}</td>
                <td>BDT {item.price}</td>
                <th>
                  <button
                    onClick={() => handelDelete(item)}
                    className="btn btn-ghost btn-xs bg-red-400 text-gray-500"
                  >
                    <FaTrashAlt></FaTrashAlt>
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyCart;
