import React from 'react';
import { T, CONTACT_INFO, OPENING_HOURS } from '../../themes';

export function ContactSection() {
  const getBgClass = (type) => {
    switch(type) {
      case 'green': return T.greenPale;
      case 'yellow': return T.yellowLight;
      case 'red': return T.redPale;
      default: return T.greenPale;
    }
  };

  return (
    <div id="contact" style={{
      background: T.white,
      borderRadius: 16,
      boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
      padding: "2.5rem 2rem",
      marginTop: "3rem"
    }}>
      <h2 style={{
        fontFamily: "'Fredoka One', cursive",
        color: T.green,
        fontSize: "2rem",
        marginBottom: "0.3rem"
      }}>
        📞 Get in Touch
      </h2>
      <p style={{
        color: T.textMuted,
        marginBottom: "2rem",
        fontSize: "0.95rem"
      }}>
        We're here to help with orders, feedback, or any questions about our meals.
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: "1.2rem"
      }}>
        {CONTACT_INFO.map((info, index) => (
          <div key={index} style={{
            background: T.offWhite,
            borderRadius: 12,
            padding: "1.2rem 1.4rem",
            display: "flex",
            alignItems: "flex-start",
            gap: 12,
            border: `1.5px solid ${T.border}`
          }}>
            <div style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: getBgClass(info.bg),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.4rem",
              flexShrink: 0
            }}>
              {info.icon}
            </div>
            <div>
              <h4 style={{
                fontWeight: 800,
                fontSize: "0.88rem",
                color: T.textMuted,
                textTransform: "uppercase",
                marginBottom: 3
              }}>
                {info.title}
              </h4>
              <p style={{
                fontWeight: 700,
                fontSize: "0.92rem",
                color: T.text,
                lineHeight: 1.5,
                whiteSpace: "pre-line"
              }}>
                {info.text}
              </p>
            </div>
          </div>
        ))}
        <div style={{
          background: T.offWhite,
          borderRadius: 12,
          padding: "1.2rem 1.4rem",
          display: "flex",
          alignItems: "flex-start",
          gap: 12,
          border: `1.5px solid ${T.border}`,
          gridColumn: "span 2"
        }}>
          <div style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            background: T.greenPale,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.4rem",
            flexShrink: 0
          }}>
            🕐
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{
              fontWeight: 800,
              fontSize: "0.88rem",
              color: T.textMuted,
              textTransform: "uppercase",
              marginBottom: 6
            }}>
              Opening Hours
            </h4>
            {OPENING_HOURS.map(({ day, hours }) => (
              <div key={day} style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "0.85rem",
                padding: "4px 0",
                borderBottom: `1px solid ${T.border}`
              }}>
                <span>{day}</span>
                <span>{hours}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}