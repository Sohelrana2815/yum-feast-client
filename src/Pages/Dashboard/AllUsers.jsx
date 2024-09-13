import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaTrashCan, FaUsers } from "react-icons/fa6";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();

  const token = localStorage.getItem("access-token");

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `${user.name} WILL BE NEW ADMIN`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make Admin",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/admin/${user._id}`)

          .then((res) => {
            // console.log(res.data);
            if (res.data.modifiedCount > 0) {
              // alert for make admin
              refetch();
              Swal.fire({
                title: "Success",
                text: `${user.name} is new Admin`,
                icon: "success",
              });
            }
          });
      }
    });
  };
  const handleDeleteUser = (user) => {
    // console.log(user._id);
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
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
          // console.log(res);
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "User deleted successfully",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <div className="flex justify-evenly my-6">
        <h2 className="text-3xl font-semibold">All Users</h2>
        <h2 className="text-3xl font-semibold">Total Users {users.length}</h2>
      </div>
      <div className="overflow-x-auto mt-10">
        <table className="table">
          {/* head */}
          <thead className="bg-slate-300">
            <tr>
              <th>#</th>
              <th className="font-bold text-black">USER NAME</th>
              <th className="font-bold text-black">USER EMAIL</th>
              <th className="font-bold text-black">ROLE</th>
              <th className="font-bold text-black">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="hover">
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === "admin" ? (
                    <p className="text-base text-green-400 font-bold">Admin</p>
                  ) : (
                    <button
                      className="btn bg-[#d1a054]"
                      onClick={() => handleMakeAdmin(user)}
                    >
                      <FaUsers className="text-lg text-white " />
                    </button>
                  )}
                </td>
                <td>
                  <button
                    className="btn bg-red-600"
                    onClick={() => handleDeleteUser(user)}
                  >
                    <FaTrashCan className="text-lg text-white" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
