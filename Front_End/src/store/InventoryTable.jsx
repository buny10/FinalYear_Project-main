import React from 'react';
import { C } from '../theme/colors';

export default function InventoryTable({ title, description, items, columns, onEdit, onDelete }) {
  return (
    <div style={{ background: C.card, borderRadius: 16, border: `1px solid ${C.cardBorder}`, padding: 24, flex: 1, display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h2 style={{ margin: "0 0 4px 0", color: C.text, fontSize: "1.25rem", fontFamily: "'Syne', sans-serif" }}>{title}</h2>
          <p style={{ margin: 0, color: C.textMuted, fontSize: "0.9rem" }}>{description}</p>
        </div>
        <button style={{
          background: C.accent,
          color: "#000",
          border: "none",
          padding: "10px 20px",
          borderRadius: 8,
          fontWeight: 600,
          cursor: "pointer",
          transition: "transform 0.1s ease"
        }}
          onMouseOver={e => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
        >
          Add New Item
        </button>m
      </div>

      <div style={{ flex: 1, overflowY: "auto", border: `1px solid ${C.cardBorder}`, borderRadius: 12, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", color: C.text, fontSize: "0.9rem" }}>
          <thead>
            <tr style={{ background: "rgba(255,255,255,0.03)", textAlign: "left" }}>
              {columns.map((col, idx) => (
                <th key={idx} style={{ padding: "16px 20px", borderBottom: `1px solid ${C.cardBorder}`, color: C.textMuted, fontWeight: 500 }}>
                  {col.label}
                </th>
              ))}
              <th style={{ padding: "16px 20px", borderBottom: `1px solid ${C.cardBorder}`, textAlign: "right", color: C.textMuted, fontWeight: 500 }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, rowIdx) => (
              <tr key={item.id} style={{ borderBottom: rowIdx === items.length - 1 ? "none" : `1px solid ${C.cardBorder}`, transition: "background 0.2s" }}
                onMouseOver={e => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
                onMouseOut={e => e.currentTarget.style.background = "transparent"}>
                {columns.map((col, colIdx) => (
                  <td key={colIdx} style={{ padding: "16px 20px" }}>
                    {col.render ? col.render(item[col.key], item) : item[col.key]}
                  </td>
                ))}
                <td style={{ padding: "16px 20px", textAlign: "right" }}>
                  <button onClick={() => onEdit && onEdit(item)} style={{ background: "transparent", color: C.info, border: "none", cursor: "pointer", marginRight: 12, fontWeight: 500 }}>Edit</button>
                  <button onClick={() => onDelete && onDelete(item)} style={{ background: "transparent", color: C.danger, border: "none", cursor: "pointer", fontWeight: 500 }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 && (
          <div style={{ padding: 40, textAlign: "center", color: C.textMuted }}>
            No items found.
          </div>
        )}
      </div>
    </div>
  );
}

