import React from 'react';
import { C } from "../../theme/colors";

export const Table = ({ columns, data, renderRow }) => (
  <div style={{ overflowX: "auto" }}>
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ borderBottom: `1px solid ${C.cardBorder}` }}>
          {columns.map(col => (
            <th 
              key={col} 
              style={{
                padding: "10px 14px", 
                textAlign: "left", 
                fontSize: "0.74rem", 
                fontWeight: 600, 
                color: C.textMuted, 
                textTransform: "uppercase", 
                letterSpacing: "0.5px", 
                whiteSpace: "nowrap"
              }}
            >
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr 
            key={i} 
            style={{ borderBottom: `1px solid ${C.cardBorder}20`, transition: "background 0.15s" }} 
            onMouseEnter={e => e.currentTarget.style.background = "#ffffff08"} 
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            {renderRow(row)}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const TD = ({ children, style = {} }) => (
  <td style={{ padding: "12px 14px", fontSize: "0.85rem", ...style }}>
    {children}
  </td>
);
