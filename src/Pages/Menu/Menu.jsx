import { Helmet } from "react-helmet";
import Cover from "../../Shared/Cover/Cover";
import menuImg from "../../assets/menu/menu.jpg";
import useMenu from "../../hooks/useMenu";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import MenuCategory from "./MenuCategory/MenuCategory";
import dessertImg from "../../assets/menu/dessert-bg.jpeg";
import pizzaImg from "../../assets/menu/pizza-bg.jpg";
import saladImg from "../../assets/menu/salad-bg.jpg";
import soupImg from "../../assets/menu/soup-bg.jpg";
const Menu = () => {
  const [menu] = useMenu();

  const offered = menu.filter((item) => item.category === "offered");
  const desserts = menu.filter((item) => item.category === "dessert");
  const pizza = menu.filter((item) => item.category === "pizza");
  const salad = menu.filter((item) => item.category === "salad");
  const soup = menu.filter((item) => item.category === "soup");

  return (
    <div>
      <Helmet>
        <title>Yum Feast | Menu</title>
      </Helmet>
      <Cover img={menuImg} title="Our menu" />
      {/* Main menu cover */}
      <SectionTitle subHeading={"---Don't miss---"} heading={"TODAY'S OFFER"} />
      {/* offered item */}
      <MenuCategory items={offered} />
      {/*  Desserts item */}
      <MenuCategory items={desserts} title="Dessert" img={dessertImg} />
      {/* Pizza */}
      <MenuCategory items={pizza} title="Pizza" img={pizzaImg} />
      {/* Salad */}
      <MenuCategory items={salad} title="Salad" img={saladImg} />
      {/* Soup */}
      <MenuCategory items={soup} title="Soup" img={soupImg} />
    </div>
  );
};

export default Menu;
