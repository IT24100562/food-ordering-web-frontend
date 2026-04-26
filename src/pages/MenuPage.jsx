import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/client";

function MenuPage() {
  const [categories, setCategories] = useState([]);
  const [menu, setMenu] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getCategories().then(setCategories).catch(console.error);
  }, []);

  useEffect(() => {
    setLoading(true);
    api
      .getMenu(activeCategory)
      .then(setMenu)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [activeCategory]);

  const summary = useMemo(() => {
    if (activeCategory === "All") {
      return "A curated selection of epicurean delights, meticulously crafted with seasonal ingredients and modern techniques.";
    }
    return `Showing ${activeCategory} selections.`;
  }, [activeCategory]);

  return (
    <main className="menu-page container-narrow">
      <div className="menu-hero-copy">
        <h1>Culinary Masterpieces</h1>
        <p className="subtle-copy">{summary}</p>
      </div>

      <div className="menu-layout">
        <aside className="menu-aside">
          <p className="sidebar-label">Categories</p>
          <div className="sidebar-stack">
            <button
              type="button"
              className={activeCategory === "All" ? "category-btn active" : "category-btn"}
              onClick={() => setActiveCategory("All")}
            >
              All Items
            </button>
            {categories.map((category) => (
              <button
                type="button"
                key={category}
                className={activeCategory === category ? "category-btn active" : "category-btn"}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="chef-choice glass">
            <p className="eyebrow">Chef's choice</p>
            <h3>Try our smoked truffle gnocchi, prepared fresh daily.</h3>
            <p className="subtle-copy">Discover more on the detail pages.</p>
          </div>
        </aside>

        <section className="menu-main">
          {loading ? <p className="subtle-copy">Loading menu...</p> : null}
          <div className="menu-card-grid">
            {menu.map((item) => (
              <article key={item.id} className="menu-showcase-card">
                <img src={item.image} alt={item.name} loading="lazy" />
                <div className="menu-card-fade" />
                <div className="menu-card-content">
                  <div className="menu-card-topline">
                    <h3>{item.name}</h3>
                    <strong>${Math.max(8, Math.round(item.price / 80))}</strong>
                  </div>
                  <p>{item.description}</p>
                  <div className="menu-tags">
                    <span>{item.category}</span>
                    <span>Chef's pick</span>
                  </div>
                  <Link to={`/menu/${item.id}`} className="btn-primary compact">Add to Cart</Link>
                </div>
              </article>
            ))}
          </div>

          <div className="menu-cta-row">
            <button type="button" className="btn-secondary pill">Explore Full Menu</button>
          </div>
        </section>
      </div>

      <button className="floating-cart" type="button" aria-label="Quick cart">
        <span className="material-symbols-outlined">shopping_bag</span>
        <span className="badge">3</span>
      </button>
    </main>
  );
}

export default MenuPage;
