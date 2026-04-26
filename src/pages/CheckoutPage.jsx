import { useEffect, useMemo, useState } from "react";
import { api } from "../api/client";

function CheckoutPage() {
  const [menu, setMenu] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [qty, setQty] = useState(1);
  const [cart, setCart] = useState([]);
  const [preview, setPreview] = useState(null);
  const [fulfillment, setFulfillment] = useState("Delivery");

  useEffect(() => {
    api.getMenu().then((items) => {
      setMenu(items);
      if (items[0]) {
        setSelectedId(items[0].id);
        setCart([
          { id: items[0].id, qty: 1 },
          ...(items[1] ? [{ id: items[1].id, qty: 2 }] : [])
        ]);
      }
    });
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      api.checkoutPreview({ items: cart }).then(setPreview).catch(console.error);
    }
  }, [cart]);

  const selectedDish = useMemo(
    () => menu.find((dish) => dish.id === selectedId),
    [menu, selectedId]
  );

  const addToCart = () => {
    if (!selectedId || qty < 1) {
      return;
    }

    setCart((prev) => {
      const existing = prev.find((item) => item.id === selectedId);
      if (existing) {
        return prev.map((item) =>
          item.id === selectedId ? { ...item, qty: item.qty + qty } : item
        );
      }
      return [...prev, { id: selectedId, qty }];
    });
  };

  const subtotalLocal = useMemo(() => {
    return cart.reduce((acc, item) => {
      const dish = menu.find((entry) => entry.id === item.id);
      return acc + (dish ? dish.price * item.qty : 0);
    }, 0);
  }, [cart, menu]);

  return (
    <main className="checkout-page container-narrow">
      <div className="checkout-head">
        <h1>Secure Checkout</h1>
        <div className="progress-bar"><span /></div>
        <div className="progress-labels">
          <span>Details</span>
          <span className="active">Payment</span>
          <span>Confirmation</span>
        </div>
      </div>

      <div className="checkout-layout">
        <section className="checkout-main-col">
          <section className="glass panel-section">
            <h2><span className="material-symbols-outlined">local_shipping</span> Fulfillment Option</h2>
            <div className="fulfillment-grid">
              {[
                { label: "Delivery", sub: "45 minutes" },
                { label: "Pickup", sub: "20 minutes" }
              ].map((option) => (
                <button
                  key={option.label}
                  type="button"
                  className={fulfillment === option.label ? "fulfillment-card active" : "fulfillment-card"}
                  onClick={() => setFulfillment(option.label)}
                >
                  <span className="material-symbols-outlined">
                    {option.label === "Delivery" ? "delivery_dining" : "shopping_bag"}
                  </span>
                  <strong>{option.label}</strong>
                  <span>{option.sub}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="glass panel-section">
            <div className="title-row">
              <h2><span className="material-symbols-outlined">location_on</span> Delivery Address</h2>
              <button type="button" className="link-btn">Add New</button>
            </div>
            <article className="address-card active">
              <strong>Home</strong>
              <p>1248 Noir Estates, Penthouse B</p>
              <p>Downtown District, Vavuniya 10012</p>
            </article>
            <article className="address-card">
              <strong>Office</strong>
              <p>Studio 45, Creative Collective</p>
              <p>East Side Hub, Vavuniya 10015</p>
            </article>
          </section>

          <section className="glass panel-section">
            <h2><span className="material-symbols-outlined">payments</span> Payment Method</h2>
            <div className="payment-grid">
              <div>
                <label className="field-label" htmlFor="card">Card Number</label>
                <input id="card" className="field-control" placeholder="**** **** **** 4242" />
              </div>
              <div>
                <label className="field-label" htmlFor="expiry">Expiry</label>
                <input id="expiry" className="field-control" placeholder="MM/YY" />
              </div>
              <div>
                <label className="field-label" htmlFor="cvv">CVV</label>
                <input id="cvv" className="field-control" placeholder="***" />
              </div>
            </div>
            <div className="quick-add-row">
              <select
                className="field-control"
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
              >
                {menu.map((dish) => (
                  <option key={dish.id} value={dish.id}>
                    {dish.name} - LKR {dish.price.toLocaleString()}
                  </option>
                ))}
              </select>
              <input
                className="field-control qty-mini"
                type="number"
                min="1"
                max="10"
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
              />
              <button type="button" className="btn-secondary" onClick={addToCart}>Add Item</button>
            </div>
            {selectedDish ? <p className="subtle-copy">{selectedDish.description}</p> : null}
          </section>
        </section>

        <aside className="glass checkout-summary-panel">
          <h2>Order Summary</h2>
          <ul className="cart-list detailed">
            {cart.map((item) => {
              const dish = menu.find((entry) => entry.id === item.id);
              if (!dish) {
                return null;
              }
              return (
                <li key={item.id}>
                  <img src={dish.image} alt={dish.name} />
                  <div>
                    <strong>{dish.name}</strong>
                    <p>{dish.category}</p>
                    <span>{item.qty}x</span>
                  </div>
                  <strong>${Math.max(8, Math.round((dish.price * item.qty) / 80))}.00</strong>
                </li>
              );
            })}
          </ul>

          <div className="total-lines">
            <p><span>Subtotal</span><span>${Math.max(8, Math.round(subtotalLocal / 80))}.00</span></p>
            <p><span>{fulfillment} Fee</span><span>${fulfillment === "Delivery" ? "5" : "0"}.00</span></p>
            <p><span>Service Charge</span><span>${Math.max(0, Math.round((preview?.serviceCharge || 0) / 80))}.00</span></p>
          </div>

          <p className="checkout-total">
            <span>Total</span>
            <strong>
              ${Math.max(
                8,
                Math.round(((preview?.total || subtotalLocal) + (fulfillment === "Delivery" ? 350 : 0)) / 80)
              )}.00
            </strong>
          </p>

          <button
            type="button"
            className="btn-primary full glow"
            onClick={() => api.checkoutPreview({ items: cart }).then(setPreview).catch(console.error)}
          >
            Place Order
          </button>
          <p className="subtle-copy center"><span className="material-symbols-outlined">lock</span> Secure encrypted transaction</p>
        </aside>
      </div>
    </main>
  );
}

export default CheckoutPage;
