import React, { useState } from 'react';
import { Navbar } from '../common/navbar';
import { Slideshow } from '../common/slideshow';
import { DishCard } from './dish';
import { CartSidebar } from './cart';
import { CheckoutModal } from './checkout';
import { ContactSection } from './contact';
import { T, CATEGORIES } from '../../themes';

export function StudentApp({ user, onLogout, dishes, showToast }) {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const addToCart = (dish, portion) => {
    const price = portion === "half" ? dish.halfPrice : dish.fullPrice;
    setCart(prev => {
      const existing = prev.find(item => item.dishId === dish.id && item.portion === portion);
      if (existing) {
        return prev.map(item =>
          item.dishId === dish.id && item.portion === portion
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...prev, {
        dishId: dish.id,
        portion,
        price,
        qty: 1,
        name: dish.name,
        emoji: dish.emoji,
        img: dish.img
      }];
    });
    showToast(`🛒 ${dish.name} added!`);
  };

  const handleOrderPlaced = (order) => {
    setCart([]);
    setCheckoutOpen(false);
    showToast(`✅ Order placed! Ref: ${order.ref}`);
  };

  let filteredDishes = dishes.filter(dish => {
    const matchesCategory = selectedCategory === "all" || dish.category === selectedCategory;
    const matchesSearch = dish.name.toLowerCase().includes(searchTerm.toLowerCase()) || dish.desc.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (sortBy === "price-asc") {
    filteredDishes.sort((a, b) => a.fullPrice - b.fullPrice);
  } else if (sortBy === "price-desc") {
    filteredDishes.sort((a, b) => b.fullPrice - a.fullPrice);
  } else if (sortBy === "name") {
    filteredDishes.sort((a, b) => a.name.localeCompare(b.name));
  }

  return (
    <div>
      <Navbar
        user={user}
        onLogout={onLogout}
        onContact={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
        onCartOpen={() => setCartOpen(true)}
        cartCount={cartCount}
      />

      <Slideshow dishes={dishes} />

      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem 1.5rem" }}>
        <div style={{
          background: T.white,
          borderRadius: 16,
          padding: "1.2rem 1.5rem",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          marginBottom: "1.8rem",
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          alignItems: "center"
        }}>
          <div style={{ flex: 1, minWidth: 200, position: "relative" }}>
            <span style={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "1.1rem",
              pointerEvents: "none"
            }}>🔍</span>
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search dishes..."
              style={{
                width: "100%",
                padding: "9px 16px 9px 40px",
                border: `2px solid ${T.border}`,
                borderRadius: 10,
                fontFamily: "'Nunito', sans-serif",
                fontSize: "0.95rem",
                outline: "none",
                transition: "border 0.2s"
              }}
            />
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {[
              { id: "all", label: "All" },
              ...CATEGORIES.map(cat => ({ id: cat.id, label: `${cat.emoji} ${cat.label}` }))
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  padding: "7px 16px",
                  borderRadius: 20,
                  border: `2px solid ${selectedCategory === cat.id ? T.green : T.border}`,
                  background: selectedCategory === cat.id ? T.green : T.white,
                  color: selectedCategory === cat.id ? "#fff" : T.textMuted,
                  fontFamily: "'Nunito', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.88rem",
                  cursor: "pointer",
                  transition: "all 0.18s"
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            style={{
              padding: "8px 14px",
              border: `2px solid ${T.border}`,
              borderRadius: 10,
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 700,
              fontSize: "0.88rem",
              outline: "none",
              cursor: "pointer"
            }}
          >
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low–High</option>
            <option value="price-desc">Price: High–Low</option>
            <option value="name">Name A–Z</option>
          </select>
        </div>

        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1.2rem"
        }}>
          <h2 style={{ fontFamily: "'Fredoka One', cursive", fontSize: "1.6rem", color: T.green }}>
            🍛 Today's Menu
          </h2>
          <span style={{
            background: T.greenPale,
            color: T.green,
            padding: "3px 12px",
            borderRadius: 20,
            fontSize: "0.82rem",
            fontWeight: 700
          }}>
            {filteredDishes.length} dish{filteredDishes.length !== 1 ? "es" : ""}
          </span>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "1.4rem"
        }}>
          {filteredDishes.map(dish => (
            <DishCard key={dish.id} dish={dish} onAdd={addToCart} />
          ))}
        </div>

        <ContactSection />
      </main>

      <footer style={{
        background: T.green,
        color: "rgba(255,255,255,0.8)",
        textAlign: "center",
        padding: "1.4rem",
        fontSize: "0.85rem",
        marginTop: "3rem"
      }}>
        <strong style={{ color: "#fff" }}>CampusEats</strong> — Serving fresh, affordable meals to students every day 💚
        <br />
        <small>2024 CampusEats School Meal Service. All rights reserved.</small>
      </footer>

      <CartSidebar
        cart={cart}
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onQty={(idx, delta) => {
          const newCart = [...cart];
          newCart[idx] = { ...newCart[idx], qty: newCart[idx].qty + delta };
          setCart(newCart.filter(item => item.qty > 0));
        }}
        onRemove={idx => setCart(prev => prev.filter((_, i) => i !== idx))}
        onCheckout={() => {
          if (cart.length === 0) {
            showToast("🛒 Cart is empty!", "error");
            return;
          }
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        cart={cart}
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        onPlaced={handleOrderPlaced}
      />
    </div>
  );
}