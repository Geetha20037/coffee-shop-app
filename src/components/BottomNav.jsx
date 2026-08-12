
import {
  Home,
  Coffee,
  ShoppingBag,
  User,
} from "lucide-react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      name: "Home",
      path: "/",
      icon: Home,
    },
    {
      name: "Menu",
      path: "/menu",
      icon: Coffee,
    },
    {
      name: "Cart",
      path: "/cart",
      icon: ShoppingBag,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: User,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 z-50 w-full max-w-md -translate-x-1/2 border-t border-stone-200 bg-white px-5 py-3 shadow-lg transition-colors duration-300 dark:border-stone-700 dark:bg-[#241b17]">
      <div className="flex items-center justify-around">

        {navItems.map((item) => {
          const Icon = item.icon;

          const isActive =
            location.pathname === item.path;

          return (
            <button
              key={item.name}
              type="button"
              onClick={() =>
                navigate(item.path)
              }
              className={`flex flex-col items-center gap-1 rounded-xl px-4 py-1.5 transition ${
                isActive
                  ? "text-[#8b5e3c]"
                  : "text-stone-400 dark:text-stone-500"
              }`}
            >
              <Icon
                size={21}
                strokeWidth={
                  isActive ? 2.5 : 2
                }
              />

              <span className="text-[11px] font-semibold">
                {item.name}
              </span>
            </button>
          );
        })}

      </div>
    </nav>
  );
}

export default BottomNav;