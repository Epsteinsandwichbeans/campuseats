import React, { useState } from 'react';
import { T, CAT_LABELS, CAT_COLORS } from '../../themes';

export function DishCard({ dish, onAdd }) {
  const [portion, setPortion] = useState("full");
  const [added, setAdded] = useState(false);
  const colors = CAT_COLORS[dish.category] || CAT_COLORS.rice;

  const handleAdd = () => {
    onAdd(dish, portion);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div style={{
      background: T.white,
      borderRadius: 16,
      overflow: "hidden",
      boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
      display: "flex",
      flexDirection: "column",
      transition: "transform 0.2s, box-shadow 0.2s"
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = "translateY(-4px)";
      e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.10)";
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = "none";
      e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.08)";
    }}>
      <div style={{
        position: "relative",
        height: 180,
        background: "#f0f0f0",
        overflow: "hidden"
      }}>
        {dish.img ? (
          <img src={dish.img} alt={dish.name} style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.3s"
          }} />
        ) : (
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            fontSize: "3.5rem",
            background: T.greenPale
          }}>
            {dish.emoji}
          </div>
        )}
        
        <span style={{
          position: "absolute",
          top: 10,
          left: 10,
          padding: "3px 10px",
          borderRadius: 20,
          fontSize: "0.75rem",
          fontWeight: 800,
          textTransform: "uppercase",
          backgroundColor: colors.bg,
          color: colors.color
        }}>
          {CAT_LABELS[dish.category]}
        </span>
        
        {dish.veg && (
          <span style={{
            position: "absolute",
            top: 10,
            right: 10,
            background: T.green,
            color: "#fff",
            borderRadius: "50%",
            width: 26,
            height: 26,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.8rem"
          }}>
            🌱
          </span>
        )}
      </div>

      <div style={{
        padding: "1rem 1rem 0.8rem",
        flex: 1,
        display: "flex",
        flexDirection: "column"
      }}>
        <div style={{
          fontWeight: 800,
          fontSize: "1.05rem",
          color: T.text,
          marginBottom: 4
        }}>
          {dish.name}
        </div>
        <div style={{
          fontSize: "0.83rem",
          color: T.textMuted,
          marginBottom: "0.8rem",
          lineHeight: 1.5,
          flex: 1
        }}>
          {dish.desc}
        </div>


        <div style={{
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          marginBottom: "0.8rem"
        }}>
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "5px 12px",
            borderRadius: 10,
            background: T.greenPale,
            border: `1.5px solid ${T.greenLight}`
          }}>
            <span style={{ fontSize: "0.7rem", color: T.textMuted, fontWeight: 700, textTransform: "uppercase" }}>
              Full
            </span>
            <span style={{ fontWeight: 800, fontSize: "1rem", color: T.green }}>
              KES {dish.fullPrice}
            </span>
          </div>
          {dish.halfPrice && (
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "5px 12px",
              borderRadius: 10,
              background: T.yellowLight,
              border: `1.5px solid ${T.yellow}`
            }}>
              <span style={{ fontSize: "0.7rem", color: T.textMuted, fontWeight: 700, textTransform: "uppercase" }}>
                Half
              </span>
              <span style={{ fontWeight: 800, fontSize: "1rem", color: T.orange }}>
                KES {dish.halfPrice}
              </span>
            </div>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <select
            value={portion}
            onChange={e => setPortion(e.target.value)}
            style={{
              flex: 1,
              padding: "7px 10px",
              border: `2px solid ${T.border}`,
              borderRadius: 8,
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 700,
              fontSize: "0.85rem",
              outline: "none",
              cursor: "pointer"
            }}
          >
            <option value="full">Full — KES {dish.fullPrice}</option>
            {dish.halfPrice && <option value="half">Half — KES {dish.halfPrice}</option>}
          </select>
          <button
            onClick={handleAdd}
            style={{
              background: added ? T.yellow : T.green,
              color: added ? T.green : "#fff",
              border: "none",
              borderRadius: 10,
              padding: "8px 16px",
              fontFamily: "'Fredoka One', cursive",
              fontSize: "0.95rem",
              cursor: "pointer",
              transition: "background 0.2s, transform 0.15s",
              whiteSpace: "nowrap"
            }}
          >
            {added ? "✓ Added" : "Add +"}
          </button>
        </div>
      </div>
    </div>
  );
}