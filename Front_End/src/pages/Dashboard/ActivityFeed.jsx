import React from 'react';
import Card from '../../components/ui/Card';
import { C } from '../../theme/colors';

const ActivityFeed = ({ activities }) => (
  <Card>
    <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.95rem", marginBottom: 14 }}>Recent Activity</h3>
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {activities.map((a, i) => (
        <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
          <div 
            style={{ 
              width: 7, 
              height: 7, 
              borderRadius: "50%", 
              background: a.type === "success" ? C.success : a.type === "warning" ? C.warning : a.type === "info" ? C.info : C.textDim, 
              marginTop: 5, 
              flexShrink: 0 
            }}
          />
          <div>
            <p style={{ fontSize: "0.81rem", color: C.text, lineHeight: 1.4 }}>{a.text}</p>
            <p style={{ fontSize: "0.71rem", color: C.textDim, marginTop: 2 }}>{a.time}</p>
          </div>
        </div>
      ))}
    </div>
  </Card>
);

export default ActivityFeed;
