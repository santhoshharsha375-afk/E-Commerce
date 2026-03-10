import { useMemo, useState } from "react";
import "./index.css";
import { PRODUCTS } from "./products";
import AuthModal from "./AuthModal";

function App() {
  const [cart, setCart] = useState([]);
  const [filter, setFilter] = useState("All");
  const [authOpen, setAuthOpen] = useState(false);

  const handleAdd = (product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const handleChangeQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((p) =>
          p.id === id ? { ...p, qty: Math.max(1, p.qty + delta) } : p
        )
        .filter((p) => p.qty > 0)
    );
  };

  const handleRemove = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const totalItems = cart.reduce((sum, p) => sum + p.qty, 0);
  const subtotal = cart.reduce((sum, p) => sum + p.price * p.qty, 0);
  const shipping = subtotal > 0 ? 120 : 0;
  const total = subtotal + shipping;

  const categories = useMemo(
    () => ["All", ...new Set(PRODUCTS.map((p) => p.category))],
    []
  );

  const visibleProducts =
    filter === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === filter);

  return (
    <div className="app-root">
      {/* NAVBAR */}
      <header className="navbar">
        <div className="nav-inner">
          <div className="nav-brand">
            <span className="nav-logo-badge">Nova</span>
            <span className="nav-logo-text">Studio</span>
          </div>
          <nav className="nav-links">
            <span className="nav-link active">Home</span>
            <span className="nav-link">Shop</span>
            <span className="nav-link">Stories</span>
          </nav>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <button
              style={{
                padding: "6px 12px",
                borderRadius: "999px",
                border: "1px solid #4b5563",
                background: "transparent",
                color: "#e5e7eb",
                fontSize: "12px",
                cursor: "pointer",
              }}
              onClick={() => setAuthOpen(true)}
            >
              Login
            </button>
            <button className="nav-cart">
              Cart
              {totalItems > 0 && (
                <span className="nav-cart-count">{totalItems}</span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="app-shell">
        {/* HERO */}
        <section className="hero">
          <div>
            <span className="hero-text-kicker">
              New season • up to 40% off
            </span>
            <h1 className="hero-title">
              Everyday pieces,
              <span> built to move with you.</span>
            </h1>
            <p className="hero-subtitle">
              Discover a curated mix of sneakers, streetwear and accessories
              designed to match your pace—from early commute to late‑night
              hangs.
            </p>
            <div className="hero-actions">
              <button className="btn-primary">Shop collection</button>
              <button className="btn-ghost">View lookbook</button>
            </div>
            <div className="hero-highlights">
              <span>✔ Free delivery above ₹1999</span>
              <span>✔ 30‑day returns</span>
              <span>✔ Secure checkout</span>
            </div>
          </div>
          <div className="hero-image-shell">
            <div className="hero-image">
              <img
                src="https://images.pexels.com/photos/7671166/pexels-photo-7671166.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="Model in hoodie"
              />
            </div>
            <div className="hero-tag">
              <div style={{ fontSize: 11, fontWeight: 600 }}>
                Drop 07 • Nightshift
              </div>
              <div style={{ fontSize: 11, color: "#9ca3af" }}>
                Hoodies, sneakers and carry for late‑night city runs.
              </div>
            </div>
          </div>
        </section>

        {/* PRODUCTS SECTION */}
        <div className="section-header">
          <div>
            <div className="section-title">Featured picks</div>
            <div className="section-subtitle">
              Hand‑picked essentials from this week’s drops.
            </div>
          </div>
          <div className="section-subtitle">
            Showing {visibleProducts.length} of {PRODUCTS.length} products
          </div>
        </div>

        <div className="filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={
                "filter-chip" + (cat === filter ? " active" : "")
              }
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <section className="product-grid">
          {visibleProducts.map((p) => (
            <article key={p.id} className="product-card">
              <div className="product-image-wrapper">
                <img src={p.image} alt={p.name} />
                <span className="product-badge">{p.badge}</span>
              </div>
              <div className="product-body">
                <div className="product-name">{p.name}</div>
                <div className="product-meta">
                  <span>{p.category}</span>
                  <span>⭐ {p.rating.toFixed(1)}</span>
                </div>
                <div className="product-footer">
                  <span className="product-price">₹{p.price}</span>
                  <button
                    className="btn-add"
                    onClick={() => handleAdd(p)}
                  >
                    Add to bag
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* CART SECTION */}
        <section className="cart-layout">
          <div className="cart-card">
            <div className="summary-title">Your bag</div>
            {cart.length === 0 ? (
              <p className="cart-empty">
                Your bag is empty. Start by adding something from the
                collection.
              </p>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-thumb">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="cart-main">
                    <div className="cart-item-name">{item.name}</div>
                    <div className="cart-meta-row">
                      <span>{item.category}</span>
                      <span>₹{item.price}</span>
                    </div>
                    <div className="cart-qty">
                      <button
                        onClick={() => handleChangeQty(item.id, -1)}
                      >
                        −
                      </button>
                      <span>{item.qty}</span>
                      <button
                        onClick={() => handleChangeQty(item.id, 1)}
                      >
                        +
                      </button>
                      <span
                        className="cart-remove"
                        onClick={() => handleRemove(item.id)}
                      >
                        Remove
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <aside className="summary-card">
            <div className="summary-title">Order summary</div>
            <div className="summary-row muted">
              <span>Items</span>
              <span>{totalItems}</span>
            </div>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="summary-row muted">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
            </div>
            <div className="summary-total">
              <span>Total</span> <span> · </span> <span>₹{total}</span>
            </div>
            <button
              className="btn-checkout"
              disabled={cart.length === 0}
            >
              Continue to checkout
            </button>
          </aside>
        </section>
      </main>

      {/* AUTH MODAL */}
      <AuthModal
        open={authOpen}
        mode="login"
        onClose={() => setAuthOpen(false)}
      />
    </div>
  );
}

export default App;
