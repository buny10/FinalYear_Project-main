import React from 'react';
import Icon from './Icon';
import { C } from "../../theme/colors";

const Modal = ({ title, children, onClose, width = 480 }) => (
  <div 
    style={{
      position: "fixed", 
      inset: 0, 
      background: "rgba(0,0,0,0.75)", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center", 
      zIndex: 1000, 
      padding: 20
    }} 
    onClick={onClose}
  >
    <div 
      style={{
        background: C.card, 
        border: `1px solid ${C.cardBorder}`, 
        borderRadius: 16, 
        width: "100%", 
        maxWidth: width, 
        maxHeight: "85vh", 
        overflow: "auto"
      }} 
      onClick={e => e.stopPropagation()}
    >
      <div 
        style={{
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          padding: "20px 24px", 
          borderBottom: `1px solid ${C.cardBorder}`
        }}
      >
        <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.1rem" }}>{title}</h3>
        <button 
          onClick={onClose} 
          style={{ background: "none", border: "none", color: C.textMuted, display: "flex" }}
        >
          <Icon name="close" size={20}/>
        </button>
      </div>
      <div style={{ padding: "24px" }}>{children}</div>
    </div>
  </div>
);

export default Modal;
