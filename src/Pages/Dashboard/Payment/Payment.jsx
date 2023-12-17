import { useContext, useEffect, useState } from "react";
import useOrdered from "../../../hooks/useOrdered";
import CheckoutForm from "./CheckoutForm";
import { AuthContext } from "../../../Provider/AuthProvider";
import useUser from "../../../hooks/useUser";
import Swal from "sweetalert2";

const Payment = () => {
  const { user } = useContext(AuthContext);
  const [users] = useUser();

  const [foodCarts, refetch] = useOrdered();
  const [orderedFood, setOrderedFood] = useState([]);

  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const userInfo = users.find(
      (userEmail) => userEmail?.email === user?.email
    );
    console.log("present user info", userInfo);
    setUserData(userInfo);
  }, []);

  useEffect(() => {
    const userFood = foodCarts.filter(
      (oderEmail) => oderEmail?.email == user?.email
    );
    console.log(userFood);
    console.log("Cart length", userFood.length);
    setOrderedFood(userFood);
  }, [foodCarts, user?.email]);
  const total = orderedFood.reduce((sum, item) => sum + item.price, 0);
  const price = parseFloat(total.toFixed(2));

  //  TODO : update the foodCarts add this is payment done
  //  in this collection payment is not done then show them to the user
  const handlePay = (userData) => {
    const updatedOrderedFood = orderedFood.map((item) => ({
      ...item,
      payment: "done",
    }));
    fetch(
      `http://localhost:5000/foodCarts/paymentDone?email=${userData?.email}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedOrderedFood),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          Swal.fire(`Total ${total} Payment Done `);
        }
      });
    console.log("paying email", userData.email);
  };

  return (
    <div>
      <h2>I want to pay</h2>
      {/* we will show those un paid items  */}
      {orderedFood.map((paid) => (
        <div key={paid._id}>
          {paid.payment === "done" ? (
            <></>
          ) : (
            <>
              {" "}
              <div>
                <p>Total Food you ordered : {orderedFood.length}</p>
                <p>Price : {price}</p>
              </div>
              <button
                onClick={() => handlePay(userData)}
                disabled={orderedFood.length === 0}
              >
                pay
              </button>{" "}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Payment;
