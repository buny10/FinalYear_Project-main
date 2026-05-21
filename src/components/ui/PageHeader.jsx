import React from 'react';
import { C } from "../../theme/colors";

const PageHeader = ({ title, subtitle, action }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
    <div>
      <h1 
        style={{ 
          fontFamily: "'Syne', sans-serif", 
          fontWeight: 800, 
          fontSize: "1.6rem", 
          letterSpacing: "-0.5px", 
          marginBottom: 4 
        }}
      >
        {title}
      </h1>
      {subtitle && <p style={{ color: C.textMuted, fontSize: "0.88rem" }}>{subtitle}</p>}
    </div>
    {action}
  </div>
);

export default PageHeader;
