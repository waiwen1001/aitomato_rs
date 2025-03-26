import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useEffect, useRef, useState } from "react";
import { fetchMenu } from "../store/outletSlice";
import MainContainer from "../components/MainContainer";
import { IoIosCart } from "react-icons/io";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { formatPrice } from "../utils/format";
import FullScreenModal from "../components/FullScreenModal";
import MenuDetail from "../components/MenuDetail";
import { Menu as MenuType } from "../types/outlet";

const Menu = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data: outlet, categories } = useAppSelector((state) => state.outlet);
  const { data: order } = useAppSelector((state) => state.order);
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<MenuType | null>(null);

  useEffect(() => {
    if (!outlet) {
      navigate("/");
    }
  }, [outlet, navigate]);

  useEffect(() => {
    if (outlet) {
      dispatch(fetchMenu(outlet.id));
    }
  }, [outlet, dispatch]);

  const handleCategoryClick = (categoryId: string) => {
    const categoryElement = categoryRefs.current[categoryId];
    if (categoryElement) {
      const elementPosition = categoryElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - 127;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 1,
    swipeToSlide: true,
    variableWidth: true,
    arrows: false,
  };

  console.log(order);

  const rightButton = (
    <button
      className="m-3 p-3 shadow rounded-md border bg-orange-400 border-orange-400 focus:bg-orange-500 active:bg-orange-500"
      onClick={() => navigate("/order-summary")}
    >
      <IoIosCart color="white" />
      {order?.orderItems && order.orderItems.length > 0 && (
        <span className="absolute top-2 right-2 inline-flex items-center justify-center text-xs leading-none rounded-full w-5 h-5 bg-sky-500 text-white">
          {order.orderItems.length}
        </span>
      )}
    </button>
  );

  const handleMenuDetailClick = (menu: MenuType) => {
    setSelectedMenu(menu);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMenu(null);
  };

  return (
    <MainContainer title={outlet?.restaurant.name} rightButton={rightButton}>
      <div className="relative px-3 mt-3 pb-3">
        <div className="fixed top-16 left-0 w-full z-10 bg-slate-100 shadow-md border-b border-gray-300">
          <Slider {...settings}>
            {categories?.map((category) => (
              <div key={`category-${category.id}`} className="m-2 pr-1">
                <button
                  type="button"
                  className="p-2 border border-gray-300 rounded shadow focus:outline-none focus:ring-2 focus:ring-orange-400"
                  onClick={() => handleCategoryClick(category.id)}
                >
                  {category.name}
                </button>
              </div>
            ))}
          </Slider>
        </div>

        <div className="mt-20">
          {categories?.map((category) => (
            <div
              key={category.id}
              ref={(el) => {
                categoryRefs.current[category.id] = el;
              }}
            >
              <div className="font-semibold text-lg mb-2 border-b border-gray-300">
                {category.name}
              </div>
              {category.menus.map((item) => (
                <div key={item.id} className="mb-2">
                  <button
                    className="flex items-center h-[65px] w-full"
                    onClick={() => handleMenuDetailClick(item)}
                  >
                    <img
                      crossOrigin="anonymous"
                      src={item.thumbnail}
                      alt={item.name}
                      className="w-16 h-16 rounded-md object-cover"
                    />
                    <div className="mx-2 flex-1 flex flex-col h-full text-left justify-between py-1">
                      <div className="font-semibold text-sm text-orange-400">
                        {item.name}
                      </div>
                      <div className="text-xs text-gray-400 line-clamp-2">
                        {item.description}
                      </div>
                    </div>
                    <div className="font-semibold w-18 text-right text-emerald-400">
                      {formatPrice(item.price)}
                    </div>
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <FullScreenModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedMenu?.name}
      >
        <MenuDetail menu={selectedMenu} onClose={handleCloseModal} />
      </FullScreenModal>
    </MainContainer>
  );
};

export default Menu;
