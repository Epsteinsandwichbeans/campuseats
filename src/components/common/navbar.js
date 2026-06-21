import React from 'react';
import { T } from '../../themes';

export function Navbar({ title, subtitle, user, onLogout, onContact, onCartOpen, cartCount }) {
  return (
    <nav style={{
      background: T.green,
      padding: "0 2rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: 68,
      position: "sticky",
      top: 0,
      zIndex: 100,
      boxShadow: "0 2px 12px rgba(0,0,0,0.18)"
    }}>
      <div style={{
        fontFamily: "'Fredoka One', cursive",
        fontSize: "1.7rem",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        gap: 8
      }}>
        🍽️ CampusEats
        <span style={{
          background: T.yellow,
          color: T.green,
          borderRadius: 8,
          padding: "1px 8px",
          fontSize: "1rem"
        }}>
          {subtitle || "SCHOOL"}
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {user && (
          <span style={{
            background: "rgba(255,255,255,0.15)",
            color: "#fff",
            border: "1.5px solid rgba(255,255,255,0.4)",
            borderRadius: 8,
            padding: "5px 12px",
            fontSize: "0.85rem",
            fontWeight: 700
          }}>
            {user.role === "admin" ? "🔧 " : "👤 "}{user.name}
          </span>
        )}
        <button
          onClick={onContact}
          style={{
            background: "rgba(255,255,255,0.15)",
            color: "#fff",
            border: "1.5px solid rgba(255,255,255,0.4)",
            padding: "6px 16px",
            borderRadius: 8,
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 700,
            fontSize: "0.92rem",
            cursor: "pointer",
            transition: "background 0.2s"
          }}
          onMouseEnter={e => e.target.style.background = "rgba(255,255,255,0.28)"}
          onMouseLeave={e => e.target.style.background = "rgba(255,255,255,0.15)"}
        >
          📞 Contact
        </button>
        {onCartOpen && (
          <button
            onClick={onCartOpen}
            style={{
              background: T.yellow,
              color: T.green,
              border: "none",
              borderRadius: 12,
              padding: "8px 20px",
              fontFamily: "'Fredoka One', cursive",
              fontSize: "1rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
              transition: "transform 0.15s, box-shadow 0.15s",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
            }}
            onMouseEnter={e => { e.target.style.transform = "translateY(-1px)"; e.target.style.boxShadow = "0 4px 16px rgba(0,0,0,0.2)"; }}
            onMouseLeave={e => { e.target.style.transform = "none"; e.target.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)"; }}
          >
            🛒 Cart
            <span style={{
              background: T.redLight,
              color: "#fff",
              borderRadius: "50%",
              width: 22,
              height: 22,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.78rem",
              fontWeight: 800
            }}>
              {cartCount || 0}
            </span>
          </button>
        )}
        {user && (
          <button
            onClick={onLogout}
            style={{
              background: "rgba(255,255,255,0.15)",
              color: "#fff",
              border: "1.5px solid rgba(255,255,255,0.4)",
              borderRadius: 8,
              padding: "6px 14px",
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 700,
              fontSize: "0.85rem",
              cursor: "pointer"
            }}
          >
            Sign Out
          </button>
        )}
      </div>
    </nav>
  );
}