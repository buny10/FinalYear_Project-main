import React, { useState } from 'react';
import InventoryTable from './InventoryTable';
import { C } from '../theme/colors';

const initialSportsGear = [
  { id: 1, name: 'Wilson Evolution Basketball', brand: 'Wilson', sport: 'Basketball', condition: 'New', stock: 55, price: 79.95 },
  { id: 2, name: 'Babolat Pure Drive Tennis Racket', brand: 'Babolat', sport: 'Tennis', condition: 'New', stock: 12, price: 239 },
  { id: 3, name: 'Titleist Pro V1 Golf Balls (Dozen)', brand: 'Titleist', sport: 'Golf', condition: 'New', stock: 80, price: 54.99 },
  { id: 4, name: 'Everlast Pro Style Boxing Gloves', brand: 'Everlast', sport: 'Boxing', condition: 'New', stock: 30, price: 39.99 },
  { id: 5, name: 'Speedo Vanquisher 2.0 Goggles', brand: 'Speedo', sport: 'Swimming', condition: 'New', stock: 150, price: 21.99 },
];

export default function SportsGearInventory() {
  const [items, setItems] = useState(initialSportsGear);

  const columns = [
    { key: 'name', label: 'Equipment Name', render: val => <span style={{ fontWeight: 600 }}>{val}</span> },
    { key: 'brand', label: 'Brand' },
    { key: 'sport', label: 'Sport Type' },
    { key: 'condition', label: 'Condition' },
    { 
      key: 'stock', 
      label: 'Total Stock',
      render: val => (
        <span style={{ 
          padding: "4px 10px", 
          borderRadius: 20, 
          background: val < 20 ? 'rgba(239, 68, 68, 0.1)' : 'rgba(34, 197, 94, 0.1)', 
          color: val < 20 ? C.danger : C.success,
          fontSize: "0.85rem",
          fontWeight: 600
        }}>
          {val} in stock
        </span>
      )
    },
    { key: 'price', label: 'Retail Price', render: val => `$${val.toFixed(2)}` },
  ];

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <InventoryTable 
        title="Sports Gear Inventory" 
        description="Monitor inventory for various sports equipment and accessories."
        items={items}
        columns={columns}
      />
    </div>
  );
}
