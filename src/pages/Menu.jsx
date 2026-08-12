
import { useState } from "react";
import { Search } from "lucide-react";
import BottomNav from "../components/BottomNav";
import ProductCard from "../components/ProductCard";
import products from "../data/products";

function Menu() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    "Coffee",
    "Tea",
    "Cold Drinks",
    "Desserts",
  ];

  const filteredProducts = products.filter(
    (product) => {
      const matchesCategory =
        category === "All" ||
        product.category === category;

      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(search.toLowerCase());

      return (
        matchesCategory && matchesSearch
      );
    }
  );

  return (
    <div className="app-page mx-auto min-h-screen max-w-md bg-[#f8f5f0] pb-24 text-stone-800 transition-colors duration-300 dark:bg-[#17120f] dark:text-white">
      <main className="px-5 pt-6">

        {/* PAGE TITLE */}
        <div>
          <p className="text-sm text-stone-400">
            Explore our
          </p>

          <h1 className="text-3xl font-bold text-stone-800 dark:text-white">
            Coffee Menu
          </h1>
        </div>

        {/* SEARCH */}
        <div className="mt-6 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm transition-colors dark:bg-[#241b17]">

          <Search
            size={20}
            className="text-stone-400"
          />

          <input
            type="text"
            placeholder="Search drinks and desserts..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full bg-transparent text-sm text-stone-800 outline-none placeholder:text-stone-400 dark:text-white"
          />

        </div>

        {/* CATEGORY FILTER */}
        <div className="mt-6 flex gap-2 overflow-x-auto pb-2">

          {categories.map((item) => (
            <button
              key={item}
              onClick={() =>
                setCategory(item)
              }
              className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                category === item
                  ? "bg-[#8b5e3c] text-white shadow-sm"
                  : "bg-white text-stone-500 shadow-sm dark:bg-[#241b17] dark:text-stone-300"
              }`}
            >
              {item}
            </button>
          ))}

        </div>

        {/* PRODUCT COUNT */}
        <div className="mt-6 flex items-center justify-between">

          <h2 className="text-lg font-bold text-stone-800 dark:text-white">
            {category === "All"
              ? "All Products"
              : category}
          </h2>

          <span className="text-sm text-stone-400">
            {filteredProducts.length} items
          </span>

        </div>

        {/* PRODUCTS */}
        {filteredProducts.length > 0 ? (
          <div className="mt-4 grid grid-cols-2 gap-4">

            {filteredProducts.map(
              (product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              )
            )}

          </div>
        ) : (
          /* EMPTY STATE */
          <div className="mt-6 rounded-3xl bg-white p-10 text-center shadow-sm dark:bg-[#241b17]">

            <p className="font-semibold text-stone-700 dark:text-white">
              No products found
            </p>

            <p className="mt-2 text-sm text-stone-400">
              Try a different search or category.
            </p>

          </div>
        )}

      </main>

      <BottomNav />
    </div>
  );
}

export default Menu;