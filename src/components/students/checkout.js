import React, { useState } from 'react';
import { T, PAYMENT_METHODS, PICKUP_TIMES } from '../../themes';

export function CheckoutModal({ cart, open, onClose, onPlaced }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [phone, setPhone] = useState("");
  const [pickup, setPickup] = useState(PICKUP_TIMES[0]);
  const [payment, setPayment] = useState(null);
  const [instructions, setInstructions] = useState("");
  const [placed, setPlaced] = useState(false);
  const [ref, setRef] = useState("");

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handlePlaceOrder = () => {
    if (!payment) return;
    const orderRef = "CE-" + Date.now().toString().slice(-6) + "-" + Math.floor(Math.random() * 900 + 100);
    setRef(orderRef);
    setPlaced(true);
    onPlaced({
      ref: orderRef,
      name,
      id: studentId,
      items: cart,
      total,
      payment,
      pickup,
      instructions
    });
  };

  if (!open) return null;

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.55)",
      zIndex: 400,
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
      padding: "2rem 1rem",
      overflowY: "auto"
    }}>
      <div className="pop-in" style={{
        background: T.white,
        borderRadius: 20,
        width: "100%",
        maxWidth: 540,
        overflow: "hidden",
        boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
        margin: "auto"
      }}>
        <div style={{
          background: T.green,
          padding: "1.4rem 1.8rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <h2 style={{ fontFamily: "'Fredoka One', cursive", color: "#fff", fontSize: "1.6rem" }}>
            🧾 Checkout
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
              cursor: "pointer"
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ padding: "1.8rem" }}>
          {placed ? (
            <div style={{ textAlign: "center", padding: "2rem 1rem" }}>
              <span style={{ fontSize: "4rem", display: "block", marginBottom: "1rem" }}>🎉</span>
              <h2 style={{ fontFamily: "'Fredoka One', cursive", color: T.green, fontSize: "2rem", marginBottom: "0.5rem" }}>
                Order Placed!
              </h2>
              <p style={{ color: T.textMuted, fontSize: "0.95rem" }}>
                Your order has been received. Please make payment and show this reference at the counter.
              </p>
              <div style={{
                background: T.greenPale,
                borderRadius: 10,
                padding: "0.8rem 1.2rem",
                display: "inline-block",
                margin: "1rem 0",
                fontWeight: 800,
                color: T.green,
                letterSpacing: 1
              }}>
                📦 {ref}
              </div>
              <p style={{ color: T.textMuted, fontSize: "0.95rem" }}>
                We'll have your food ready at your chosen pickup time! 🍽️
              </p>
              <button
                onClick={onClose}
                style={{
                  width: "100%",
                  background: T.green,
                  color: "#fff",
                  border: "none",
                  borderRadius: 12,
                  padding: 14,
                  fontFamily: "'Fredoka One', cursive",
                  fontSize: "1.15rem",
                  cursor: "pointer",
                  marginTop: "1.5rem"
                }}
              >
                Done
              </button>
            </div>
          ) : (
            <>
              
              <div style={{ display: "flex", gap: 4, marginBottom: "1.6rem" }}>
                {[1, 2, 3].map(n => (
                  <div key={n} style={{
                    flex: 1,
                    height: 6,
                    borderRadius: 3,
                    background: n < step ? T.green : n === step ? T.greenLight : T.border,
                    transition: "background 0.3s"
                  }} />
                ))}
              </div>

              
              {step === 1 && (
                <div className="slide-up">
                  <div style={{ marginBottom: "1.4rem" }}>
                    <h3 style={{ fontFamily: "'Fredoka One', cursive", color: T.green, fontSize: "1.1rem", marginBottom: "0.8rem" }}>
                      👤 Your Details
                    </h3>
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Full Name *"
                      style={inputStyle}
                    />
                    <input
                      type="text"
                      value={studentId}
                      onChange={e => setStudentId(e.target.value)}
                      placeholder="Student/Staff ID *"
                      style={inputStyle}
                    />
                    <input
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="Phone Number *"
                      style={inputStyle}
                    />
                  </div>
                  <div style={{ marginBottom: "1.4rem" }}>
                    <h3 style={{ fontFamily: "'Fredoka One', cursive", color: T.green, fontSize: "1.1rem", marginBottom: "0.8rem" }}>
                      📦 Pickup Time
                    </h3>
                    <select
                      value={pickup}
                      onChange={e => setPickup(e.target.value)}
                      style={inputStyle}
                    >
                      {PICKUP_TIMES.map(time => (
                        <option key={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={() => setStep(2)}
                    style={buttonStyle(T.green)}
                  >
                    Continue to Payment →
                  </button>
                </div>
              )}

              
              {step === 2 && (
                <div className="slide-up">
                  <div style={{ marginBottom: "1.4rem" }}>
                    <h3 style={{ fontFamily: "'Fredoka One', cursive", color: T.green, fontSize: "1.1rem", marginBottom: "0.8rem" }}>
                      💳 Choose Payment Method
                    </h3>
                    <div style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: 10,
                      marginBottom: "1rem"
                    }}>
                      {Object.values(PAYMENT_METHODS).map(method => (
                        <div
                          key={method.id}
                          onClick={() => setPayment(method.id)}
                          style={{
                            padding: "1rem 0.5rem",
                            border: `2.5px solid ${payment === method.id ? T.green : T.border}`,
                            borderRadius: 12,
                            cursor: "pointer",
                            textAlign: "center",
                            transition: "all 0.2s",
                            fontWeight: 700,
                            fontSize: "0.82rem",
                            color: payment === method.id ? T.green : T.textMuted,
                            background: payment === method.id ? T.greenPale : T.white
                          }}
                        >
                          <span style={{ fontSize: "1.8rem", display: "block", marginBottom: 4 }}>
                            {method.icon}
                          </span>
                          {method.label}
                        </div>
                      ))}
                    </div>
                    {payment && (
                      <div style={{
                        background: T.greenPale,
                        borderRadius: 10,
                        padding: "1rem",
                        border: `1.5px solid ${T.greenLight}`,
                        marginBottom: "1rem",
                        fontSize: "0.88rem"
                      }}>
                        {PAYMENT_METHODS[payment].details}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => payment && setStep(3)}
                    style={buttonStyle(payment ? T.green : T.border)}
                  >
                    Review Order →
                  </button>
                  <button
                    onClick={() => setStep(1)}
                    style={{
                      ...buttonStyle(T.border),
                      background: "transparent",
                      color: T.textMuted,
                      marginTop: 8
                    }}
                  >
                    ← Back
                  </button>
                </div>
              )}

              
              {step === 3 && (
                <div className="slide-up">
                  <div style={{ marginBottom: "1.4rem" }}>
                    <h3 style={{ fontFamily: "'Fredoka One', cursive", color: T.green, fontSize: "1.1rem", marginBottom: "0.8rem" }}>
                      📋 Order Summary
                    </h3>
                    <div style={{
                      background: T.offWhite,
                      borderRadius: 10,
                      padding: "1rem",
                      marginBottom: "1.2rem",
                      border: `1.5px solid ${T.border}`
                    }}>
                      {cart.map(item => (
                        <div key={`${item.dishId}-${item.portion}`} style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: "0.88rem",
                          padding: "3px 0",
                          color: T.textMuted
                        }}>
                          <span>{item.name} ({item.portion}) ×{item.qty}</span>
                          <span>KES {item.price * item.qty}</span>
                        </div>
                      ))}
                      <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "0.88rem",
                        padding: "3px 0",
                        color: T.textMuted
                      }}>
                        <span>Payment:</span>
                        <span>{PAYMENT_METHODS[payment]?.label}</span>
                      </div>
                      <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "0.88rem",
                        padding: "3px 0",
                        color: T.textMuted
                      }}>
                        <span>Pickup:</span>
                        <span>{pickup}</span>
                      </div>
                      <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "1rem",
                        fontWeight: 800,
                        color: T.text,
                        borderTop: `1.5px solid ${T.border}`,
                        marginTop: 6,
                        paddingTop: 8
                      }}>
                        <span>Total</span>
                        <span>KES {total}</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ marginBottom: "1.4rem" }}>
                    <h3 style={{ fontFamily: "'Fredoka One', cursive", color: T.green, fontSize: "1.1rem", marginBottom: "0.8rem" }}>
                      📝 Special Instructions
                    </h3>
                    <textarea
                      value={instructions}
                      onChange={e => setInstructions(e.target.value)}
                      placeholder="Any allergies, special requests? (optional)"
                      style={{
                        ...inputStyle,
                        height: 70,
                        resize: "vertical"
                      }}
                    />
                  </div>
                  <button
                    onClick={handlePlaceOrder}
                    style={buttonStyle(T.green)}
                  >
                    ✅ Place Order
                  </button>
                  <button
                    onClick={() => setStep(2)}
                    style={{
                      ...buttonStyle(T.border),
                      background: "transparent",
                      color: T.textMuted,
                      marginTop: 8
                    }}
                  >
                    ← Back
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px 14px",
  border: `2px solid var(--border)`,
  borderRadius: 10,
  fontFamily: "'Nunito', sans-serif",
  fontSize: "0.95rem",
  outline: "none",
  marginBottom: 10,
  borderColor: T.border,
  color: T.text
};

const buttonStyle = (bg) => ({
  width: "100%",
  background: bg,
  color: bg === T.border ? T.textMuted : "#fff",
  border: "none",
  borderRadius: 12,
  padding: 14,
  fontFamily: "'Fredoka One', cursive",
  fontSize: "1.15rem",
  cursor: bg === T.border ? "not-allowed" : "pointer",
  transition: "background 0.2s"
});