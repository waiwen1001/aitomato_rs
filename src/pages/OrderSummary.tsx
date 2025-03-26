import { AiOutlineMinus, AiOutlinePlus, AiOutlineScan } from "react-icons/ai";
import MainContainer from "../components/MainContainer";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { sources } from "../utils/sources";
import { OrderItem } from "../types/order";
import { addToCart } from "../store/orderSlice";
import { formatPrice } from "../utils/format";

const OrderSummary = () => {
  const { data: order } = useAppSelector((state) => state.order);
  const dispatch = useAppDispatch();

  const handleDecreaseQuantity = (id: string) => {
    const item = order?.orderItems.find((item) => item.id === id);
    if (item && item.quantity > 1) {
      updateQuantity({
        ...item,
        quantity: -1,
      });
    }
  };

  const handleIncreaseQuantity = (id: string) => {
    const item = order?.orderItems.find((item) => item.id === id);
    if (item) {
      updateQuantity({
        ...item,
        quantity: 1,
      });
    }
  };

  const updateQuantity = (item: OrderItem) => {
    console.log(item);
    dispatch(
      addToCart({
        outletId: order?.outletId!,
        queueId: order?.queueId!,
        menuId: item.menuId,
        quantity: item.quantity,
        remark: item.remark,
      })
    );
  };

  return (
    <MainContainer title="Order Summary">
      <div className="w-full h-full">
        <div className="px-3 py-2 flex flex-col">
          {(!order || order.orderItems.length === 0) && (
            <div className="text-sm text-gray-500">
              <img
                src={sources.noItem}
                alt="No items"
                className="w-40 h-40 mx-auto"
              />
              <div className="text-sm text-gray-500 text-center">
                Your cart is empty.
              </div>
            </div>
          )}

          {order && order?.orderItems && order.orderItems.length > 0 && (
            <div>
              <div>
                <div className="text-lg font-semibold text-gray-500 mb-2">
                  Orders
                </div>
                {order.orderItems.map((item) => (
                  <div key={item.id}>
                    <div
                      key={item.id}
                      className="rounded-md p-2 shadow border border-slate-300 mb-2"
                    >
                      <div className="flex gap-2">
                        <img
                          crossOrigin="anonymous"
                          src={item.thumbnailUrl}
                          alt={item.menuName}
                          className="w-16 h-16 rounded-md object-cover"
                        />

                        <div className="flex flex-col flex-1">
                          <div className="text-sm text-orange-500 font-semibold">
                            {item.menuName}
                          </div>
                          <div className="text-xs text-gray-400 mt-2">
                            {item.remark || "No remarks"}
                          </div>
                        </div>
                        <div className="flex flex-col w-26 justify-between">
                          <div className="flex items-center justify-between p-2 rounded-full border border-slate-300 shadow">
                            <button
                              className="flex justify-center items-center w-6 h-6 rounded-full border border-red-500 text-red-500"
                              onClick={() => handleDecreaseQuantity(item.id)}
                            >
                              <AiOutlineMinus size={16} />
                            </button>
                            <span className="text-sm font-semibold text-gray-500">
                              {item.quantity}
                            </span>
                            <button
                              className="flex justify-center items-center w-6 h-6 rounded-full border border-green-500 text-green-500"
                              onClick={() => handleIncreaseQuantity(item.id)}
                            >
                              <AiOutlinePlus size={16} />
                            </button>
                          </div>
                          <div className="text-xs text-right mr-2 font-semibold text-orange-500">
                            {formatPrice(item.price)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="text-sm text-gray-500 mt-2 pt-2 border-t border-slate-300">
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-500">Subtotal</div>
                    <div className="text-xs text-gray-500 font-semibold">
                      {formatPrice(order.subtotal)}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-500">Tax (10%)</div>
                    <div className="text-xs text-gray-500 font-semibold">
                      {formatPrice(order.tax)}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-500">GST (9%)</div>
                    <div className="text-xs text-gray-500 font-semibold">
                      {formatPrice(order.gst)}
                    </div>
                  </div>
                  <div className="flex justify-between items-center my-2 py-2 border-y border-slate-300">
                    <div className="text-sm text-gray-500 font-semibold">
                      Total
                    </div>
                    <div className="text-sm text-orange-500 font-semibold">
                      {formatPrice(order.total)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="fixed bottom-0 left-0 right-0 bg-white p-3 border-t border-slate-300">
                <div className="flex justify-between items-center">
                  <div className="text-lg text-gray-500 font-bold">Total</div>
                  <div className="text-lg text-orange-500 font-bold">
                    {formatPrice(order.total)}
                  </div>
                </div>
                <div className="mt-2">
                  <button className="w-full bg-sky-500 text-white p-2 rounded-md flex items-center justify-center gap-2">
                    <AiOutlineScan size={20} />
                    Scan to submit order
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainContainer>
  );
};

export default OrderSummary;
