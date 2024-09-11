import useCart from "../../hooks/useCart";

const Cart = () => {
  const [cart] = useCart();

  const totalPrice = cart.reduce(
    (acc, currentPrice) => acc + currentPrice.price,
    0
  );
  return (
    <div className="flex justify-evenly">
      <h2 className="text-4xl font-semibold">Total orders : {cart.length}</h2>
      <h2 className="text-4xl font-semibold">Total Price : {totalPrice}$</h2>
      <button className=" btn btn-primary text-white">Pay</button>
    </div>
  );
};

export default Cart;
