import React, { useState, useEffect } from 'react';
import { Navbar } from '../common/navbar';
import { T, CAT_LABELS } from '../../themes';
import { INIT_DISHES } from '../../data/data';

const API_URL = 'http://localhost:5000/api';

export function AdminApp({ user, onLogout, dishes, setDishes, showToast }) {
  const [activeTab, setActiveTab] = useState("add");
  const [orders, setOrders] = useState([
    {
      ref: "CE-001",
      student: "Alex Kamau",
      id: "STU001",
      total: 230,
      pay: "mpesa",
      pickup: "Lunch Break",
      status: "New",
      time: "10:34 AM",
      items: ["Beef Pilau", "Chai (Tea)"],
    },
    {
      ref: "CE-002",
      student: "Brenda Wanjiku",
      id: "STU002",
      total: 180,
      pay: "card",
      pickup: "Morning Break",
      status: "Ready",
      time: "09:12 AM",
      items: ["Chicken Stew"],
    },
  ]);
  const [accounts, setAccounts] = useState([]);
  const [editDish, setEditDish] = useState(null);
  const [accForm, setAccForm] = useState({ name: "", id: "", pass: "", role: "student" });

  
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/auth/users`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setAccounts(data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  
  const afSet = (k) => (e) => setAccForm((f) => ({ ...f, [k]: e.target.value }));

  
  const addAccount = async () => {
    if (!accForm.name || !accForm.id || !accForm.pass) {
      showToast("⚠️ Fill all fields", "error");
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          userId: accForm.id,
          name: accForm.name,
          password: accForm.pass,
          role: accForm.role
        })
      });
      if (response.ok) {
        showToast("✅ Account created!");
        setAccForm({ name: "", id: "", pass: "", role: "student" });
        fetchUsers(); 
      } else {
        const data = await response.json();
        showToast(data.error || "Failed to create account", "error");
      }
    } catch (error) {
      showToast("Error creating account", "error");
    }
  };

  
  const delAccount = async (idx) => {
    const account = accounts[idx];
    if (account.user_id === user.id) {
      showToast("⚠️ Cannot remove your own account", "error");
      return;
    }
    if (!window.confirm("Remove this account?")) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/auth/users/${account.user_id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        showToast("🗑️ Account removed");
        fetchUsers(); 
      } else {
        const data = await response.json();
        showToast(data.error || "Failed to delete account", "error");
      }
    } catch (error) {
      showToast("Error deleting account", "error");
    }
  };

  const [form, setForm] = useState({
    name: "",
    desc: "",
    category: "rice",
    fullPrice: "",
    halfPrice: "",
    veg: "no",
    img: null,
  });
  const fSet = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleImgUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const r = new FileReader();
    r.onload = (ev) => setForm((f) => ({ ...f, img: ev.target.result }));
    r.readAsDataURL(file);
  };

  const addDish = () => {
    if (!form.name.trim() || !form.fullPrice) {
      showToast("⚠️ Name and full price required", "error");
      return;
    }
    const newDish = {
      id: Date.now(),
      name: form.name,
      desc: form.desc || "Freshly prepared",
      category: form.category,
      fullPrice: parseInt(form.fullPrice),
      halfPrice: form.halfPrice ? parseInt(form.halfPrice) : null,
      veg: form.veg === "yes",
      img: form.img,
      emoji: "🍽️",
    };
    setDishes((prev) => [...prev, newDish]);
    setForm({ name: "", desc: "", category: "rice", fullPrice: "", halfPrice: "", veg: "no", img: null });
    showToast("✅ Dish added!");
  };

  const deleteDish = (id) => {
    if (!window.confirm("Delete this dish?")) return;
    setDishes((prev) => prev.filter((d) => d.id !== id));
    showToast("🗑️ Dish removed");
  };

  const saveEdit = () => {
    if (!editDish.name || !editDish.fullPrice) {
      showToast("⚠️ Required fields missing", "error");
      return;
    }
    setDishes((prev) =>
      prev.map((d) =>
        d.id === editDish.id
          ? {
              ...editDish,
              fullPrice: parseInt(editDish.fullPrice),
              halfPrice: editDish.halfPrice ? parseInt(editDish.halfPrice) : null,
            }
          : d
      )
    );
    setEditDish(null);
    showToast("✏️ Dish updated!");
  };

  const handleEditImg = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const r = new FileReader();
    r.onload = (ev) => setEditDish((ed) => ({ ...ed, img: ev.target.result }));
    r.readAsDataURL(file);
  };

  const advStatus = (idx) => {
    setOrders((prev) =>
      prev.map((o, i) =>
        i === idx ? { ...o, status: o.status === "New" ? "Ready" : "Done" } : o
      )
    );
  };

  const TABS = [
    ["add", "➕ Add Dish"],
    ["manage", "📋 Manage Dishes"],
    ["orders", "📦 Orders"],
    ["accounts", "👥 Accounts"],
  ];

  const inputS = (extra = {}) => ({
    width: "100%",
    padding: "8px 11px",
    border: `2px solid ${T.border}`,
    borderRadius: 8,
    fontFamily: "'Nunito',sans-serif",
    fontSize: "0.9rem",
    outline: "none",
    ...extra,
  });

  const labelS = {
    fontWeight: 700,
    fontSize: "0.78rem",
    color: T.textMuted,
    textTransform: "uppercase",
    display: "block",
    marginBottom: 4,
  };

  const fgS = { display: "flex", flexDirection: "column", gap: 4, marginBottom: "0.9rem" };

  return (
    <div>
      <nav
        style={{
          background: T.green,
          padding: "0 1.8rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 64,
          position: "sticky",
          top: 0,
          zIndex: 100,
          boxShadow: "0 2px 12px rgba(0,0,0,0.18)",
        }}
      >
        <div
          style={{
            fontFamily: "'Fredoka One',cursive",
            fontSize: "1.6rem",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          🍽️ CampusEats{" "}
          <span
            style={{
              background: T.orange,
              color: "#fff",
              borderRadius: 6,
              padding: "1px 8px",
              fontSize: "0.85rem",
            }}
          >
            ADMIN
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span
            style={{
              background: "rgba(255,255,255,0.15)",
              color: "#fff",
              border: "1.5px solid rgba(255,255,255,0.35)",
              borderRadius: 8,
              padding: "5px 12px",
              fontSize: "0.85rem",
              fontWeight: 700,
            }}
          >
            🔧 {user.name}
          </span>
          <button
            onClick={onLogout}
            style={{
              background: "rgba(255,255,255,0.15)",
              color: "#fff",
              border: "1.5px solid rgba(255,255,255,0.35)",
              borderRadius: 8,
              padding: "6px 14px",
              fontFamily: "'Nunito',sans-serif",
              fontWeight: 700,
              fontSize: "0.85rem",
              cursor: "pointer",
            }}
          >
            Sign Out
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "1.6rem 1.4rem" }}>
        <div
          style={{
            background: "linear-gradient(135deg,#E65100,#FF6D00)",
            padding: "2rem",
            borderRadius: 14,
            color: "#fff",
            marginBottom: "1.6rem",
          }}
        >
          <div
            style={{
              fontFamily: "'Fredoka One',cursive",
              fontSize: "2rem",
              marginBottom: "0.3rem",
            }}
          >
            Admin Dashboard
          </div>
          <div style={{ opacity: 0.85, fontSize: "0.92rem" }}>
            Manage dishes, monitor orders, and control accounts.
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))",
            gap: "1rem",
            marginBottom: "1.6rem",
          }}
        >
          {[
            [dishes.length, "Total Dishes"],
            [orders.length, "Orders Today"],
            [accounts.filter((a) => a.role === "student").length, "Students"],
            [orders.reduce((s, o) => s + o.total, 0), "Revenue (KES)"],
          ].map(([v, l]) => (
            <div
              key={l}
              style={{
                background: "#fff",
                borderRadius: 14,
                padding: "1.1rem",
                boxShadow: "0 2px 14px rgba(0,0,0,0.08)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "'Fredoka One',cursive",
                  fontSize: "2rem",
                  color: T.green,
                }}
              >
                {v}
              </div>
              <div
                style={{
                  fontSize: "0.78rem",
                  color: T.textMuted,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  marginTop: 2,
                }}
              >
                {l}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 6, marginBottom: "1.4rem", flexWrap: "wrap" }}>
          {TABS.map(([v, l]) => (
            <button
              key={v}
              onClick={() => setActiveTab(v)}
              style={{
                padding: "8px 18px",
                borderRadius: 20,
                border: `2px solid ${activeTab === v ? T.orange : T.border}`,
                background: activeTab === v ? T.orange : "#fff",
                color: activeTab === v ? "#fff" : T.textMuted,
                fontFamily: "'Nunito',sans-serif",
                fontWeight: 700,
                fontSize: "0.85rem",
                cursor: "pointer",
                transition: "all 0.18s",
              }}
            >
              {l}
            </button>
          ))}
        </div>

        {activeTab === "add" && (
          <div
            className="slide-up"
            style={{
              background: "#fff",
              borderRadius: 14,
              padding: "1.5rem",
              boxShadow: "0 2px 14px rgba(0,0,0,0.08)",
            }}
          >
            <div
              style={{
                fontFamily: "'Fredoka One',cursive",
                color: T.orange,
                fontSize: "1.2rem",
                marginBottom: "1.1rem",
              }}
            >
              ➕ Add New Dish
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(190px,1fr))",
                gap: "0.9rem",
              }}
            >
              <div style={{ ...fgS, gridColumn: "span 2" }}>
                <label style={labelS}>Dish Name *</label>
                <input value={form.name} onChange={fSet("name")} placeholder="e.g. Beef Pilau" style={inputS()} />
              </div>
              <div style={{ ...fgS, gridColumn: "span 2" }}>
                <label style={labelS}>Description</label>
                <textarea
                  value={form.desc}
                  onChange={fSet("desc")}
                  placeholder="Short description…"
                  style={{ ...inputS(), resize: "vertical", minHeight: 60 }}
                />
              </div>
              <div style={fgS}>
                <label style={labelS}>Category *</label>
                <select value={form.category} onChange={fSet("category")} style={inputS()}>
                  {Object.entries(CAT_LABELS).map(([v, l]) => (
                    <option key={v} value={v}>
                      {l}
                    </option>
                  ))}
                </select>
              </div>
              <div style={fgS}>
                <label style={labelS}>Full Price (KES) *</label>
                <input type="number" value={form.fullPrice} onChange={fSet("fullPrice")} placeholder="120" style={inputS()} />
              </div>
              <div style={fgS}>
                <label style={labelS}>Half Price (KES)</label>
                <input type="number" value={form.halfPrice} onChange={fSet("halfPrice")} placeholder="70 (optional)" style={inputS()} />
              </div>
              <div style={fgS}>
                <label style={labelS}>Vegetarian?</label>
                <select value={form.veg} onChange={fSet("veg")} style={inputS()}>
                  <option value="no">No</option>
                  <option value="yes">Yes 🌱</option>
                </select>
              </div>
              <div style={{ ...fgS, gridColumn: "span 2" }}>
                <label style={labelS}>Dish Image</label>
                <input type="file" accept="image/*" onChange={handleImgUpload} style={inputS()} />
                {form.img && (
                  <img src={form.img} alt="preview" style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 8, marginTop: 6 }} />
                )}
              </div>
            </div>
            <button
              onClick={addDish}
              style={{
                background: T.green,
                color: "#fff",
                border: "none",
                borderRadius: 9,
                padding: "9px 22px",
                fontFamily: "'Fredoka One',cursive",
                fontSize: "0.95rem",
                cursor: "pointer",
                marginTop: "0.5rem",
              }}
            >
              💾 Save Dish
            </button>
          </div>
        )}

        {activeTab === "manage" && (
          <div className="slide-up">
          </div>
        )}

        {activeTab === "orders" && (
          <div className="slide-up">
          </div>
        )}

        {activeTab === "accounts" && (
          <div className="slide-up">
            <div
              style={{
                background: "#fff",
                borderRadius: 14,
                padding: "1.4rem",
                boxShadow: "0 2px 14px rgba(0,0,0,0.08)",
                marginBottom: "1.2rem",
              }}
            >
              <div
                style={{
                  fontFamily: "'Fredoka One',cursive",
                  color: T.green,
                  fontSize: "1.1rem",
                  marginBottom: "0.9rem",
                }}
              >
                ➕ Add New Account
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill,minmax(190px,1fr))",
                  gap: "0.9rem",
                }}
              >
                <div style={fgS}>
                  <label style={labelS}>Name</label>
                  <input value={accForm.name} onChange={afSet("name")} placeholder="Full name" style={inputS()} />
                </div>
                <div style={fgS}>
                  <label style={labelS}>ID</label>
                  <input value={accForm.id} onChange={afSet("id")} placeholder="e.g. STU003" style={inputS()} />
                </div>
                <div style={fgS}>
                  <label style={labelS}>Password</label>
                  <input type="password" value={accForm.pass} onChange={afSet("pass")} placeholder="Password" style={inputS()} />
                </div>
                <div style={fgS}>
                  <label style={labelS}>Role</label>
                  <select value={accForm.role} onChange={afSet("role")} style={inputS()}>
                    <option value="student">Student</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
              <button
                onClick={addAccount}
                style={{
                  background: T.green,
                  color: "#fff",
                  border: "none",
                  borderRadius: 9,
                  padding: "9px 22px",
                  fontFamily: "'Fredoka One',cursive",
                  fontSize: "0.95rem",
                  cursor: "pointer",
                  marginTop: "0.5rem",
                }}
              >
                💾 Add Account
              </button>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  background: "#fff",
                  borderRadius: 14,
                  overflow: "hidden",
                  boxShadow: "0 2px 14px rgba(0,0,0,0.08)",
                }}
              >
                <thead>
                  <tr>
                    {["Name", "ID", "Role", "Actions"].map((h) => (
                      <th
                        key={h}
                        style={{
                          background: T.green,
                          color: "#fff",
                          padding: "10px 14px",
                          fontSize: "0.82rem",
                          textAlign: "left",
                          fontWeight: 800,
                          textTransform: "uppercase",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {accounts.map((a, idx) => (
                    <tr key={a.user_id || a.id} style={{ borderBottom: `1.5px solid ${T.border}` }}>
                      <td style={{ padding: "10px 14px", fontSize: "0.88rem" }}>
                        <strong>{a.name}</strong>
                      </td>
                      <td style={{ padding: "10px 14px", fontSize: "0.88rem" }}>{a.user_id || a.id}</td>
                      <td style={{ padding: "10px 14px", fontSize: "0.88rem" }}>
                        <span
                          style={{
                            padding: "3px 10px",
                            borderRadius: 20,
                            fontSize: "0.75rem",
                            fontWeight: 800,
                            background: a.role === "admin" ? "#FFF3E0" : T.greenPale,
                            color: a.role === "admin" ? T.orange : T.green,
                          }}
                        >
                          {a.role === "admin" ? "Admin" : "Student"}
                        </span>
                      </td>
                      <td style={{ padding: "10px 14px" }}>
                        <button
                          onClick={() => delAccount(idx)}
                          style={{
                            background: T.redPale,
                            color: T.red,
                            border: "none",
                            borderRadius: 6,
                            padding: "4px 10px",
                            fontSize: "0.78rem",
                            fontWeight: 700,
                            cursor: "pointer",
                            fontFamily: "'Nunito',sans-serif",
                          }}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <footer
        style={{
          background: T.green,
          color: "rgba(255,255,255,0.75)",
          textAlign: "center",
          padding: "1.2rem",
          fontSize: "0.82rem",
          marginTop: "2rem",
        }}
      >
        <strong style={{ color: "#fff" }}>CampusEats Admin Panel</strong> — Manage with care 🔧
      </footer>
    </div>
  );
}