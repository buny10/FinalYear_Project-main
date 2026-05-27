import React, { useState } from 'react';
import { C } from '../theme/colors';
import ShoesInventory from './ShoesInventory';
import ClothingInventory from './ClothingInventory';
import SportsGearInventory from './SportsGearInventory';

const TABS = [
  { id: 'shoes', label: 'Shoes' },
  { id: 'clothing', label: 'Clothing' },
  { id: 'sports_gear', label: 'Sports Gear' }
];

export default function StoreInventory() {
  const [activeTab, setActiveTab] = useState('shoes');

  return (
    <div style={{ padding: "32px 40px", flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "2rem", color: C.text, margin: "0 0 8px 0" }}>Store Inventory</h1>
        <p style={{ color: C.textMuted, margin: 0, fontSize: "1rem" }}>Manage inventory for Shoes, Clothing, and Sports Gear.</p>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 16, marginBottom: 32, borderBottom: `1px solid ${C.cardBorder}`, paddingBottom: 12 }}>
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "10px 24px",
              borderRadius: "8px",
              border: "1px solid",
              borderColor: activeTab === tab.id ? C.accent : "transparent",
              background: activeTab === tab.id ? C.accentDim : "transparent",
              color: activeTab === tab.id ? C.accent : C.text,
              fontSize: "0.95rem",
              fontWeight: activeTab === tab.id ? 600 : 500,
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {activeTab === 'shoes' && <ShoesInventory />}
        {activeTab === 'clothing' && <ClothingInventory />}
        {activeTab === 'sports_gear' && <SportsGearInventory />}
      </div>
    </div>
  );
}
