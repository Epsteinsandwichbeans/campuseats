import React from 'react';
import { T } from '../../themes';

export function Toast({ toast }) {
  if (!toast) return null;
  
  const bg = toast.type === "error" ? T.red : T.green;
  
  return (
    <div style={{
      position: "fixed",
      bottom: "1.5rem",
      left: "50%",
      transform: "translateX(-50%)",
      background: bg,
      color: "#fff",
      padding: "10px 24px",
      borderRadius: 30,
      fontWeight: 700,
      fontSize: "0.92rem",
      zIndex: 500,
      boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
      animation: "toastIn 0.3s ease both"
    }}>
      {toast.msg}
    </div>
  );
}