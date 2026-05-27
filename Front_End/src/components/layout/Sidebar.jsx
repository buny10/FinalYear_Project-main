import React from 'react';
import Icon from '../ui/Icon';
import { C } from "../../theme/colors";
import { NAV } from "../../data/constants";

function Sidebar({ active, setActive,  onLogout, collapsed, setCollapsed }) {
  return (
    <div 
      style={{
        width: collapsed ? 64 : 220, 
        background: C.sidebar, 
        borderRight: `1px solid ${C.cardBorder}`, 
        display: "flex", 
        flexDirection: "column", 
        height: "100vh", 
        transition: "width 0.25s ease", 
        flexShrink: 0, 
        overflow: "hidden"
      }}
    >
      <div 
        style={{
          padding: collapsed ? "16px 12px" : "20px 18px", 
          borderBottom: `1px solid ${C.cardBorder}`, 
          display: "flex", 
          alignItems: "center", 
          gap: 10, 
          justifyContent: collapsed ? "center" : "flex-start"
        }}
      >
        <svg width="32" height="32" viewBox="0 0 44 44" fill="none" style={{ flexShrink: 0 }}>
          <rect width="44" height="44" rx="10" fill={C.accent}/>
          <rect x="10" y="10" width="10" height="10" rx="2" fill="#0a0a0a"/>
          <rect x="24" y="10" width="10" height="10" rx="2" fill="#0a0a0a"/>
          <rect x="10" y="24" width="10" height="10" rx="2" fill="#0a0a0a"/>
          <rect x="24" y="24" width="10" height="10" rx="2" fill="#0a0a0a" opacity="0.4"/>
        </svg>
        {!collapsed && (
          <span 
            style={{ 
              fontFamily: "'Syne', sans-serif", 
              fontWeight: 800, 
              fontSize: "1.15rem", 
              color: C.text, 
              whiteSpace: "nowrap" 
            }}
          >
            BizCore
          </span>
        )}
      </div>

      <nav style={{ flex: 1, padding: collapsed ? "12px 8px" : "12px", overflowY: "auto" }}>
        {NAV.map(item => {
          const isActive = active === item.id;
          return (
            <button 
              key={item.id} 
              onClick={() => setActive(item.id)}
              style={{
                width: "100%", 
                display: "flex", 
                alignItems: "center", 
                gap: 12, 
                padding: collapsed ? "10px" : "10px 12px", 
                borderRadius: 9, 
                marginBottom: 2, 
                border: "none", 
                cursor: "pointer", 
                background: isActive ? C.accentDim : "transparent", 
                color: isActive ? C.accent : C.textMuted, 
                fontFamily: "'DM Sans', sans-serif", 
                fontWeight: isActive ? 600 : 400, 
                fontSize: "0.87rem", 
                transition: "all 0.15s", 
                justifyContent: collapsed ? "center" : "flex-start", 
                position: "relative"
              }}
            >
              <Icon 
                name={item.icon} 
                size={18} 
                color={isActive ? C.accent : C.textMuted} 
                style={{ flexShrink: 0 }}
              />
              {!collapsed && <span style={{ whiteSpace: "nowrap" }}>{item.label}</span>}
              {isActive && (
                <span 
                  style={{ 
                    position: "absolute", 
                    left: 0, 
                    top: "20%", 
                    width: 3, 
                    height: "60%", 
                    background: C.accent, 
                    borderRadius: "0 3px 3px 0" 
                  }}
                />
              )}
            </button>
          );
        })}
      </nav>

      <div style={{ padding: collapsed ? "12px 8px" : "12px", borderTop: `1px solid ${C.cardBorder}` }}>
        <button 
          onClick={() => setCollapsed(!collapsed)} 
          style={{
            width: "100%", 
            display: "flex", 
            alignItems: "center", 
            gap: 12, 
            padding: collapsed ? "10px" : "10px 12px", 
            borderRadius: 9, 
            border: "none", 
            cursor: "pointer", 
            background: "transparent", 
            color: C.textMuted, 
            fontFamily: "'DM Sans', sans-serif", 
            fontSize: "0.85rem", 
            justifyContent: collapsed ? "center" : "flex-start", 
            marginBottom: 8
          }}
        >
          <Icon name="menu" size={18} color={C.textMuted}/>
          {!collapsed && <span>Collapse</span>}
        </button>
        <button 
          onClick={onLogout} 
          style={{
            width: "100%", 
            display: "flex", 
            alignItems: "center", 
            gap: 12, 
            padding: collapsed ? "10px" : "10px 12px", 
            borderRadius: 9, 
            border: "none", 
            cursor: "pointer", 
            background: "transparent", 
            color: C.danger, 
            fontFamily: "'DM Sans', sans-serif", 
            fontSize: "0.85rem", 
            fontWeight: 500, 
            justifyContent: collapsed ? "center" : "flex-start"
          }}
        >
          <Icon name="logout" size={18} color={C.danger}/>
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
