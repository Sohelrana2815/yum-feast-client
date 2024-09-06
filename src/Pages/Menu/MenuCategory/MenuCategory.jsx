import Cover from "../../../Shared/Cover/Cover";
import MenuItem from "../../../Shared/MenuItem/MenuItem";

const MenuCategory = ({ items, title, img }) => {
  return (
    <>
      <div>{title && <Cover img={img} title={title} />}</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-20 ">
        {items.map((item) => (
          <MenuItem key={item._id} item={item} />
        ))}
      </div>
    </>
  );
};

export default MenuCategory;
