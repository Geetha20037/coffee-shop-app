
import { useEffect, useState } from "react";
import {
  User,
  Heart,
  ShoppingBag,
  Settings,
  Bell,
  Moon,
  Globe,
  LogOut,
  MapPin,
  ChevronRight,
  Sun,
} from "lucide-react";
import BottomNav from "../components/BottomNav";
import { useApp } from "../context/AppContext";

function Profile() {
  // Get dark mode from AppContext
  const {
    favorites,
    darkMode,
    setDarkMode,
  } = useApp();

  const [user, setUser] = useState({
    name: "Geetha Priya",
    email: "geetha@example.com",
  });

  const [notifications, setNotifications] = useState(
    localStorage.getItem("notifications") !== "false"
  );

  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "English"
  );

  const [address, setAddress] = useState(
    localStorage.getItem("deliveryAddress") ||
      "Bengaluru, India"
  );

  // Load saved user
  useEffect(() => {
    const savedUser =
      localStorage.getItem("coffeeUser");

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        console.log("Invalid saved user");
      }
    }
  }, []);

  // Delivery Location
  const handleLocation = () => {
    const newLocation = window.prompt(
      "Enter your delivery location:",
      address
    );

    if (newLocation && newLocation.trim()) {
      const location = newLocation.trim();

      setAddress(location);
      localStorage.setItem(
        "deliveryAddress",
        location
      );

      alert("Delivery location updated!");
    }
  };

  // Language
  const handleLanguage = () => {
    const selected = window.prompt(
      "Enter language: English, Telugu or Tamil",
      language
    );

    if (!selected) return;

    const value = selected
      .trim()
      .toLowerCase();

    if (value === "english") {
      setLanguage("English");
      localStorage.setItem(
        "language",
        "English"
      );
    } else if (value === "telugu") {
      setLanguage("Telugu");
      localStorage.setItem(
        "language",
        "Telugu"
      );
    } else if (value === "tamil") {
      setLanguage("Tamil");
      localStorage.setItem(
        "language",
        "Tamil"
      );
    } else {
      alert(
        "Please enter English, Telugu or Tamil."
      );
      return;
    }

    alert("Language updated!");
  };

  // Logout
  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    localStorage.removeItem("coffeeUser");
    localStorage.removeItem("isLoggedIn");

    alert("Logged out successfully!");
  };

  return (
    <div className="app-page mx-auto min-h-screen max-w-md pb-24 transition-colors duration-300">
      <main className="px-5 pt-7">

        {/* HEADER */}
        <p className="text-sm text-stone-400">
          Account
        </p>

        <h1 className="app-text mt-1 text-3xl font-bold">
          My Profile
        </h1>

        {/* USER PROFILE */}
        <section className="app-card mt-6 rounded-3xl bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">

            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#8b5e3c] text-white">
              <User size={30} />
            </div>

            <div>
              <h2 className="app-text text-lg font-bold">
                {user?.name || "Geetha Priya"}
              </h2>

              <p className="text-sm text-stone-400">
                {user?.email ||
                  "geetha@example.com"}
              </p>
            </div>

          </div>
        </section>

        {/* FAVORITES + ORDERS */}
        <div className="mt-5 grid grid-cols-2 gap-3">

          {/* FAVORITES */}
          <button
            onClick={() =>
              alert(
                `You have ${favorites.length} favorite item(s).`
              )
            }
            className="app-card rounded-3xl bg-white p-5 text-left shadow-sm transition hover:scale-[1.02]"
          >
            <Heart
              size={22}
              className="text-red-500"
            />

            <p className="app-text mt-3 text-2xl font-bold">
              {favorites.length}
            </p>

            <p className="text-sm text-stone-400">
              Favorite Items
            </p>
          </button>

          {/* ORDERS */}
          <button
            onClick={() =>
              alert(
                "Your order history will appear here."
              )
            }
            className="app-card rounded-3xl bg-white p-5 text-left shadow-sm transition hover:scale-[1.02]"
          >
            <ShoppingBag
              size={22}
              className="text-[#8b5e3c]"
            />

            <p className="app-text mt-3 text-2xl font-bold">
              0
            </p>

            <p className="text-sm text-stone-400">
              Orders
            </p>
          </button>

        </div>

        {/* DELIVERY */}
        <section className="mt-6">

          <h2 className="app-text mb-3 text-lg font-bold">
            Delivery
          </h2>

          <button
            onClick={handleLocation}
            className="app-card flex w-full items-center gap-3 rounded-2xl bg-white p-4 text-left shadow-sm"
          >
            <MapPin
              size={21}
              className="text-[#8b5e3c]"
            />

            <div className="flex-1">

              <p className="text-xs text-stone-400">
                Delivery Location
              </p>

              <p className="app-text mt-1 font-semibold">
                {address}
              </p>

            </div>

            <ChevronRight
              size={18}
              className="text-stone-400"
            />
          </button>

        </section>

        {/* SETTINGS */}
        <section className="mt-6">

          <div className="mb-3 flex items-center gap-2">
            <Settings size={19} />

            <h2 className="app-text text-lg font-bold">
              Settings
            </h2>
          </div>

          <div className="app-card overflow-hidden rounded-3xl bg-white shadow-sm">

            {/* NOTIFICATIONS */}
            <button
              onClick={() => {
                const value =
                  !notifications;

                setNotifications(value);

                localStorage.setItem(
                  "notifications",
                  value
                );
              }}
              className="flex w-full items-center gap-3 p-4 text-left"
            >
              <Bell
                size={20}
                className="text-[#8b5e3c]"
              />

              <div className="flex-1">

                <p className="app-text font-semibold">
                  Notifications
                </p>

                <p className="text-xs text-stone-400">
                  {notifications
                    ? "Notifications are on"
                    : "Notifications are off"}
                </p>

              </div>

              <div
                className={`h-6 w-11 rounded-full p-1 ${
                  notifications
                    ? "bg-[#8b5e3c]"
                    : "bg-stone-300"
                }`}
              >
                <div
                  className={`h-4 w-4 rounded-full bg-white transition-transform ${
                    notifications
                      ? "translate-x-5"
                      : ""
                  }`}
                />
              </div>
            </button>

            {/* DARK MODE */}
            <button
              onClick={() =>
                setDarkMode(!darkMode)
              }
              className="flex w-full items-center gap-3 border-t border-stone-200/20 p-4 text-left"
            >
              {darkMode ? (
                <Sun
                  size={20}
                  className="text-[#8b5e3c]"
                />
              ) : (
                <Moon
                  size={20}
                  className="text-[#8b5e3c]"
                />
              )}

              <div className="flex-1">

                <p className="app-text font-semibold">
                  Dark Mode
                </p>

                <p className="text-xs text-stone-400">
                  {darkMode
                    ? "Dark theme enabled"
                    : "Light theme enabled"}
                </p>

              </div>

              <div
                className={`h-6 w-11 rounded-full p-1 ${
                  darkMode
                    ? "bg-[#8b5e3c]"
                    : "bg-stone-300"
                }`}
              >
                <div
                  className={`h-4 w-4 rounded-full bg-white transition-transform ${
                    darkMode
                      ? "translate-x-5"
                      : ""
                  }`}
                />
              </div>
            </button>

            {/* LANGUAGE */}
            <button
              onClick={handleLanguage}
              className="flex w-full items-center gap-3 border-t border-stone-200/20 p-4 text-left"
            >
              <Globe
                size={20}
                className="text-[#8b5e3c]"
              />

              <div className="flex-1">

                <p className="app-text font-semibold">
                  Language
                </p>

                <p className="text-xs text-stone-400">
                  {language}
                </p>

              </div>

              <ChevronRight
                size={18}
                className="text-stone-400"
              />
            </button>

          </div>
        </section>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 py-4 font-bold text-red-500"
        >
          <LogOut size={19} />
          Logout
        </button>

      </main>

      <BottomNav />
    </div>
  );
}

export default Profile;