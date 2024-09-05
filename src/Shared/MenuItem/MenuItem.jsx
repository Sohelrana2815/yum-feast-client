const MenuItem = ({ item }) => {
  const { name, image, recipe, price } = item;
  return (
    <div className="space-y-2 md:space-y-0 md:flex md:items-center">
      <img
        style={{ borderRadius: "0 200px 200px 200px" }}
        className="w-[120px] md:w-[120px] mb-4 md:mb-0"
        src={image}
        alt={name}
      />
      <div className="flex-1 md:ml-4">
        <h3 className="uppercase text-xl font-normal">{name}--------</h3>
        <p className="text-base font-normal">{recipe}</p>
      </div>
      <p className="text-[#bb8405] text-lg md:text-base">{price}</p>
    </div>
  );
};

export default MenuItem;
