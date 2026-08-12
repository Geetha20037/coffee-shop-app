
import { Search, SlidersHorizontal } from "lucide-react";

function SearchBar({ value, onChange }) {
  return (
    <div className="mt-6 flex gap-3">

      {/* SEARCH INPUT */}
      <div className="flex flex-1 items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm transition-colors dark:bg-[#241b17]">

        <Search
          size={20}
          className="text-stone-400"
        />

        <input
          type="text"
          placeholder="Search your coffee..."
          value={value}
          onChange={(e) =>
            onChange?.(e.target.value)
          }
          className="w-full bg-transparent text-sm text-stone-800 outline-none placeholder:text-stone-400 dark:text-white"
        />

      </div>

      {/* FILTER BUTTON */}
      <button
        type="button"
        className="rounded-2xl bg-[#8b5e3c] px-4 text-white shadow-sm transition hover:bg-[#754b2f]"
      >
        <SlidersHorizontal size={20} />
      </button>

    </div>
  );
}

export default SearchBar;