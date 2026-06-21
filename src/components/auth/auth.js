import React, { useState } from 'react';
import { T } from '../../themes';

const API_URL = 'http://localhost:5000/api';

export function AuthApp({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      if (isLogin) {
        
        const response = await fetch(`${API_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Login failed');
        }

        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        onLogin(data.user);

      } else {
        
        if (password !== confirmPassword) {
          throw new Error('Passwords do not match');
        }

        if (password.length < 6) {
          throw new Error('Password must be at least 6 characters');
        }

        const response = await fetch(`${API_URL}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            username,
            email,
            fullName,
            password,
            role: 'student'
          })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Registration failed');
        }

        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        onLogin(data.user);
      }

    } catch (error) {
      setErr(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #1B5E20, #2E7D32, #388E3C)",
      padding: "1rem"
    }}>
      <div className="pop-in" style={{
        background: "#fff",
        borderRadius: 20,
        padding: "2.4rem 2rem",
        width: "100%",
        maxWidth: 400,
        boxShadow: "0 20px 60px rgba(0,0,0,0.25)"
      }}>
        <div style={{ textAlign: "center", marginBottom: "1.6rem" }}>
          <div style={{ fontFamily: "'Fredoka One',cursive", fontSize: "2rem", color: T.green }}>
            🍽️ CampusEats
          </div>
          <div style={{ color: T.textMuted, fontSize: "0.88rem", marginTop: 4 }}>
            {isLogin ? 'Sign in to continue' : 'Create your student account'}
          </div>
        </div>

        {/* Toggle Login/Register */}
        <div style={{
          display: "flex",
          background: T.offWhite,
          borderRadius: 10,
          padding: 4,
          marginBottom: "1.4rem",
          gap: 4
        }}>
          <button
            onClick={() => { setIsLogin(true); setErr(""); }}
            style={{
              flex: 1,
              padding: "8px",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              background: isLogin ? T.green : "transparent",
              color: isLogin ? "#fff" : T.textMuted,
              fontFamily: "'Nunito',sans-serif",
              fontWeight: 700,
              fontSize: "0.85rem",
              transition: "all 0.2s"
            }}
          >
            Sign In
          </button>
          <button
            onClick={() => { setIsLogin(false); setErr(""); }}
            style={{
              flex: 1,
              padding: "8px",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              background: !isLogin ? T.green : "transparent",
              color: !isLogin ? "#fff" : T.textMuted,
              fontFamily: "'Nunito',sans-serif",
              fontWeight: 700,
              fontSize: "0.85rem",
              transition: "all 0.2s"
            }}
          >
            Create Account
          </button>
        </div>

        {err && (
          <div style={{
            background: T.redPale,
            color: T.red,
            borderRadius: 8,
            padding: "8px 12px",
            fontSize: "0.85rem",
            fontWeight: 700,
            marginBottom: "1rem"
          }}>
            {err}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {!isLogin ? (
            
            <>
              <div style={{ marginBottom: "1rem" }}>
                <label style={{
                  display: "block",
                  fontWeight: 700,
                  fontSize: "0.78rem",
                  color: T.textMuted,
                  textTransform: "uppercase",
                  marginBottom: 5
                }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder="e.g. John Doe"
                  required
                  style={inputStyle}
                />
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <label style={{
                  display: "block",
                  fontWeight: 700,
                  fontSize: "0.78rem",
                  color: T.textMuted,
                  textTransform: "uppercase",
                  marginBottom: 5
                }}>
                  Email *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  required
                  style={inputStyle}
                />
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <label style={{
                  display: "block",
                  fontWeight: 700,
                  fontSize: "0.78rem",
                  color: T.textMuted,
                  textTransform: "uppercase",
                  marginBottom: 5
                }}>
                  Username *
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value.toLowerCase())}
                  placeholder="Choose a username (e.g. johndoe)"
                  required
                  style={inputStyle}
                />
              </div>
            </>
          ) : (
            
            <div style={{ marginBottom: "1rem" }}>
              <label style={{
                display: "block",
                fontWeight: 700,
                fontSize: "0.78rem",
                color: T.textMuted,
                textTransform: "uppercase",
                marginBottom: 5
              }}>
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
                style={inputStyle}
              />
            </div>
          )}

          <div style={{ marginBottom: "1rem" }}>
            <label style={{
              display: "block",
              fontWeight: 700,
              fontSize: "0.78rem",
              color: T.textMuted,
              textTransform: "uppercase",
              marginBottom: 5
            }}>
              Password *
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder={isLogin ? "Enter your password" : "Min 6 characters"}
              required
              minLength={6}
              style={inputStyle}
            />
          </div>

          {!isLogin && (
            <div style={{ marginBottom: "1rem" }}>
              <label style={{
                display: "block",
                fontWeight: 700,
                fontSize: "0.78rem",
                color: T.textMuted,
                textTransform: "uppercase",
                marginBottom: 5
              }}>
                Confirm Password *
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
                style={inputStyle}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              background: loading ? T.border : T.green,
              color: loading ? T.textMuted : "#fff",
              border: "none",
              borderRadius: 12,
              padding: 13,
              fontFamily: "'Fredoka One',cursive",
              fontSize: "1.1rem",
              cursor: loading ? "not-allowed" : "pointer",
              marginTop: "0.4rem",
              transition: "all 0.2s"
            }}
          >
            {loading ? 'Processing...' : (isLogin ? 'Sign In →' : 'Create Account →')}
          </button>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px 14px",
  border: `2px solid ${T.border}`,
  borderRadius: 10,
  fontFamily: "'Nunito',sans-serif",
  fontSize: "0.95rem",
  outline: "none",
  transition: "border 0.2s"
};