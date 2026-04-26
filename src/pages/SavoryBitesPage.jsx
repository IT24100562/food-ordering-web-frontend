import { memo, useEffect, useMemo, useRef, useState } from "react";

const menuItems = [
  {
    id: 1,
    name: "Classic Cheeseburger",
    category: "burger",
    price: 12.99,
    desc: "Juicy beef patty with melted cheddar, lettuce, tomato and special sauce",
    image: "/menu/classic-cheeseburger.jpg",
    imageAlt: "Classic cheeseburger with cheddar and lettuce",
    emoji: "🍔",
    badge: "Popular"
  },
  {
    id: 2,
    name: "BBQ Bacon Burger",
    category: "burger",
    price: 14.99,
    desc: "Smoky BBQ sauce, crispy bacon, onion rings and cheddar cheese",
    image: "/menu/bbq-bacon-burger.jpg",
    imageAlt: "BBQ bacon burger with sauce",
    emoji: "🥓",
    badge: ""
  },
  {
    id: 3,
    name: "Spicy Chicken Burger",
    category: "burger",
    price: 13.49,
    desc: "Crispy fried chicken with spicy mayo, jalapenos and coleslaw",
    image: "/menu/spicy-chicken-burger.jpg",
    imageAlt: "Spicy chicken burger with jalapenos",
    emoji: "🌶️",
    badge: "Spicy",
    spicy: true
  },
  {
    id: 4,
    name: "Margherita Pizza",
    category: "pizza",
    price: 11.99,
    desc: "Fresh mozzarella, basil and tomato sauce on hand-tossed dough",
    image: "/menu/margherita-pizza.jpg",
    imageAlt: "Margherita pizza with basil and mozzarella",
    emoji: "🍕",
    badge: "Classic"
  },
  {
    id: 5,
    name: "Pepperoni Feast",
    category: "pizza",
    price: 15.99,
    desc: "Double pepperoni, mozzarella and Italian herbs",
    image: "/menu/pepperoni-feast.jpg",
    imageAlt: "Pepperoni pizza slices",
    emoji: "🍕",
    badge: "Best Seller"
  },
  {
    id: 6,
    name: "Veggie Supreme",
    category: "pizza",
    price: 13.99,
    desc: "Bell peppers, mushrooms, olives, onions and tomatoes",
    image: "/menu/veggie-supreme.jpg",
    imageAlt: "Vegetable supreme pizza",
    emoji: "🥬",
    badge: "Veggie"
  },
  {
    id: 7,
    name: "Creamy Alfredo Pasta",
    category: "pasta",
    price: 14.49,
    desc: "Fettuccine in rich parmesan cream sauce with grilled chicken",
    image: "/menu/creamy-alfredo-pasta.jpg",
    imageAlt: "Creamy alfredo pasta bowl",
    emoji: "🍝",
    badge: ""
  },
  {
    id: 8,
    name: "Spaghetti Bolognese",
    category: "pasta",
    price: 13.99,
    desc: "Slow-cooked meat sauce with Italian herbs and parmesan",
    image: "/menu/spaghetti-bolognese.jpg",
    imageAlt: "Spaghetti bolognese with meat sauce",
    emoji: "🍝",
    badge: "Chef's Pick"
  },
  {
    id: 9,
    name: "Caesar Salad",
    category: "salad",
    price: 10.99,
    desc: "Crisp romaine, croutons, parmesan and classic Caesar dressing",
    image: "/menu/caesar-salad.jpg",
    imageAlt: "Caesar salad with croutons",
    emoji: "🥗",
    badge: ""
  },
  {
    id: 10,
    name: "Greek Salad",
    category: "salad",
    price: 11.49,
    desc: "Cucumber, tomato, olives, feta cheese and olive oil dressing",
    image: "/menu/greek-salad.jpg",
    imageAlt: "Greek salad with feta and olives",
    emoji: "🥗",
    badge: "Fresh"
  },
  {
    id: 11,
    name: "Chocolate Lava Cake",
    category: "dessert",
    price: 7.99,
    desc: "Warm chocolate cake with molten center and vanilla ice cream",
    image: "/menu/chocolate-lava-cake.jpg",
    imageAlt: "Chocolate lava cake dessert",
    emoji: "🍫",
    badge: "Must Try"
  },
  {
    id: 12,
    name: "Tiramisu",
    category: "dessert",
    price: 8.49,
    desc: "Classic Italian dessert with coffee-soaked ladyfingers and mascarpone",
    image: "/menu/tiramisu.jpg",
    imageAlt: "Tiramisu dessert serving",
    emoji: "🍰",
    badge: ""
  },
  {
    id: 13,
    name: "Fresh Lemonade",
    category: "drink",
    price: 4.99,
    desc: "Freshly squeezed lemons with mint and a touch of honey",
    image: "/menu/fresh-lemonade.jpg",
    imageAlt: "Glass of fresh lemonade with mint",
    emoji: "🍋",
    badge: ""
  },
  {
    id: 14,
    name: "Iced Caramel Latte",
    category: "drink",
    price: 5.49,
    desc: "Espresso with caramel syrup and cold milk over ice",
    image: "/menu/iced-caramel-latte.jpg",
    imageAlt: "Iced caramel latte drink",
    emoji: "☕",
    badge: ""
  },
  {
    id: 15,
    name: "Mango Smoothie",
    category: "drink",
    price: 5.99,
    desc: "Fresh mango, yogurt and honey blended to perfection",
    image: "/menu/mango-smoothie.jpg",
    imageAlt: "Mango smoothie in a glass",
    emoji: "🥭",
    badge: "Fresh"
  }
];

