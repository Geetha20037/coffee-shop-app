
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import BottomNav from "../components/BottomNav";
import products from "../data/products";

function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const navigate = useNavigate();

  const categories = [
    "All",
    "Coffee",
    "Tea",
    "Cold Drinks",
    "Desserts",
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      product.category === category;

    return matchesSearch && matchesCategory;
  });

  const handleSeeAll = () => {
    navigate("/menu");
  };

  return (
    <div className="app-page mx-auto min-h-screen max-w-md bg-[#f8f5f0] pb-24 text-stone-800 transition-colors duration-300 dark:bg-[#17120f] dark:text-white">
      <main className="px-5 pt-6">

        <Header />

        {/* GREETING */}
        <section className="mt-7">
          <p className="text-sm text-stone-500 dark:text-stone-400">
            Good morning, Geetha 👋
          </p>

          <h1 className="mt-1 text-3xl font-bold leading-tight">
            Find your perfect

            <span className="block text-[#8b5e3c]">
              coffee for today.
            </span>
          </h1>
        </section>

        {/* SEARCH */}
        <SearchBar
          value={search}
          onChange={setSearch}
        />

        {/* CATEGORIES */}
        <section className="mt-7">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold">
              Categories
            </h2>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2">
            {categories.map((item) => (
              <CategoryCard
                key={item}
                name={item}
                active={category === item}
                onClick={() =>
                  setCategory(item)
                }
              />
            ))}
          </div>
        </section>

        {/* POPULAR COFFEE */}
        <section className="mt-7">
          <div className="mb-4 flex items-center justify-between">

            <h2 className="text-lg font-bold">
              Popular Coffee
            </h2>

            <button
              type="button"
              onClick={handleSeeAll}
              className="flex items-center gap-1 text-sm font-semibold text-[#8b5e3c]"
            >
              See all
              <ArrowRight size={16} />
            </button>

          </div>

          {/* PRODUCTS */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {filteredProducts
                .slice(0, 6)
                .map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
            </div>
          ) : (
            <div className="rounded-2xl bg-white p-8 text-center shadow-sm dark:bg-[#241b17]">
              <p className="font-semibold">
                No coffee found
              </p>

              <p className="mt-1 text-sm text-stone-400">
                Try another search.
              </p>
            </div>
          )}
        </section>

      </main>

      <BottomNav />
    </div>
  );
}

export default Home;