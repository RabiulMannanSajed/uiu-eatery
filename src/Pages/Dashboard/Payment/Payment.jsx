import useCart from "../../../hooks/useCart";
import CheckoutForm from "./CheckoutForm";

const Payment = () => {
  const [foodCart, refetch] = useCart();
  const total = foodCart.reduce((sum, item) => sum + item.price, 0);
  const price = parseFloat(total.toFixed(2));

  return (
    <div>
      <h2>I want to pay</h2>
      <CheckoutForm foodCart={foodCart} price={price}></CheckoutForm>
    </div>
  );
};

export default Payment;