const categories = [
  { key: "all", label: "All", icon: "🍽️" },
  { key: "burger", label: "Burgers", icon: "🍔" },
  { key: "pizza", label: "Pizza", icon: "🍕" },
  { key: "pasta", label: "Pasta", icon: "🍝" },
  { key: "salad", label: "Salads", icon: "🥗" },
  { key: "dessert", label: "Desserts", icon: "🍰" },
  { key: "drink", label: "Drinks", icon: "🥤" }
];

const orbitItems = [
  { src: "/food-ring-1.jpg", alt: "Seasoned grilled chicken" },
  { src: "/food-ring-2.jpg", alt: "Rice platter with chicken" },
  { src: "/food-ring-3.jpg", alt: "Creamy yellow curry" },
  { src: "/food-ring-4.jpg", alt: "Crispy fried bites" },
  { src: "/food-ring-5.jpg", alt: "Veggie stir fry with egg" },
  { src: "/food-ring-6.jpg", alt: "Charred chicken platter" }
];

const FoodOrbit = memo(function FoodOrbit({ className = "" }) {
  return (
    <div className={`about-orbit ${className}`.trim()}>
      <div className="about-orbit-ring">
        {orbitItems.map((item, index) => (
          <div key={item.src} className={`about-orbit-item orbit-${index + 1}`}>
            <img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
          </div>
        ))}
      </div>
      <div className="about-center-dish">
        <video autoPlay muted loop playsInline preload="none" poster="/food-ring-center.jpg">
          <source src="/ring-center.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
});

function SavoryBitesPage() {
  const [cart, setCart] = useState({});
  const [currentCategory, setCurrentCategory] = useState("all");
  const [cartOpen, setCartOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [isNavHidden, setIsNavHidden] = useState(false);
  const lastScrollY = useRef(0);
  const navHiddenRef = useRef(false);
  const rafScrollRef = useRef(0);
  const toastTimerRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (rafScrollRef.current) {
        return;
      }

      rafScrollRef.current = window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        let nextHidden = navHiddenRef.current;

        if (currentScrollY <= 10) {
          nextHidden = false;
        } else if (currentScrollY > lastScrollY.current + 10) {
          nextHidden = true;
        } else if (currentScrollY < lastScrollY.current - 10) {
          nextHidden = false;
        }

        if (nextHidden !== navHiddenRef.current) {
          navHiddenRef.current = nextHidden;
          setIsNavHidden(nextHidden);
        }

        lastScrollY.current = currentScrollY;
        rafScrollRef.current = 0;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafScrollRef.current) {
        window.cancelAnimationFrame(rafScrollRef.current);
      }
    };
  }, []);

  useEffect(() => {
    navHiddenRef.current = isNavHidden;
  }, [isNavHidden]);

  useEffect(() => {
    if (!modalOpen) {
      return;
    }

    const timer = window.setTimeout(() => {
      setModalOpen(false);
    }, 3500);

    return () => {
      window.clearTimeout(timer);
    };
  }, [modalOpen]);

  const filteredMenu = useMemo(() => {
    if (currentCategory === "all") {
      return menuItems;
    }
    return menuItems.filter((item) => item.category === currentCategory);
  }, [currentCategory]);

  const itemCount = useMemo(
    () => Object.values(cart).reduce((sum, qty) => sum + qty, 0),
    [cart]
  );

  const subtotal = useMemo(() => {
    return Object.entries(cart).reduce((sum, [id, qty]) => {
      const item = menuItems.find((entry) => entry.id === Number(id));
      return item ? sum + item.price * qty : sum;
    }, 0);
  }, [cart]);

  const delivery = subtotal > 25 || subtotal === 0 ? 0 : 3.99;
  const tax = subtotal * 0.08;
  const total = subtotal + delivery + tax;

  const cartEntries = useMemo(() => {
    return Object.entries(cart)
      .map(([id, qty]) => {
        const item = menuItems.find((entry) => entry.id === Number(id));
        if (!item) {
          return null;
        }
        return { item, qty };
      })
      .filter(Boolean);
  }, [cart]);

  const showToast = (message) => {
    setToastMessage(message);
    setToastVisible(true);
    window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => {
      setToastVisible(false);
    }, 2500);
  };

  useEffect(() => {
    return () => {
      window.clearTimeout(toastTimerRef.current);
    };
  }, []);

  const addToCart = (id) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    showToast("✅ Added to cart!");
  };

  const handleDishImageError = (event) => {
    event.currentTarget.src = "/food-ring-center.jpg";
  };

  const updateQuantity = (id, change) => {
    setCart((prev) => {
      const next = { ...prev };
      const updated = (next[id] || 0) + change;
      if (updated <= 0) {
        delete next[id];
      } else {
        next[id] = updated;
      }
      return next;
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const checkout = () => {
    if (!itemCount) {
      return;
    }
    setCartOpen(false);
    setModalOpen(true);
    setCart({});
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <header className={isNavHidden ? "header-hidden" : ""}>
        
        <nav>
          <div className="logo">
            <img className="brand-logo brand-logo-nav" src="/brand-logo-clean.png" alt="Dine n me Logo" />
          </div>
          <ul className="nav-links">
            <li><a onClick={() => scrollToSection("menu")}>Menu</a></li>
            <li><a onClick={() => scrollToSection("about")}>About</a></li>
            <li><a onClick={() => scrollToSection("contact")}>Contact</a></li>
            <li>
              <button className="cart-btn" onClick={() => setCartOpen(true)}>
                🛒 Cart <span className="cart-count">{itemCount}</span>
              </button>
            </li>
          </ul>
          <button className="cart-btn mobile-cart" onClick={() => setCartOpen(true)}>
            🛒 <span className="cart-count">{itemCount}</span>
          </button>
        </nav>
      </header>

      <section className="hero">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Hero background video"
        >
          <source src="/home-hero.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1>
            Delicious Food
            <br />
            Delivered To Your <span className="hero-highlight">Doorstep</span>
          </h1>
          <p>
            Experience the finest flavors crafted with passion. From sizzling grills to fresh salads,
            we bring the restaurant to you.
          </p>
        </div>
      </section>

      <div className="categories" id="categoryFilter">
        {categories.map((category) => (
          <button
            key={category.key}
            className={
              currentCategory === category.key ? "category-btn active" : "category-btn"
            }
            onClick={() => setCurrentCategory(category.key)}
          >
            {category.icon} {category.label}
          </button>
        ))}
      </div>

      <section className="menu-section" id="menu">
        <h2 className="section-title">🔥 Popular Dishes</h2>
        <div className="menu-grid">
          {filteredMenu.map((item, index) => (
            <div key={item.id} className="food-card" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="food-image">
                <img
                  src={item.image}
                  alt={item.imageAlt || item.name}
                  loading="lazy"
                  onError={handleDishImageError}
                />
                {item.badge ? (
                  <span className={item.spicy ? "food-badge spicy" : "food-badge"}>{item.badge}</span>
                ) : null}
              </div>
              <div className="food-content">
                <div className="food-header">
                  <div className="food-title">{item.name}</div>
                </div>
                <p className="food-desc">{item.desc}</p>
                <div className="food-footer">
                  <span className="price">LKR {item.price.toFixed(2)}</span>
                  {cart[item.id] ? (
                    <div className="quantity-control">
                      <button className="qty-btn" onClick={() => updateQuantity(item.id, -1)}>−</button>
                      <span className="qty-value">{cart[item.id]}</span>
                      <button className="qty-btn" onClick={() => updateQuantity(item.id, 1)}>+</button>
                    </div>
                  ) : (
                    <button className="add-btn" onClick={() => addToCart(item.id)}>+</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="about" id="about">
        <div className="about-grid">
          <div className="about-copy-wrap">
            <p className="about-kicker">Why Choose Us</p>
            <h2>
              Why Choose <span className="about-highlight">Dine n me?</span>
            </h2>
            <p className="about-copy">
              We believe great food brings people together. Our chefs use only the freshest
              ingredients, sourced locally whenever possible, to create dishes that delight your
              taste buds.
            </p>
            <div className="about-features">
              <div className="about-feature">
                <div className="about-icon">🌿</div>
                <div>
                  <h4>Fresh Ingredients</h4>
                  <p>Farm-to-table quality and daily curated produce.</p>
                </div>
              </div>
              <div className="about-feature">
                <div className="about-icon">👨‍🍳</div>
                <div>
                  <h4>Expert Chefs</h4>
                  <p>Signature dishes crafted by experienced culinary masters.</p>
                </div>
              </div>
              <div className="about-feature">
                <div className="about-icon">⚡</div>
                <div>
                  <h4>Fast Delivery</h4>
                  <p>Hot and fresh to your door in under 45 minutes.</p>
                </div>
              </div>
              <div className="about-feature">
                <div className="about-icon">🏆</div>
                <div>
                  <h4>Best Quality Service</h4>
                  <p>Premium support, hygienic packaging, and consistent taste.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="about-visual" aria-label="Signature dishes showcase">
            <FoodOrbit />
          </div>
        </div>
      </section>

      <footer id="contact">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo">
              <img className="brand-logo brand-logo-footer" src="/brand-logo-clean.png" alt="Dine n me Logo" />
            </div>
            <p>
              Bringing the best flavors to your table since 2020. Quality food, fast delivery,
              happy customers.
            </p>
          </div>
          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#menu">Menu</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
          <div className="footer-links">
            <h3>Contact</h3>
            <ul>
              <li>📍 123A, MANNAR ROAD, KURUMANKADU, VAVUNIYA.</li>
              <li>📞 077 704 8533</li>
              
              <li>🕒 Mon-Sun: 10AM - 10PM</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Dine n me. All rights reserved.</p>
        </div>
      </footer>

      <a
        className="whatsapp-float"
        href="https://wa.me/94777048533?text=Hi%20Dine%20n%20me%2C%20I%20want%20to%20place%20an%20order."
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M19.05 4.94A9.85 9.85 0 0 0 12.02 2a9.97 9.97 0 0 0-8.67 14.9L2 22l5.27-1.31a10.03 10.03 0 0 0 4.75 1.21h.01a9.98 9.98 0 0 0 7.02-16.96Zm-7.03 15.27h-.01a8.22 8.22 0 0 1-4.19-1.15l-.3-.18-3.13.78.84-3.05-.2-.31a8.27 8.27 0 1 1 7 3.91Zm4.54-6.18c-.25-.13-1.49-.74-1.72-.82-.23-.09-.4-.13-.57.12-.17.25-.65.82-.8.99-.15.17-.29.19-.54.06-.25-.13-1.05-.39-2-1.25-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.12-.14.16-.25.25-.42.08-.17.04-.31-.02-.43-.06-.13-.57-1.38-.78-1.89-.21-.5-.42-.43-.57-.44h-.49c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.08 0 1.23.89 2.41 1.01 2.58.13.17 1.75 2.67 4.24 3.74.59.25 1.05.4 1.41.51.59.19 1.12.16 1.55.1.47-.07 1.49-.61 1.7-1.2.21-.59.21-1.09.15-1.2-.06-.11-.23-.17-.48-.3Z"/>
        </svg>
      </a>

      <div className={cartOpen ? "cart-overlay active" : "cart-overlay"} onClick={() => setCartOpen(false)} />
      <div className={cartOpen ? "cart-sidebar active" : "cart-sidebar"}>
        <div className="cart-header">
          <h2>🛒 Your Cart</h2>
          <button className="close-cart" onClick={() => setCartOpen(false)}>✕</button>
        </div>
        <div className="cart-items">
          {!cartEntries.length ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">🛒</div>
              <p>Your cart is empty</p>
              <p className="small-muted">Add some delicious items!</p>
            </div>
          ) : (
            cartEntries.map(({ item, qty }) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">
                  <img
                    src={item.image}
                    alt={item.imageAlt || item.name}
                    loading="lazy"
                    onError={handleDishImageError}
                  />
                </div>
                <div className="cart-item-details">
                  <div className="cart-item-title">{item.name}</div>
                  <div className="cart-item-price">LKR {(item.price * qty).toFixed(2)}</div>
                  <div className="cart-item-actions">
                    <div className="quantity-control compact">
                      <button className="qty-btn" onClick={() => updateQuantity(item.id, -1)}>−</button>
                      <span className="qty-value">{qty}</span>
                      <button className="qty-btn" onClick={() => updateQuantity(item.id, 1)}>+</button>
                    </div>
                    <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="cart-footer">
          <div className="cart-summary">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>LKR {subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Delivery</span>
              <span>{delivery === 0 ? "FREE" : `LKR ${delivery.toFixed(2)}`}</span>
            </div>
            <div className="summary-row">
              <span>Tax</span>
              <span>LKR {tax.toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>LKR {total.toFixed(2)}</span>
            </div>
          </div>
          <button className="checkout-btn" onClick={checkout} disabled={!itemCount}>
            Proceed to Checkout
          </button>
        </div>
      </div>

      <div
        className={modalOpen ? "modal-overlay active" : "modal-overlay"}
        onClick={() => setModalOpen(false)}
      >
        <div className="modal" onClick={(event) => event.stopPropagation()}>
          <div className="modal-icon">🎉</div>
          <p className="modal-message">Your delicious food is being prepared. Estimated delivery: 30-45 minutes.</p>
        </div>
      </div>

      <div className={toastVisible ? "toast show" : "toast"}>{toastMessage}</div>
    </div>
  );
}

export default SavoryBitesPage;

