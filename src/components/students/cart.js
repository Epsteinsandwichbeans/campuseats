import React from 'react';
import { T } from '../../themes';

export function CartSidebar({ cart, open, onClose, onQty, onRemove, onCheckout }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const count = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <>
      {open && (
        <div
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            zIndex: 200
          }}
        />
      )}
      
      <div
        className={open ? "cart-sidebar-enter" : ""}
        style={{
          position: "fixed",
          right: open ? 0 : "-420px",
          top: 0,
          bottom: 0,
          width: 420,
          maxWidth: "98vw",
          background: T.white,
          zIndex: 300,
          boxShadow: "-4px 0 30px rgba(0,0,0,0.18)",
          display: "flex",
          flexDirection: "column",
          transition: open ? "none" : "right 0.3s ease"
        }}
      >
        <div style={{
          background: T.green,
          color: "#fff",
          padding: "1.2rem 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <h2 style={{ fontFamily: "'Fredoka One', cursive", fontSize: "1.5rem" }}>
            🛒 Your Order
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.2)",
              border: "none",
              color: "#fff",
              borderRadius: 8,
              width: 34,
              height: 34,
              fontSize: "1.2rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "1rem" }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: "center", padding: "3rem 1rem", color: T.textMuted }}>
              <span style={{ fontSize: "3rem", display: "block", marginBottom: "0.5rem" }}>🍽️</span>
              <p>Your cart is empty.<br />Add some delicious meals!</p>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div key={`${item.dishId}-${item.portion}`} style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 0",
                borderBottom: `1.5px solid ${T.border}`
              }}>
                <div style={{
                  width: 56,
                  height: 56,
                  borderRadius: 10,
                  background: T.greenPale,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                  flexShrink: 0,
                  overflow: "hidden"
                }}>
                  {item.img ? (
                    <img src={item.img} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt={item.name} />
                  ) : (
                    item.emoji
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, fontSize: "0.92rem" }}>{item.name}</div>
                  <div style={{ fontSize: "0.78rem", color: T.textMuted, marginTop: 1 }}>
                    {item.portion === "half" ? "Half Portion" : "Full Portion"}
                  </div>
                  <div style={{ fontWeight: 800, color: T.green, fontSize: "0.95rem" }}>
                    KES {item.price * item.qty}
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <button
                      onClick={() => onQty(idx, -1)}
                      style={{
                        background: T.border,
                        border: "none",
                        borderRadius: 6,
                        width: 26,
                        height: 26,
                        fontSize: "1rem",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 800
                      }}
                    >
                      −
                    </button>
                    <span style={{ fontWeight: 800, fontSize: "0.9rem", minWidth: 20, textAlign: "center" }}>
                      {item.qty}
                    </span>
                    <button
                      onClick={() => onQty(idx, 1)}
                      style={{
                        background: T.border,
                        border: "none",
                        borderRadius: 6,
                        width: 26,
                        height: 26,
                        fontSize: "1rem",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 800
                      }}
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => onRemove(idx)}
                    style={{
                      background: T.redPale,
                      border: "none",
                      color: T.red,
                      borderRadius: 6,
                      padding: "4px 8px",
                      fontSize: "0.78rem",
                      cursor: "pointer",
                      fontWeight: 700
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div style={{
          padding: "1rem 1.2rem",
          borderTop: `2px solid ${T.border}`,
          background: T.offWhite
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "1rem",
            fontSize: "1.1rem",
            fontWeight: 800
          }}>
            <span>Total:</span>
            <span style={{ color: T.green }}>KES {total}</span>
          </div>
          <button
            onClick={onCheckout}
            style={{
              width: "100%",
              background: T.green,
              color: "#fff",
              border: "none",
              borderRadius: 12,
              padding: 14,
              fontFamily: "'Fredoka One', cursive",
              fontSize: "1.1rem",
              cursor: "pointer",
              transition: "background 0.2s, transform 0.15s"
            }}
          >
            Proceed to Checkout →
          </button>
        </div>
      </div>
    </>
  );
}