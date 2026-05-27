import React from 'react';
import Icon from './Icon';
import { C } from "../../theme/colors";

const Btn = ({ label, icon, onClick, variant = "primary", size = "md", style = {} }) => {
  const base = {
    display: "flex",
    alignItems: "center",
    gap: 7,
    borderRadius: 9,
    fontWeight: 600,
    border: "none",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    transition: "all 0.15s",
    ...style
  };
  
  const sz = size === "sm" 
    ? { padding: "6px 12px", fontSize: "0.78rem" } 
    : { padding: "9px 18px", fontSize: "0.85rem" };
    
  const variants = {
    primary: { background: C.accent, color: "#0a0a0a" },
    secondary: { background: C.cardBorder, color: C.text },
    danger: { background: "#ef444420", color: C.danger, border: `1px solid #ef444440` },
    ghost: { background: "transparent", color: C.textMuted, border: `1px solid ${C.cardBorder}` },
  };
  
  return (
    <button style={{ ...base, ...sz, ...variants[variant] }} onClick={onClick}>
      {icon && <Icon name={icon} size={size === "sm" ? 14 : 16} color={variant === "primary" ? "#0a0a0a" : undefined} />}
      {label}
    </button>
  );
};

export default Btn;
