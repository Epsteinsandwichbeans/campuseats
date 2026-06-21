import React, { useState, useEffect } from 'react';
import pilau from '../../assets/images/pilau.jpg';
import chicken from '../../assets/images/chicken.jpg';
import coffee from '../../assets/images/coffee.jpeg';
import juice from '../../assets/images/juice.jpg';
import chapati from '../../assets/images/chapati.jpeg';

const FOOD_IMAGES = [pilau, chicken, coffee, juice, chapati];

export function Slideshow({ dishes }) {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const images = (dishes && dishes.length > 0) 
    ? dishes.slice(0, 5).map(d => d.img).filter(img => img)
    : FOOD_IMAGES;

  const slides = images.length > 0 ? images : [];

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setCurrent(c => (c + 1) % slides.length);
        setAnimating(false);
      }, 600);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (slides.length === 0) {
    return null;
  }

  const currentImage = slides[current];

  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: "70vh",
      minHeight: "450px",
      maxHeight: "700px",
      overflow: "hidden",
      backgroundColor: "#1a1a1a"
    }}>
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        transition: "opacity 0.8s ease-in-out",
        opacity: animating ? 0 : 1
      }}>
        <img
          src={currentImage}
          alt="CampusEats"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover"
          }}
        />
        
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7))"
        }} />
      </div>

      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "2rem",
        color: "#fff",
        zIndex: 2,
        opacity: animating ? 0 : 1,
        transform: animating ? "scale(0.98)" : "scale(1)",
        transition: "opacity 0.6s ease, transform 0.6s ease"
      }}>
        <div style={{
          fontFamily: "'Fredoka One', cursive",
          fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
          color: "#F9A825",
          marginBottom: "0.5rem",
          letterSpacing: "2px",
          textShadow: "0 2px 20px rgba(0,0,0,0.5)"
        }}>
          🍽️ CampusEats
        </div>

        <h1 style={{
          fontFamily: "'Fredoka One', cursive",
          fontSize: "clamp(3rem, 7vw, 5rem)",
          marginBottom: "0.5rem",
          textShadow: "0 4px 30px rgba(0,0,0,0.5)",
          color: "#fff",
          lineHeight: 1.1
        }}>
          Fresh Meals,<br />
          <span style={{ color: "#F9A825" }}>Every Day</span>
        </h1>

        <p style={{
          fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
          maxWidth: 600,
          margin: "0 auto 1.5rem",
          opacity: 0.95,
          textShadow: "0 2px 20px rgba(0,0,0,0.4)",
          color: "rgba(255,255,255,0.9)",
          lineHeight: 1.6,
          fontWeight: 600
        }}>
          Delicious, affordable school meals delivered fresh.<br />
          Order ahead & skip the queue!
        </p>

        <div style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          justifyContent: "center"
        }}>
          {[
            "🕐 Mon–Fri 7am–5pm",
            "✅ Fresh Daily",
            "💚 Affordable Prices",
            "📱 M-Pesa Accepted"
          ].map((badge, index) => (
            <span key={index} style={{
              background: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(10px)",
              padding: "8px 20px",
              borderRadius: 50,
              fontSize: "0.85rem",
              fontWeight: 600,
              border: "1px solid rgba(255,255,255,0.15)",
              color: "rgba(255,255,255,0.95)",
              textShadow: "0 1px 10px rgba(0,0,0,0.2)"
            }}>
              {badge}
            </span>
          ))}
        </div>

        <div style={{
          position: "absolute",
          bottom: 25,
          left: 0,
          right: 0,
          display: "flex",
          gap: "10px",
          justifyContent: "center"
        }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setCurrent(i);
                setAnimating(true);
                setTimeout(() => setAnimating(false), 600);
              }}
              style={{
                width: i === current ? 50 : 12,
                height: 4,
                borderRadius: 2,
                border: "none",
                background: i === current ? "#F9A825" : "rgba(255,255,255,0.3)",
                cursor: "pointer",
                transition: "all 0.4s ease"
              }}
            />
          ))}
        </div>

        <div style={{
          position: "absolute",
          bottom: 55,
          left: "50%",
          transform: "translateX(-50%)",
          animation: "bounce 2s infinite",
          opacity: 0.4
        }}>
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "4px",
            color: "rgba(255,255,255,0.6)"
          }}>
            <span style={{
              fontSize: "0.6rem",
              textTransform: "uppercase",
              letterSpacing: "2px",
              fontWeight: 700
            }}>
              Scroll
            </span>
            <span style={{ fontSize: "1.2rem" }}>⌄</span>
          </div>
        </div>
      </div>
    </div>
  );
}