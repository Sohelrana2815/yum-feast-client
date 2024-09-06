import { Helmet } from "react-helmet";
import Cover from "../../Shared/Cover/Cover";
import menuImg from "../../assets/menu/menu.jpg";
import useMenu from "../../hooks/useMenu";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
const Menu = () => {
  const [menu] = useMenu();

  const offered = menu.filter((item) => item.category === "offered");
  const dessert = menu.filter((item) => item.category === "dessert");
  const pizza = menu.filter((item) => item.category === "pizza");
  const salad = menu.filter((item) => item.category === "salad");
  const soup = menu.filter((item) => item.category === "soup");

  return (
    <div>
      <Helmet>
        <title>Yum Feast | Menu</title>
      </Helmet>
      <Cover img={menuImg} title="Our menu" />
      <SectionTitle subHeading={"---Don't miss---"} heading={"TODAY'S OFFER"} />
    </div>
  );
};

export default Menu;
