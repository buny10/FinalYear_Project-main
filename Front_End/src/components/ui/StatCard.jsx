import React from 'react';
import Card from './Card';
import Icon from './Icon';
import { C } from "../../theme/colors";

const StatCard = ({ label, value, change, icon, color = C.accent, onClick }) => (
  <Card
    onClick={onClick}
    style={{
      display: "flex",
      flexDirection: "column",
      gap: 12,
      cursor: onClick ? "pointer" : "default",
      transition: "transform 0.15s ease, box-shadow 0.15s ease",
    }}
    onMouseEnter={(e) => {
      if (onClick) {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.25)";
      }
    }}
    onMouseLeave={(e) => {
      if (onClick) {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }
    }}
  >
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <div>
        <p style={{ fontSize: "0.78rem", color: C.textMuted, marginBottom: 6 }}>{label}</p>
        <p
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "1.7rem",
            color: C.text,
            letterSpacing: "-1px"
          }}
        >
          {value}
        </p>
      </div>
      <div
        style={{
          width: 42,
          height: 42,
          borderRadius: 10,
          background: `${color}18`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Icon name={icon} size={20} color={color}/>
      </div>
    </div>
    {change && (
      <p style={{ fontSize: "0.75rem", color: change.startsWith("+") ? C.success : C.danger }}>
        {change} vs last month
      </p>
    )}
  </Card>
);

export default StatCard;