import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const PostUser = () => {
  const axiosPublic = useAxiosPublic();

  const handlePostUsers = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;

    const userData = {
      email,
      name,
    };
    console.log(userData);

    axiosPublic.post("/users", userData).then((res) => {
      console.log(res.data);

      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "NEW USER CREATED SUCCESSFULLY!",
          text: "Welcome back!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div className="bg-slate-100 rounded-lg">
      <form
        className="w-1/2 mx-auto flex flex-col justify-center min-h-screen"
        onSubmit={handlePostUsers}
      >
        <h2 className="text-center text-4xl font-semibold">
          Create Demo Users
        </h2>
        <div className="grid grid-cols-1 gap-8  my-10">
          <input
            type="text"
            placeholder="Enter Name"
            name="name"
            className="input input-bordered"
          />
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            className="input input-bordered"
          />
          <input type="submit" value="ADD USER" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
};

export default PostUser;
