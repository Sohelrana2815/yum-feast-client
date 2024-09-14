import { useForm } from "react-hook-form";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddItems = () => {
  const {
    handleSubmit,
    register,
    reset,

    formState: { errors },
  } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const onSubmit = async (data) => {
    console.log(data);

    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      // now send the menuItem data to the database

      const menuItem = {
        name: data.name,
        category: data.category,
        price: data.price,
        recipe: data.recipe,
        image: res.data.data.display_url,
      };

      const menuRes = await axiosSecure.post("/menus", menuItem);
      if (menuRes.data.insertedId) {
        // show sweet alert or popup
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.name} has been added successfully`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      console.log(menuRes.data);
    }
    console.log(res.data);
  };
  return (
    <div className="mt-10">
      <SectionTitle subHeading="---What's new?---" heading="ADD AN ITEM" />

      <div className="bg-[#F3F3F3]  rounded-2xl px-20 py-16">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card-body space-y-16"
        >
          <div className="form-control">
            <input
              type="text"
              {...register("name")}
              placeholder="Recipe name"
              className="input input-bordered"
              required
            />
          </div>
          {/* break into 2 column */}

          <div className="grid grid-cols-2 gap-8">
            <div className="form-control">
              <select
                {...register("category")}
                defaultValue="default"
                className="select w-full"
              >
                <option value="default" disabled>
                  Select a Category
                </option>
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="dessert">Dessert</option>
                <option value="drinks">Drinks</option>
              </select>
            </div>
            {/* 1  */}
            <div className="form-control">
              <input
                {...register("price")}
                type="number"
                step="0.01"
                min="0"
                placeholder="Price"
                className="input input-bordered"
                required
              />
            </div>
          </div>

          <textarea
            {...register("recipe")}
            className="textarea h-64"
            placeholder="Recipe Details"
          ></textarea>
          <div className=" space-y-5">
            <input type="file" {...register("image")} className="file-input" />
            <br />
            <input type="submit" className="btn btn-primary" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItems;
