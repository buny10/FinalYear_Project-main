import React, { useState } from 'react';
import InventoryTable from './InventoryTable';
import { C } from '../theme/colors';

const initialClothing = [
  { id: 1, name: 'Essential Cotton T-Shirt', brand: 'Uniqlo', category: 'Tops', size: 'M', stock: 120, price: 19.99 },
  { id: 2, name: 'Levi\'s 501 Original', brand: 'Levi\'s', category: 'Jeans', size: '32W 32L', stock: 45, price: 79.50 },
  { id: 3, name: 'Tech Fleece Joggers', brand: 'Nike', category: 'Activewear', size: 'L', stock: 25, price: 110 },
  { id: 4, name: 'Wool Blend Overcoat', brand: 'Zara', category: 'Outerwear', size: 'M', stock: 5, price: 159.99 },
  { id: 5, name: 'Classic Fit Oxford Shirt', brand: 'Polo Ralph Lauren', category: 'Shirts', size: 'S', stock: 18, price: 95 },
];

export default function ClothingInventory() {
  const [items, setItems] = useState(initialClothing);

  const columns = [
    { key: 'name', label: 'Item Name', render: val => <span style={{ fontWeight: 600 }}>{val}</span> },
    { key: 'brand', label: 'Brand' },
    { key: 'category', label: 'Category' },
    { key: 'size', label: 'Size' },
    { 
      key: 'stock', 
      label: 'Inventory',
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
    { key: 'price', label: 'List Price', render: val => `$${val.toFixed(2)}` },
  ];

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <InventoryTable 
        title="Clothing Inventory" 
        description="Track apparel stock including tops, bottoms, and outerwear."
        items={items}
        columns={columns}
      />
    </div>
  );
}
