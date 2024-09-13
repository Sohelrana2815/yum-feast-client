import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";
const FoodCard = ({ item }) => {
  const { name, image, recipe, price, _id } = item;
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const [, refetch] = useCart();

  const handleAddFoodItem = () => {
    if (user && user?.email) {
      // sent cart items to the database

      const cartItem = {
        menuId: _id,
        email: user.email,
        name,
        image,
        price,
      };

      // sweet alert

      axiosSecure.post("/carts", cartItem).then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${name} Added to your cart!`,
            showConfirmButton: false,
            timer: 1000,
          });
          // refetch cart to update cart items
          refetch();
        }
      });
    } else {
      Swal.fire({
        title: "You are not Logged in!",
        text: "Please login to add to cart items",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, LOGIN",
      }).then((result) => {
        if (result.isConfirmed) {
          // navigate user to the login page.
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  return (
    <>
      <div className="card bg-[#F3F3F3] w-96 shadow-xl border p-4">
        <figure>
          <img className="rounded-lg" src={image} alt="Shoes" />
        </figure>
        <p className="text-white font-medium bg-black absolute right-0 mr-10 top-6 rounded-full text-lg px-4">
          ${price}
        </p>
        <div className="card-body">
          <h2 className=" font-semibold text-xl text-center">{name}</h2>
          <p>{recipe}</p>
          <div className="card-actions justify-center">
            <button
              onClick={handleAddFoodItem}
              className="btn btn-outline text-[#bb8405] border-0 border-b-4 border-b-[#bb8405] uppercase hover:text-[#bb8405]
            hover:border-b-[#bb8405] "
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FoodCard;
