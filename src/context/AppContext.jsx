
import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Order History
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("coffeeOrders");
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  // Dark Mode
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  // Language
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "English"
  );

  // Apply Dark / Light Mode
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);

    document.documentElement.classList.toggle("dark", darkMode);
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  // Save Orders
  useEffect(() => {
    localStorage.setItem("coffeeOrders", JSON.stringify(orders));
  }, [orders]);

  // Add Product to Cart
  const addToCart = (product, size = "Medium", quantity = 1) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) => item.id === product.id && item.size === size
      );

      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id && item.size === size
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          size,
          quantity,
        },
      ];
    });
  };

  // Update Cart Quantity
  const updateQuantity = (id, size, change) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id && item.size === size
            ? {
                ...item,
                quantity: Math.max(1, item.quantity + change),
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove Product from Cart
  const removeFromCart = (id, size) => {
    setCart((currentCart) =>
      currentCart.filter(
        (item) => !(item.id === id && item.size === size)
      )
    );
  };

  // Add Order to Order History
  const placeOrder = (paymentMethod, total) => {
    const newOrder = {
      id: Date.now(),
      items: cart,
      paymentMethod,
      total,
      date: new Date().toLocaleString(),
      status: "Completed",
    };

    setOrders((currentOrders) => [
      newOrder,
      ...currentOrders,
    ]);

    setCart([]);
  };

  // Toggle Favorite
  const toggleFavorite = (product) => {
    setFavorites((currentFavorites) => {
      const exists = currentFavorites.some(
        (item) => item.id === product.id
      );

      if (exists) {
        return currentFavorites.filter(
          (item) => item.id !== product.id
        );
      }

      return [...currentFavorites, product];
    });
  };

  // Change Language
  const changeLanguage = (value) => {
    setLanguage(value);
    localStorage.setItem("language", value);
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        favorites,
        orders,
        darkMode,
        language,

        addToCart,
        updateQuantity,
        removeFromCart,
        placeOrder,
        toggleFavorite,

        setDarkMode,
        setLanguage: changeLanguage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
