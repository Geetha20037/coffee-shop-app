
import {
  Coffee,
  CupSoda,
  IceCreamBowl,
  Leaf,
} from "lucide-react";

function CategoryCard({
  name,
  active,
  onClick,
}) {
  const icons = {
    Coffee,
    Tea: Leaf,
    "Cold Drinks": CupSoda,
    Desserts: IceCreamBowl,
  };

  const Icon = icons[name] || Coffee;

  return (
    <button
      onClick={onClick}
      className={`flex min-w-[82px] flex-col items-center gap-2 rounded-2xl px-3 py-3 transition-all duration-200 ${
        active
          ? "bg-[#8b5e3c] text-white shadow-md"
          : "bg-white text-stone-500 shadow-sm dark:bg-[#241b17] dark:text-stone-300"
      }`}
    >
      <Icon size={22} />

      <span className="text-xs font-semibold">
        {name}
      </span>
    </button>
  );
}

export default CategoryCard;