
import { useState } from "react";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  CreditCard,
  Smartphone,
  Banknote,
  Check,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import { useApp } from "../context/AppContext";

function Cart() {
  const navigate = useNavigate();

  const {
    cart,
    updateQuantity,
    removeFromCart,
    darkMode,
  } = useApp();

  const [showPayment, setShowPayment] =
    useState(false);

  const [paymentMethod, setPaymentMethod] =
    useState("UPI");

  const subtotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const deliveryFee =
    cart.length > 0 ? 30 : 0;

  const serviceCharge =
    cart.length > 0 ? 10 : 0;

  const total =
    subtotal + deliveryFee + serviceCharge;

  const paymentOptions = [
    {
      name: "UPI",
      description:
        "Google Pay, PhonePe, Paytm",
      icon: Smartphone,
    },
    {
      name: "Card",
      description:
        "Credit or Debit Card",
      icon: CreditCard,
    },
    {
      name: "Cash",
      description:
        "Cash on Delivery",
      icon: Banknote,
    },
  ];

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    setShowPayment(true);
  };

  const handlePlaceOrder = () => {
    alert(
      `Order placed successfully!\nPayment: ${paymentMethod}\nTotal: ₹${total}`
    );

    setShowPayment(false);
  };

  return (
    <div
      className={`app-page mx-auto min-h-screen max-w-md pb-24 transition-colors duration-300 ${
        darkMode
          ? "bg-[#181411] text-white"
          : "bg-[#f8f5f0] text-stone-800"
      }`}
    >
      <main className="px-5 pt-6">

        {/* HEADER */}
        <div className="flex items-center justify-between">

          <div>
            <p className="text-sm text-stone-400">
              Your
            </p>

            <h1 className="text-2xl font-bold">
              Shopping Cart
            </h1>
          </div>

          <div className="rounded-full bg-[#8b5e3c] p-3 text-white">
            <ShoppingBag size={21} />
          </div>

        </div>

        {/* EMPTY CART */}
        {cart.length === 0 ? (
          <div className="mt-10 rounded-3xl bg-white p-10 text-center shadow-sm dark:bg-[#241b17]">

            <ShoppingBag
              size={45}
              className="mx-auto text-stone-300 dark:text-stone-600"
            />

            <h2 className="mt-4 font-bold">
              Your cart is empty
            </h2>

            <p className="mt-2 text-sm text-stone-400">
              Add your favorite coffee to get started.
            </p>

            <button
              onClick={() =>
                navigate("/menu")
              }
              className="mt-5 rounded-xl bg-[#8b5e3c] px-6 py-3 text-sm font-bold text-white"
            >
              Browse Menu
            </button>

          </div>
        ) : (
          <>
            {/* CART ITEMS */}
            <div className="mt-7 space-y-4">

              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="rounded-3xl bg-white p-4 shadow-sm dark:bg-[#241b17]"
                >

                  <div className="flex gap-4">

                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-24 w-24 rounded-2xl object-cover"
                    />

                    <div className="flex flex-1 flex-col justify-between">

                      {/* NAME + DELETE */}
                      <div className="flex justify-between">

                        <div>
                          <h3 className="font-bold">
                            {item.name}
                          </h3>

                          <p className="mt-1 text-xs text-stone-400">
                            Size: {item.size}
                          </p>
                        </div>

                        <button
                          onClick={() =>
                            removeFromCart(
                              item.id,
                              item.size
                            )
                          }
                          className="text-red-400 transition hover:text-red-500"
                        >
                          <Trash2 size={18} />
                        </button>

                      </div>

                      {/* PRICE + QUANTITY */}
                      <div className="flex items-center justify-between">

                        <span className="font-bold text-[#6f472d] dark:text-[#c99a72]">
                          ₹{item.price}
                        </span>

                        <div className="flex items-center gap-3 rounded-xl bg-stone-100 px-2 py-1 dark:bg-stone-700">

                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.size,
                                -1
                              )
                            }
                            className="rounded-lg p-1 text-stone-700 dark:text-white"
                          >
                            <Minus size={14} />
                          </button>

                          <span className="font-bold">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.size,
                                1
                              )
                            }
                            className="rounded-lg p-1 text-stone-700 dark:text-white"
                          >
                            <Plus size={14} />
                          </button>

                        </div>

                      </div>

                    </div>

                  </div>
                </div>
              ))}

            </div>

            {/* ORDER SUMMARY */}
            <section className="mt-7">

              <h2 className="mb-4 text-lg font-bold">
                Order Summary
              </h2>

              <div className="space-y-4 rounded-3xl bg-white p-5 shadow-sm dark:bg-[#241b17]">

                <div className="flex justify-between text-sm">
                  <span className="text-stone-500 dark:text-stone-400">
                    Subtotal
                  </span>

                  <span className="font-semibold">
                    ₹{subtotal}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-stone-500 dark:text-stone-400">
                    Delivery Fee
                  </span>

                  <span className="font-semibold">
                    ₹{deliveryFee}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-stone-500 dark:text-stone-400">
                    Service Charge
                  </span>

                  <span className="font-semibold">
                    ₹{serviceCharge}
                  </span>
                </div>

                <div className="border-t border-stone-200 pt-4 dark:border-stone-700">

                  <div className="flex justify-between">

                    <span className="font-bold">
                      Total
                    </span>

                    <span className="text-xl font-bold text-[#8b5e3c]">
                      ₹{total}
                    </span>

                  </div>

                </div>

              </div>

            </section>

            {/* CHECKOUT */}
            <button
              onClick={handleCheckout}
              className="mt-6 w-full rounded-2xl bg-[#8b5e3c] py-4 font-bold text-white shadow-lg transition hover:bg-[#70492f]"
            >
              Proceed to Checkout
            </button>

          </>
        )}

      </main>

      <BottomNav />

      {/* PAYMENT MODAL */}
      {showPayment && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50">

          <div
            className={`w-full max-w-md rounded-t-[32px] p-6 ${
              darkMode
                ? "bg-[#29231f] text-white"
                : "bg-[#f8f5f0] text-stone-800"
            }`}
          >

            {/* MODAL HEADER */}
            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-xl font-bold">
                  Payment Method
                </h2>

                <p className="mt-1 text-sm text-stone-400">
                  Choose how you'd like to pay
                </p>
              </div>

              <button
                onClick={() =>
                  setShowPayment(false)
                }
                className="text-xl text-stone-400"
              >
                ✕
              </button>

            </div>

            {/* PAYMENT OPTIONS */}
            <div className="mt-6 space-y-3">

              {paymentOptions.map(
                (option) => {
                  const Icon = option.icon;

                  const selected =
                    paymentMethod ===
                    option.name;

                  return (
                    <button
                      key={option.name}
                      onClick={() =>
                        setPaymentMethod(
                          option.name
                        )
                      }
                      className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${
                        selected
                          ? "border-[#8b5e3c] bg-[#f3ebe4] dark:bg-[#3a2b24]"
                          : "border-stone-200 bg-white dark:border-stone-700 dark:bg-[#241b17]"
                      }`}
                    >

                      <div className="rounded-xl bg-[#8b5e3c] p-3 text-white">
                        <Icon size={21} />
                      </div>

                      <div className="flex-1">

                        <p className="font-bold text-stone-800 dark:text-white">
                          {option.name}
                        </p>

                        <p className="mt-1 text-xs text-stone-400">
                          {option.description}
                        </p>

                      </div>

                      {selected && (
                        <div className="rounded-full bg-[#8b5e3c] p-1 text-white">
                          <Check size={15} />
                        </div>
                      )}

                    </button>
                  );
                }
              )}

            </div>

            {/* AMOUNT */}
            <div className="mt-5 flex justify-between rounded-2xl bg-white p-4 text-stone-800 dark:bg-[#241b17] dark:text-white">

              <span className="font-semibold">
                Amount to Pay
              </span>

              <span className="font-bold text-[#8b5e3c]">
                ₹{total}
              </span>

            </div>

            {/* PAY */}
            <button
              onClick={handlePlaceOrder}
              className="mt-5 w-full rounded-2xl bg-[#8b5e3c] py-4 font-bold text-white transition hover:bg-[#70492f]"
            >
              Pay ₹{total}
            </button>

          </div>
        </div>
      )}

    </div>
  );
}

export default Cart;