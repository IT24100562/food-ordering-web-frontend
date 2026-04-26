import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../api/client";

function ItemDetailPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    api.getMenuItem(id).then(setItem).catch(console.error);
  }, [id]);

  if (!item) {
    return (
      <main className="container page-main">
        <p className="subtle-copy">Loading dish details...</p>
      </main>
    );
  }

  return (
    <main className="item-page container-narrow">
      <div className="back-row">
        <Link to="/menu" className="back-link">
          <span className="material-symbols-outlined">arrow_back</span>
          <span>Back to Menu</span>
        </Link>
      </div>

      <div className="item-layout">
        <section>
          <div className="item-main-image-wrap">
            <img src={item.image} alt={item.name} className="item-main-image" />
            <div className="item-image-fade" />
            <div className="item-chip-row">
              <span className="item-chip active">Signature Dish</span>
              <span className="item-chip">{item.spicyLevel}</span>
            </div>
          </div>

          <div className="item-story">
            <h3>The Narrative</h3>
            <p>{item.description}</p>
            <div className="item-stats">
              <div>
                <span>Prep Time</span>
                <strong>{item.prepTime}</strong>
              </div>
              <div>
                <span>Calories</span>
                <strong>840 KCAL</strong>
              </div>
              <div>
                <span>Chef's Rank</span>
                <strong>★★★★★</strong>
              </div>
            </div>
          </div>
        </section>

        <aside className="item-panel glass">
          <div>
            <h1>{item.name}</h1>
            <p className="item-price">${Math.max(8, Math.round(item.price / 80))}.00</p>
          </div>

          <div className="item-option-block">
            <div className="item-label-row">
              <label>Doneness</label>
              <span>Required</span>
            </div>
            <div className="item-option-grid">
              <button type="button" className="option active">MEDIUM RARE</button>
              <button type="button" className="option">MEDIUM</button>
              <button type="button" className="option">MEDIUM WELL</button>
            </div>
          </div>

          <div className="item-option-block">
            <label>Special Requests</label>
            <textarea className="field-control" rows="3" placeholder="Allergies, seating preferences, or special notes..." />
          </div>

          <div className="item-buy-row">
            <div className="qty-pill">
              <button type="button" aria-label="Decrease"><span className="material-symbols-outlined">remove</span></button>
              <span>1</span>
              <button type="button" aria-label="Increase"><span className="material-symbols-outlined">add</span></button>
            </div>
            <div className="item-total">
              <span>Total Price</span>
              <strong>${Math.max(8, Math.round(item.price / 80))}.00</strong>
            </div>
          </div>

          <Link to="/checkout" className="btn-primary full glow">
            <span className="material-symbols-outlined">shopping_bag</span>
            ADD TO EXPERIENCE
          </Link>
        </aside>
      </div>
    </main>
  );
}

export default ItemDetailPage;
