// ── Icons (inline SVG as text) ──
import React from 'react';

const Icon = ({ name }) => {
  const icons = {
    user: "👤", email: "✉️", lock: "🔒", eye: "👁️", eyeOff: "🙈",
    building: "🏢", phone: "📱", check: "✓", briefcase: "💼",
    chart: "📊", shield: "🛡️", zap: "⚡"
  };
  return <span style={{ fontSize: 14, userSelect: "none" }}>{icons[name]}</span>;
};

export default Icon;
