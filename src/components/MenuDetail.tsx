import Slider from "react-slick";
import { Menu } from "../types/outlet";
import { formatPrice } from "../utils/format";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/redux";
import { addToCart } from "../store/orderSlice";
import { toast } from "react-toastify";

const MenuDetail = ({
  menu,
  onClose,
}: {
  menu?: Menu | null;
  onClose: () => void;
}) => {
  if (!menu) return null;

  const dispatch = useAppDispatch();
  const { data: outlet } = useAppSelector((state) => state.outlet);
  const { queueInfo } = useAppSelector((state) => state.queue);

  const [quantity, setQuantity] = useState(1);
  const [remark, setRemark] = useState("");

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = async () => {
    try {
      await dispatch(
        addToCart({
          outletId: outlet!.id,
          queueId: queueInfo!.queue.id,
          menuId: menu.id,
          quantity: quantity,
          remark: remark,
        })
      ).unwrap();

      toast.success("Item added to cart successfully!");
      onClose();
    } catch (error) {
      console.log(error);
      toast.error("Failed to add item to cart");
    }
  };

  return (
    <div className="h-full bg-slate-100">
      <Slider {...settings}>
        {menu.images.map((image) => (
          <div key={image.id} className="w-full h-[250px]">
            <img
              src={image.path}
              alt={menu.name}
              crossOrigin="anonymous"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </Slider>
      <div className="-translate-y-8 rounded-t-xl p-4 pb-24 bg-slate-100">
        <div className="mt-4">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xl font-semibold text-gray-500">
              {menu.name}
            </span>
            <span className="text-xl font-bold text-orange-500 text-right">
              {formatPrice(menu.price)}
              <div className="leading-0">
                <small className="text-xs text-gray-400">Base price</small>
              </div>
            </span>
          </div>
          {menu.description && (
            <div className="mt-4 text-gray-400 text-sm">{menu.description}</div>
          )}
          <div className="mt-4 flex items-center justify-between gap-2">
            <div className="text-sm font-semibold text-gray-500">Quantity</div>
            <div className="flex items-center gap-2">
              <button
                className="flex justify-center items-center w-8 h-8 rounded-md border border-red-500 text-red-500"
                onClick={decreaseQuantity}
              >
                <AiOutlineMinus size={16} />
              </button>
              <span className="text-sm font-semibold text-gray-500 mx-2">
                {quantity}
              </span>
              <button
                className="flex justify-center items-center w-8 h-8 rounded-md border border-green-500 text-green-500"
                onClick={increaseQuantity}
              >
                <AiOutlinePlus size={16} />
              </button>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-sm font-semibold text-gray-500 mb-2">
              Remark
            </div>
            <textarea
              rows={3}
              className="w-full rounded-md border border-gray-300 p-2 text-sm text-gray-500"
              placeholder="Add a remark"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-300">
        <div className="flex items-center justify-between">
          <div className="text-xl font-semibold text-gray-500">Total</div>
          <div className="text-xl font-bold text-orange-500">
            {formatPrice(menu.price * quantity)}
          </div>
        </div>
        <div className="mt-4">
          <button
            className="w-full rounded-md bg-orange-500 text-white p-2 text-sm"
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuDetail;
