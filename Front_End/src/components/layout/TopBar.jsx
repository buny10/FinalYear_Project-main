import React from 'react';
import Icon from '../ui/Icon';
import AvatarBubble from '../ui/AvatarBubble';
import { C } from "../../theme/colors";
import { NAV } from "../../data/constants";

function TopBar({ page, user }) {
  const title = NAV.find(n => n.id === page)?.label || page;
  
  return (
    <div 
      style={{
        height: 58, 
        background: C.sidebar, 
        borderBottom: `1px solid ${C.cardBorder}`, 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "space-between", 
        padding: "0 24px", 
        flexShrink: 0
      }}
    >
      <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.05rem", color: C.text }}>{title}</h2>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ position: "relative" }}>
          <button style={{ background: "none", border: "none", color: C.textMuted, display: "flex", position: "relative" }}>
            <Icon name="bell" size={20}/>
            <span 
              style={{
                position: "absolute", 
                top: -2, 
                right: -2, 
                width: 8, 
                height: 8, 
                borderRadius: "50%", 
                background: C.danger, 
                border: `2px solid ${C.sidebar}`
              }}
            />
          </button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <AvatarBubble initials={user.name.split(" ").map(n => n[0]).join("").slice(0,2)} size={32}/>
          <div style={{ lineHeight: 1.3 }}>
            <p style={{ fontSize: "0.82rem", fontWeight: 600, color: C.text }}>{user.name}</p>
            <p style={{ fontSize: "0.72rem", color: C.textMuted }}>{user.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
