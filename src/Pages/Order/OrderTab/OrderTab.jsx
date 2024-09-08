import FoodCard from "../../../Components/FoodCard/FoodCard";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

const itemPerPage = 6;

const OrderTab = ({ items }) => {
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };
  return (
    <Swiper pagination={pagination} modules={[Pagination]} className="mySwiper">
      <SwiperSlide>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 ">
          {items.map((item) => (
            <FoodCard key={item._id} item={item} />
          ))}
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default OrderTab;
