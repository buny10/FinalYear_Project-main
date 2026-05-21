import React from 'react';

export const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');
    *{box-sizing:border-box;margin:0;padding:0;scrollbar-width:thin;scrollbar-color:#2a2a2a #141414;}
    body{background:#0f0f0f;color:#f0f0f0;font-family:'DM Sans',sans-serif;overflow:hidden;}
    ::-webkit-scrollbar{width:6px;height:6px;}
    ::-webkit-scrollbar-track{background:#141414;}
    ::-webkit-scrollbar-thumb{background:#2a2a2a;border-radius:3px;}
    input,select,textarea{font-family:'DM Sans',sans-serif;}
    input:focus,select:focus,textarea:focus{outline:none;}
    button{cursor:pointer;font-family:'DM Sans',sans-serif;}
    @keyframes fadeSlide{from{opacity:0;transform:translateY(12px);}to{opacity:1;transform:translateY(0);}}
    @keyframes pulse{0%,100%{opacity:1;}50%{opacity:0.5;}}
    @keyframes spin{to{transform:rotate(360deg);}}
    @keyframes bounce{0%,80%,100%{transform:scale(0);}40%{transform:scale(1);}}
    .fade-in{animation:fadeSlide 0.35s ease forwards;}
    .page-content{animation:fadeSlide 0.3s ease forwards;}
  `}</style>
);
