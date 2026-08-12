import { useState } from "react";
import { MapPin, Bell, X, Check } from "lucide-react";

function Header() {
  const [showNotifications, setShowNotifications] =
    useState(false);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Welcome to Brew & Bean ☕",
      message:
        "Explore our delicious coffee and desserts.",
      read: false,
    },
    {
      id: 2,
      title: "Special Offer",
      message:
        "Get 20% off on your next coffee order.",
      read: false,
    },
    {
      id: 3,
      title: "New Coffee Added",
      message:
        "Try our new Caramel Latte today!",
      read: true,
    },
  ]);

  const unreadCount = notifications.filter(
    (item) => !item.read
  ).length;

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((item) => ({
        ...item,
        read: true,
      }))
    );
  };

  const handleNotificationClick = (id) => {
    setNotifications((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, read: true }
          : item
      )
    );
  };

  return (
    <>
      {/* BRANDING */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* LOGO */}
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#8b5e3c] text-2xl text-white shadow-sm">
            ☕
          </div>

          {/* BRAND NAME */}
          <div>
            <h2 className="text-lg font-bold text-stone-800 dark:text-white">
              Brew & Bean
            </h2>

            <p className="text-xs text-stone-400">
              Freshly brewed for you
            </p>
          </div>
        </div>

        {/* NOTIFICATION BUTTON */}
        <button
          onClick={() => setShowNotifications(true)}
          className="relative rounded-full bg-white p-3 shadow-sm transition-colors dark:bg-[#241b17]"
        >
          <Bell
            size={20}
            className="text-stone-700 dark:text-stone-200"
          />

          {unreadCount > 0 && (
            <>
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#8b5e3c]" />

              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                {unreadCount}
              </span>
            </>
          )}
        </button>
      </div>

      {/* LOCATION */}
      <div className="mb-2">
        <button
          onClick={() => {
            if (!navigator.geolocation) {
              alert(
                "Location is not supported by your browser."
              );
              return;
            }

            navigator.geolocation.getCurrentPosition(
              (position) => {
                const {
                  latitude,
                  longitude,
                } = position.coords;

                alert(
                  `Location detected successfully!\nLatitude: ${latitude.toFixed(
                    4
                  )}\nLongitude: ${longitude.toFixed(4)}`
                );
              },
              () => {
                alert(
                  "Unable to access your location. Please allow location permission in your browser."
                );
              }
            );
          }}
          className="text-left"
        >
          <p className="text-xs text-stone-400">
            Location
          </p>

          <div className="mt-1 flex items-center gap-1">
            <MapPin
              size={15}
              className="text-[#8b5e3c]"
            />

            <span className="text-sm font-semibold text-stone-700 dark:text-stone-200">
              Bengaluru, India
            </span>
          </div>
        </button>
      </div>

      {/* NOTIFICATION PANEL */}
      {showNotifications && (
        <div className="fixed inset-0 z-[100] bg-black/40">
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-[#f8f5f0] shadow-2xl dark:bg-[#17120f]">
            
            {/* PANEL HEADER */}
            <div className="flex items-center justify-between border-b border-stone-200 p-5 dark:border-stone-700">
              <div>
                <h2 className="text-xl font-bold text-stone-800 dark:text-white">
                  Notifications
                </h2>

                <p className="text-xs text-stone-400">
                  {unreadCount} unread notification
                  {unreadCount !== 1 ? "s" : ""}
                </p>
              </div>

              <button
                onClick={() =>
                  setShowNotifications(false)
                }
                className="rounded-full bg-white p-2 shadow-sm dark:bg-[#241b17]"
              >
                <X
                  size={20}
                  className="text-stone-700 dark:text-stone-200"
                />
              </button>
            </div>

            {/* NOTIFICATIONS */}
            <div className="p-5">
              {notifications.length === 0 ? (
                <div className="rounded-2xl bg-white p-8 text-center shadow-sm dark:bg-[#241b17]">
                  <Bell
                    size={35}
                    className="mx-auto text-stone-300"
                  />

                  <p className="mt-3 font-semibold text-stone-800 dark:text-white">
                    No notifications
                  </p>
                </div>
              ) : (
                <>
                  {/* MARK ALL READ */}
                  <button
                    onClick={markAllAsRead}
                    className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#8b5e3c]"
                  >
                    <Check size={16} />
                    Mark all as read
                  </button>

                  {/* NOTIFICATION LIST */}
                  <div className="space-y-3">
                    {notifications.map((item) => (
                      <button
                        key={item.id}
                        onClick={() =>
                          handleNotificationClick(
                            item.id
                          )
                        }
                        className={`w-full rounded-2xl bg-white p-4 text-left shadow-sm dark:bg-[#241b17] ${
                          !item.read
                            ? "border-l-4 border-[#8b5e3c]"
                            : ""
                        }`}
                      >
                        <div className="flex gap-3">
                          {/* ICON */}
                          <div className="mt-1 rounded-full bg-[#f3ebe4] p-2 dark:bg-[#33251e]">
                            <Bell
                              size={16}
                              className="text-[#8b5e3c]"
                            />
                          </div>

                          {/* CONTENT */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="text-sm font-bold text-stone-800 dark:text-white">
                                {item.title}
                              </h3>

                              {!item.read && (
                                <span className="mt-1 h-2 w-2 rounded-full bg-[#8b5e3c]" />
                              )}
                            </div>

                            <p className="mt-1 text-xs leading-5 text-stone-500 dark:text-stone-400">
                              {item.message}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;