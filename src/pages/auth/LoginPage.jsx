import React, { useState } from 'react';
import { C } from '../../theme/colors';
import { GlobalStyle } from '../../theme/globalStyles';
import Icon from '../../components/ui/Icon';
import Input from '../../components/ui/Input';
import { MOCK_USERS } from '../../data/mockData';

export default function LoginPage({ onLogin, onNavigate }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!form.email || !form.password) {
      setError("Please fill all fields");
      return;
    }
    setLoading(true);
    setError("");
    setTimeout(() => {
      const u = MOCK_USERS.find(u => u.email === form.email && u.password === form.password);
      if (u) onLogin(u);
      else setError("Invalid email or password.");
      setLoading(false);
    }, 800);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", background: C.bg, fontFamily: "'DM Sans', sans-serif" }}>
      <GlobalStyle />
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
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.3rem", color: "#fff" }}>BizCore</span>
        </div>
        <div style={{ flex: 1 }}>
          <h2 
            style={{
              fontFamily: "'Syne', sans-serif", 
              fontWeight: 800, 
              fontSize: "2.4rem", 
              color: "#fff", 
              lineHeight: 1.15, 
              letterSpacing: "-1.5px", 
              marginBottom: 18
            }}
          >
           Experience the power of one dashboard to run the entire business.
          </h2>
          <p style={{ color: "#666", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: 48 }}>One platform for HR, Finance, Inventory, Projects, CRM, and more.</p>
          {[
            ["Employee Management", "Track your team, roles, and payroll"],
            ["Finance & Invoicing", "Full accounting with P&L insights"],
            ["Project Kanban", "Visual task and project tracking"],
            ["CRM & Sales", "Customer pipeline and revenue analytics"]
          ].map(([t, d], i) => (
            <div key={i} style={{ display: "flex", gap: 14, marginBottom: 18, alignItems: "flex-start" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.accent, marginTop: 6, flexShrink: 0 }}/>
              <div>
                <p style={{ color: "#ccc", fontWeight: 600, fontSize: "0.9rem", marginBottom: 2 }}>{t}</p>
                <p style={{ color: "#555", fontSize: "0.8rem" }}>{d}</p>
              </div>
            </div>
          ))}
        </div>
        <p style={{ color: "#333", fontSize: "0.75rem" }}>© 2024 BizCore. All rights reserved.</p>
      </div>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 40 }}>
        <div style={{ width: "100%", maxWidth: 400, animation: "fadeSlide 0.4s ease forwards" }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "2rem", color: C.text, marginBottom: 6, letterSpacing: "-0.5px" }}>Sign in</h2>
          <p style={{ color: C.textMuted, marginBottom: 32, fontSize: "0.9rem" }}>Access your BizCore dashboard</p>
          
          {error && (
            <div 
              style={{
                background: "#ef444418", 
                border: "1px solid #ef444440", 
                borderRadius: 9, 
                padding: "10px 14px", 
                marginBottom: 20, 
                color: C.danger, 
                fontSize: "0.84rem", 
                display: "flex", 
                gap: 8, 
                alignItems: "center"
              }}
            >
              <Icon name="warning" size={16} color={C.danger}/>
              {error}
            </div>
          )}
          
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Input 
              label="Email" 
              value={form.email} 
              onChange={v => setForm({ ...form, email: v })} 
              type="email" 
              placeholder="bizcore@gmail.com"
            />
            <Input 
              label="Password" 
              value={form.password} 
              onChange={v => setForm({ ...form, password: v })} 
              type="password" 
              placeholder="••••••••"
            />
          </div>
          
          <div style={{ display: "flex", justifyContent: "flex-end", margin: "10px 0 22px" }}>
            <a href="#" style={{ color: C.textMuted, fontSize: "0.82rem", textDecoration: "none" }} onClick={e => e.preventDefault()}>Forgot password?</a>
          </div>
          
          <button 
            onClick={handleLogin} 
            style={{
              width: "100%", 
              padding: "12px", 
              background: C.accent, 
              color: "#0a0a0a", 
              border: "none", 
              borderRadius: 10, 
              fontWeight: 700, 
              fontSize: "0.95rem", 
              fontFamily: "'DM Sans', sans-serif", 
              cursor: "pointer", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              gap: 8
            }}
          >
            {loading ? (
              <>
                <span 
                  style={{
                    width: 16, 
                    height: 16, 
                    border: "2px solid #0a0a0a40", 
                    borderTop: "2px solid #0a0a0a", 
                    borderRadius: "50%", 
                    animation: "spin 0.8s linear infinite", 
                    display: "inline-block"
                  }}
                /> 
                Signing in…
              </>
            ) : (
              <>
                Sign In <Icon name="logout" size={16} color="#0a0a0a"/>
              </>
            )}
          </button>
          
          <div style={{ textAlign: "center", marginTop: 24 }}>
            <span style={{ color: C.textMuted, fontSize: "0.85rem" }}>No account? </span>
            <button 
              onClick={() => onNavigate("register")} 
              style={{
                background: "none", 
                border: "none", 
                color: C.accent, 
                fontWeight: 700, 
                fontSize: "0.85rem", 
                fontFamily: "'DM Sans', sans-serif", 
                textDecoration: "underline", 
                textUnderlineOffset: 3
              }}
            >
              Create one
            </button>
          </div>
          
          <div style={{ marginTop: 28, padding: "14px 16px", background: "#1a1a1a", borderRadius: 9, border: `1px solid ${C.cardBorder}` }}>
            <p style={{ fontSize: "0.75rem", color: C.textDim, marginBottom: 4 }}>Demo credentials:</p>
            <p style={{ fontSize: "0.8rem", color: C.textMuted }}>admin@bizcore.com / admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
