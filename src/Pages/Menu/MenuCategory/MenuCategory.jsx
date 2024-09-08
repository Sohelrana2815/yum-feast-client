import { Link } from "react-router-dom";
import Cover from "../../../Shared/Cover/Cover";
import MenuItem from "../../../Shared/MenuItem/MenuItem";

const MenuCategory = ({ items, title, img }) => {
  return (
    <>
      <div>
        {title && (
          <Link to={`/order/${title}`} className="flex justify-center mb-8">
            <button className="btn  border-b-4 btn-outline border-0 border-b-black">
              ORDER YOUR FAVORITE FOOD
            </button>
          </Link>
        )}
        {title && <Cover img={img} title={title} />}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-20 ">
          {items.map((item) => (
            <MenuItem key={item._id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default MenuCategory;
