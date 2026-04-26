import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../api/client";

function HomePage() {
  const [restaurant, setRestaurant] = useState(null);
  const [highlights, setHighlights] = useState([]);

  useEffect(() => {
    api.getRestaurant().then(setRestaurant).catch(console.error);
    api.getMenu().then((items) => setHighlights(items.slice(0, 3))).catch(console.error);
  }, []);

  const spotlight = highlights[0];

  return (
    <main>
      <section className="home-hero">
        <video
          className="hero-image"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          
          aria-label="Hero background video"
        >
          <source src="/home-hero.mp4" type="video/mp4" />
        </video>
        <div className="hero-gradient" />
        <div className="hero-center">
          <span className="hero-kicker">A New Era of Gastronomy</span>
          <h1 className="hero-title">Fine Dining Delivered.</h1>
          <p className="hero-subtitle">
            {restaurant?.tagline ||
              "Experience the artistry of a Michelin-starred kitchen in the comfort of your private sanctuary."}
          </p>
          <div className="hero-actions">
            <Link to="/checkout" className="btn-primary pill">Order Now</Link>
            <Link to="/menu" className="btn-secondary pill">View Gallery</Link>
          </div>
        </div>
      </section>

      <section className="section container-narrow">
        <div className="section-row">
          <div>
            <p className="eyebrow">Chef's Specials</p>
            <h2>Hand-selected seasonal masterpieces</h2>
          </div>
          <div className="ghost-arrows">
            <button type="button" aria-label="previous"><span className="material-symbols-outlined">chevron_left</span></button>
            <button type="button" aria-label="next"><span className="material-symbols-outlined">chevron_right</span></button>
          </div>
        </div>
        <div className="special-grid">
          {highlights.map((item, index) => (
            <article className="special-card glass" key={item.id}>
              <img src={item.image} alt={item.name} loading="lazy" />
              <div className="special-body">
                <div className="special-tag-wrap">
                  <span className="special-tag">{index === 2 ? "Vegan" : "Seasonal"}</span>
                </div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="special-foot-row">
                  <strong>${Math.max(8, Math.round(item.price / 80))}</strong>
                  <button type="button" className="round-icon" aria-label="Add">
                    <span className="material-symbols-outlined">add</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="heritage-block" id="story">
        <div className="container-narrow heritage-grid">
          <div className="heritage-media">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFSbhA2DoF0DQru_opX08BlIJ0XXbb-M3FHgISjHddv948h1tNcEqM_CinYy_7QDWc11M5rry5gM_ZDwT7y4M5Ma5kBMuMANiLmDFdW2c-uj1JwFJSXp3QRWgDvwMWPjcWsUvuyUwFZFqJaIKsrx5eK7EryFISio9eE1kLs2_JaoeXROq86vq4ODO1TxaJdIvCpdrhq4JE0o5M_2jUcNbG-Xd2SC83755ZpQRPSlJOskNqK2QwajAwk2PgxKTP3qj6b7EbGMpRjWMp"
              alt="Chef preparing a dish"
            />
            <div className="heritage-stat glass">
              <strong>15 Years</strong>
              <p>Of culinary excellence and Michelin-level standards across three continents.</p>
            </div>
          </div>
          <div className="heritage-copy" id="private-dining">
            <p className="eyebrow">Our heritage</p>
            <h2>The Art of the Noir Dinner.</h2>
            <p>
              Founded on the principle that exceptional food should not be confined to a dining
              room, Dine n me brings meticulous detail and avant-garde gastronomy to your doorstep.
            </p>
            <p>
              Every dish is prepared a la minute using zero-mile sourcing and traditional techniques
              fused with modern molecular gastronomy.
            </p>
            <div className="heritage-points">
              <span><span className="material-symbols-outlined">restaurant</span> Artisan quality</span>
              <span><span className="material-symbols-outlined">temp_preferences_custom</span> Perfect temp</span>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonial-band" id="reservations">
        <div className="container-small testimonial-wrap">
          <span className="material-symbols-outlined quote-icon">format_quote</span>
          <blockquote>
            An unparalleled experience. The Wagyu arrived at the perfect temperature, and the
            presentation was as if I were sitting in their flagship bistro.
          </blockquote>
          <p className="quote-author">Julian Thorne, Food Critic</p>
        </div>
      </section>

      <section className="container-narrow callout-strip">
        <div>
          <p className="eyebrow">Private dining at home</p>
          <h2>{spotlight ? `Tonight's Highlight: ${spotlight.name}` : "Reserve A Signature Experience"}</h2>
        </div>
        <Link to="/checkout" className="btn-primary">Reserve Your Slot</Link>
      </section>
    </main>
  );
}

export default HomePage;
