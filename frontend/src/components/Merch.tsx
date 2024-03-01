// Merch.tsx
import React from 'react';

// Example product data (replace this with your actual data)
const products = [
  { id: 1, name: 'Product 1', price: 10, image: '/product1.jpg' },
  { id: 2, name: 'Product 2', price: 20, image: '/product2.jpg' },
  { id: 3, name: 'Product 3', price: 30, image: '/product3.jpg' },
  // Add more products as needed
];

const ProductCard: React.FC<{ product: { id: number, name: string, price: number, image: string } }> = ({ product }) => (
  <div className="border bg-white border-gray-200 p-4 rounded-md">
    <img src={product.image} alt={product.name} className="w-full h-32 object-cover mb-2" />
    <h3 className="text-lg font-bold">{product.name}</h3>
    <p className="text-gray-600">${product.price}</p>
  </div>
);

const Merch: React.FC = () => {
  // Render only the first three products
  const displayedProducts = products.slice(0, 3);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4 text-yellow-400">Shop Merchandise</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {displayedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Merch;
