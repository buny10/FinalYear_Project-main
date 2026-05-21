import React from 'react';

const Badge = ({ label, color }) => (
  <span style={{
    display: "inline-flex",
    alignItems: "center",
    padding: "3px 10px",
    borderRadius: 20,
    fontSize: "0.72rem",
    fontWeight: 600,
    background: `${color}20`,
    color,
    border: `1px solid ${color}40`,
    whiteSpace: "nowrap"
  }}>
    {label}
  </span>
);

export default Badge;
