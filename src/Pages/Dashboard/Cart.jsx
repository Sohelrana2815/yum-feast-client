import useCart from "../../hooks/useCart";
import { FaTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
const Cart = () => {
  const [cart, refetch] = useCart();
  const axiosSecure = useAxiosSecure();
  const totalPrice = cart.reduce(
    (acc, currentPrice) => acc + currentPrice.price,
    0
  );

  const handleDelete = (id) => {
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
        axiosSecure.delete(`/carts/${id}`).then((res) => {
          // console.log(res);
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your Food item has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  return (
    <div>
      <div className="flex justify-evenly">
        <h2 className="text-4xl font-semibold">Total orders : {cart.length}</h2>
        <h2 className="text-4xl font-semibold">Total Price : {totalPrice}$</h2>
        {cart.length ? (
          <Link to="/dashboard/payment">
            <button className=" btn btn-primary text-white">Pay</button>
          </Link>
        ) : (
          <button disabled className=" btn btn-primary text-white">
            Pay
          </button>
        )}
      </div>
      <div className="overflow-x-auto mt-10">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>ITEM IMAGE</th>
              <th>ITEM NAME</th>
              <th>PRICE</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="w-24 ">
                    <img
                      src={item.image}
                      className="rounded-lg"
                      alt="Avatar Tailwind CSS Component"
                    />
                  </div>
                </td>
                <td>{item.name}</td>
                <td>{item.price}$</td>
                <th>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-ghost"
                  >
                    <FaTrashCan className="text-red-600 text-lg" />
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

export default Cart;
