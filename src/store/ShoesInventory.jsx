import React, { useState } from 'react';
import InventoryTable from './InventoryTable';
import { C } from '../theme/colors';

const initialShoes = [
  { id: 1, name: 'Nike Air Max 270', brand: 'Nike', category: 'Sneakers', size: '10 US', stock: 45, price: 150 },
  { id: 2, name: 'Adidas Ultraboost 22', brand: 'Adidas', category: 'Running', size: '9 US', stock: 32, price: 190 },
  { id: 3, name: 'Puma Suede Classic', brand: 'Puma', category: 'Casual', size: '11 US', stock: 15, price: 70 },
  { id: 4, name: 'New Balance 990v5', brand: 'New Balance', category: 'Sneakers', size: '10.5 US', stock: 8, price: 185 },
  { id: 5, name: 'Dr. Martens 1460', brand: 'Dr. Martens', category: 'Boots', size: '8 UK', stock: 22, price: 160 },
];

export default function ShoesInventory() {
  const [items, setItems] = useState(initialShoes);

  const columns = [
    { key: 'name', label: 'Product Name', render: val => <span style={{ fontWeight: 600 }}>{val}</span> },
    { key: 'brand', label: 'Brand' },
    { key: 'category', label: 'Category' },
    { key: 'size', label: 'Size' },
    { 
      key: 'stock', 
      label: 'Stock Level',
      render: val => (
        <span style={{ 
          padding: "4px 10px", 
          borderRadius: 20, 
          background: val < 10 ? 'rgba(239, 68, 68, 0.1)' : 'rgba(34, 197, 94, 0.1)', 
          color: val < 10 ? C.danger : C.success,
          fontSize: "0.85rem",
          fontWeight: 600
        }}>
          {val} in stock
        </span>
      )
    },
    { key: 'price', label: 'Price', render: val => `$${val.toFixed(2)}` },
  ];

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <InventoryTable 
        title="Shoes Inventory" 
        description="Manage stock for sneakers, boots, and performance footwear."
        items={items}
        columns={columns}
      />
    </div>
  );
}
