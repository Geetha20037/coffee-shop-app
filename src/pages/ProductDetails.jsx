import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  Star,
  Minus,
  Plus,
  ShoppingBag,
} from "lucide-react";
import products from "../data/products";
import { useApp } from "../context/AppContext";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  const {
    favorites,
    toggleFavorite,
    addToCart,
  } = useApp();

  const [size, setSize] = useState("Medium");
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="app-page flex min-h-screen items-center justify-center bg-[#f8f5f0]">
        <p className="app-text">Product not found</p>
      </div>
    );
  }

  const isFavorite = favorites.some(
    (item) => item.id === product.id
  );

  const sizes = [
    { name: "Small", extra: 0 },
    { name: "Medium", extra: 30 },
    { name: "Large", extra: 50 },
  ];

  const selectedSize = sizes.find(
    (item) => item.name === size
  );

  const itemPrice =
    product.price + selectedSize.extra;

  const totalPrice = itemPrice * quantity;

  const handleAddToCart = () => {
    addToCart(product, size, quantity, selectedSize.extra);

    navigate("/cart");
  };

  return (
    <div className="app-page mx-auto min-h-screen max-w-md bg-[#f8f5f0] pb-8">

      {/* IMAGE */}
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="h-[360px] w-full object-cover"
        />

        <div className="absolute left-5 right-5 top-6 flex justify-between">
          <button
            onClick={() => navigate(-1)}
            className="rounded-full bg-white/90 p-3"
          >
            <ArrowLeft size={21} />
          </button>

          <button
            onClick={() => toggleFavorite(product)}
            className="rounded-full bg-white/90 p-3"
          >
            <Heart
              size={21}
              className={
                isFavorite
                  ? "fill-red-500 text-red-500"
                  : "text-stone-700"
              }
            />
          </button>
        </div>
      </div>

      {/* DETAILS */}
      <section className="relative -mt-6 rounded-t-[32px] bg-[#f8f5f0] px-5 pt-7">

        <div className="flex justify-between">
          <div>
            <p className="text-sm font-medium text-[#8b5e3c]">
              {product.category}
            </p>

            <h1 className="mt-1 text-2xl font-bold">
              {product.name}
            </h1>
          </div>

          <div className="flex h-fit items-center gap-1 rounded-full bg-white px-3 py-2">
            <Star
              size={15}
              fill="#f59e0b"
              className="text-amber-500"
            />

            <span className="text-sm font-bold">
              {product.rating}
            </span>
          </div>
        </div>

        <p className="mt-5 text-sm leading-6 text-stone-500">
          {product.description}
        </p>

        {/* SIZE */}
        <h2 className="mt-6 font-bold">
          Choose Size
        </h2>

        <div className="mt-3 grid grid-cols-3 gap-3">
          {sizes.map((item) => (
            <button
              key={item.name}
              onClick={() => setSize(item.name)}
              className={`rounded-2xl border px-3 py-3 text-sm font-semibold ${
                size === item.name
                  ? "border-[#8b5e3c] bg-[#8b5e3c] text-white"
                  : "border-stone-200 bg-white text-stone-600"
              }`}
            >
              {item.name}

              {item.extra > 0 && (
                <span className="block text-xs opacity-70">
                  +₹{item.extra}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* QUANTITY */}
        <div className="mt-6 flex items-center justify-between">

          <div>
            <p className="text-sm text-stone-400">
              Quantity
            </p>

            <div className="mt-2 flex items-center gap-4 rounded-2xl bg-white px-3 py-2">

              <button
                onClick={() =>
                  setQuantity((q) =>
                    Math.max(1, q - 1)
                  )
                }
                className="rounded-xl bg-stone-100 p-2"
              >
                <Minus size={16} />
              </button>

              <span className="font-bold">
                {quantity}
              </span>

              <button
                onClick={() =>
                  setQuantity((q) => q + 1)
                }
                className="rounded-xl bg-stone-100 p-2"
              >
                <Plus size={16} />
              </button>

            </div>
          </div>

          {/* PRICE */}
          <div className="text-right">
            <p className="text-sm text-stone-400">
              Total Price
            </p>

            <p className="text-2xl font-bold text-[#6f472d]">
              ₹{totalPrice}
            </p>
          </div>

        </div>

        {/* ADD TO CART */}
        <button
          onClick={handleAddToCart}
          className="mt-7 flex w-full items-center justify-center gap-3 rounded-2xl bg-[#8b5e3c] py-4 font-bold text-white"
        >
          <ShoppingBag size={20} />
          Add to Cart
        </button>

      </section>
    </div>
  );
}

export default ProductDetails;