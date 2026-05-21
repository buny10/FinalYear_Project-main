import React from 'react';
import { avatarColor } from "../../utils/formatters";

const AvatarBubble = ({ initials, size = 32 }) => (
  <div 
    style={{
      width: size, 
      height: size, 
      borderRadius: "50%", 
      background: avatarColor(initials), 
      color: "#0a0a0a", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center", 
      fontWeight: 700, 
      fontSize: size * 0.35, 
      flexShrink: 0
    }}
  >
    {initials}
  </div>
);

export default AvatarBubble;
