
import { Heart, Plus, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

function ProductCard({ product }) {
  const navigate = useNavigate();

  const {
    favorites,
    toggleFavorite,
    addToCart,
  } = useApp();

  const isFavorite = favorites.some(
    (item) => item.id === product.id
  );

  const handleFavorite = (e) => {
    e.stopPropagation();
    toggleFavorite(product);
  };

  const handleCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div
      onClick={() =>
        navigate(`/product/${product.id}`)
      }
      className="group cursor-pointer overflow-hidden rounded-3xl bg-white p-3 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg dark:bg-[#241b17]"
    >
      {/* PRODUCT IMAGE */}
      <div className="relative">

        <img
          src={product.image}
          alt={product.name}
          className="h-40 w-full rounded-2xl object-cover"
        />

        {/* FAVORITE */}
        <button
          onClick={handleFavorite}
          className="absolute right-2 top-2 rounded-full bg-white/90 p-2 shadow-sm transition dark:bg-[#241b17]/90"
        >
          <Heart
            size={17}
            className={
              isFavorite
                ? "fill-red-500 text-red-500"
                : "text-stone-600 dark:text-stone-300"
            }
          />
        </button>

      </div>

      {/* PRODUCT INFO */}
      <div className="px-1 pt-3">

        <h3 className="font-bold text-stone-800 dark:text-white">
          {product.name}
        </h3>

        {/* RATING */}
        <div className="mt-1 flex items-center gap-1">

          <Star
            size={14}
            fill="#f59e0b"
            className="text-amber-500"
          />

          <span className="text-xs font-medium text-stone-500 dark:text-stone-400">
            {product.rating} ({product.reviews})
          </span>

        </div>

        {/* PRICE + CART */}
        <div className="mt-3 flex items-center justify-between">

          <span className="text-lg font-bold text-[#6f472d] dark:text-[#c99a72]">
            ₹{product.price}
          </span>

          <button
            onClick={handleCart}
            className="rounded-xl bg-[#8b5e3c] p-2 text-white transition hover:bg-[#70492f]"
          >
            <Plus size={18} />
          </button>

        </div>

      </div>
    </div>
  );
}

export default ProductCard;