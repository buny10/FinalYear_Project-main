import React from 'react';
import { C } from "../../theme/colors";

const Card = ({ children, style = {}, ...rest }) => (
  <div
    style={{
      background: C.card,
      border: `1px solid ${C.cardBorder}`,
      borderRadius: 14,
      padding: "20px 22px",
      ...style
    }}
    {...rest}
  >
    {children}
  </div>
);

export default Card;