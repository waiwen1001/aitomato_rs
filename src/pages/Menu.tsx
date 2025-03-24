import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useEffect, useRef } from "react";
import { fetchMenu } from "../store/outletSlice";
import MainContainer from "../components/MainContainer";
import { IoIosCart } from "react-icons/io";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { formatPrice } from "../utils/format";

const Menu = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data: outlet, categories } = useAppSelector((state) => state.outlet);
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

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
      const offsetPosition = elementPosition + window.pageYOffset - 127;
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

  const rightButton = (
    <button
      className="m-3 p-3 shadow rounded-md border bg-orange-400 border-orange-400 focus:bg-orange-500 active:bg-orange-500"
      onClick={() => {}}
    >
      <IoIosCart color="white" />
    </button>
  );

  return (
    <MainContainer title={outlet?.restaurant.name} rightButton={rightButton}>
      <div className="relative px-3 mt-3 pb-3">
        <div className="fixed top-[67px] left-0 w-full z-10 bg-slate-100 shadow-md border-b border-gray-200">
          <Slider {...settings}>
            {categories?.map((category) => (
              <div key={`category-${category.id}`} className="m-2 pr-1">
                <button
                  type="button"
                  className="p-2 border border-gray-200 rounded shadow focus:outline-none focus:ring-2 focus:ring-orange-400"
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
                  <div className="flex items-center h-[65px]">
                    <img
                      crossOrigin="anonymous"
                      src={item.images[0]?.path}
                      alt={item.name}
                      className="w-16 h-16 rounded-md object-cover"
                    />
                    <div className="mx-2 flex-1 flex flex-col h-full justify-between py-1">
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
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </MainContainer>
  );
};

export default Menu;
