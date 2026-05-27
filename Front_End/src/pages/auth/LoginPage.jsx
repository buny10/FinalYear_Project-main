import React, { useState } from 'react';
import { C } from '../../theme/colors';
import { GlobalStyle } from '../../theme/globalStyles';
import Icon from '../../components/ui/Icon';
import Input from '../../components/ui/Input';

export default function LoginPage({ onLogin, onNavigate }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
 


   // To this:
     const [loading, setLoading] = useState(false);

   const handleLogin = async () => {
  setError("");
  setLoading(true);
  try {
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
       window.location.href = "/dashboard";
    } else {
      setError(data.message || "Login failed");
    }
  } catch (err) {
    console.error(err);
    setError("Cannot reach server");
  } finally {
    setLoading(false);
  }
};

  return (
    <div style={{ minHeight: "100vh", display: "flex", background: C.bg, fontFamily: "'DM Sans', sans-serif" }}>
      <GlobalStyle />

      {/* LEFT SIDE */}
      <div 
        style={{
          width: "45%", 
          background: "#111", 
          display: "flex", 
          flexDirection: "column", 
          padding: "48px 44px", 
          borderRight: "1px solid #1e1e1e"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 64 }}>
          <svg width="38" height="38" viewBox="0 0 44 44" fill="none">
            <rect width="44" height="44" rx="10" fill={C.accent}/>
            <rect x="10" y="10" width="10" height="10" rx="2" fill="#0a0a0a"/>
            <rect x="24" y="10" width="10" height="10" rx="2" fill="#0a0a0a"/>
            <rect x="10" y="24" width="10" height="10" rx="2" fill="#0a0a0a"/>
            <rect x="24" y="24" width="10" height="10" rx="2" fill="#0a0a0a" opacity="0.4"/>
          </svg>

          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.3rem", color: "#fff" }}>
            BizCore
          </span>
        </div>

        <div style={{ flex: 1 }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "2.4rem", color: "#fff" }}>
            Experience the power of one dashboard to run the entire business.
          </h2>

          <p style={{ color: "#666", fontSize: "0.95rem", marginTop: 18 }}>
            One platform for HR, Finance, Inventory, Projects, CRM, and more.
          </p>
        </div>

        <p style={{ color: "#333", fontSize: "0.75rem" }}>
          © 2024 BizCore. All rights reserved.
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 40 }}>
        <div style={{ width: "100%", maxWidth: 400 }}>

          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "2rem", color: C.text }}>
            Sign in
          </h2>

          <p style={{ color: C.textMuted, marginBottom: 32 }}>
            Access your BizCore dashboard
          </p>

          {/* ERROR */}
          {error && (
            <div style={{ background: "#ef444418", padding: 10, borderRadius: 8, marginBottom: 16, color: "red" }}>
              <Icon name="warning" size={16} color="red" /> {error}
            </div>
          )}

          {/* EMAIL */}
          <Input
            label="Email"
            value={form.email}
            onChange={v => setForm({ ...form, email: v })}
            type="email"
            placeholder="bizcore@gmail.com"
          />

          {/* PASSWORD */}
          <Input
            label="Password"
            value={form.password}
            onChange={v => setForm({ ...form, password: v })}
            type="password"
            placeholder="••••••••"
          />

          {/* LOGIN BUTTON */}
          <button
            onClick={handleLogin}
            style={{
              width: "100%",
              padding: "12px",
              marginTop: 20,
              background: C.accent,
              border: "none",
              borderRadius: 10,
              fontWeight: 700,
              cursor: "pointer"
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          {/* REGISTER */}
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <span style={{ color: C.textMuted }}>No account? </span>
            <button
              onClick={() => onNavigate("register")}
              style={{ background: "none", border: "none", color: C.accent, cursor: "pointer" }}
            >
              Create one
            </button>
          </div>

          {/* DEMO */}
          {/* <div style={{ marginTop: 20, fontSize: "0.8rem", color: C.textMuted }}>
            Demo: admin@bizcore.com / admin123
          </div> */}

        </div>
      </div>
    </div>
  );
}