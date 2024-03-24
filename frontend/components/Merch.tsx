// Merch.tsx
import React, { useEffect, useState } from 'react';

const ProductCard: React.FC<{ product: any }> = ({ product }) => (
  <div className="border bg-white border-gray-200 p-4 rounded-md">
    <img src={`${product.image.data.attributes.url}`} alt={product.name} className="w-full h-32 object-cover mb-2" />
    <h3 className="text-lg font-bold">{product.name}</h3>
    <p className="text-gray-600">{product.cost} $MRGOOSE</p>
  </div>
);

function Merch() {
  const [merch, setMerch] = useState<any>();
  
  useEffect(() => {
    async function fetchData() {
        const response = await fetch('/api/getMerch');
        const {data} = await response.json();
        setMerch(data);
    };
    fetchData();
  }, []);
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4 text-yellow-400">Get Merch</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        { 
        merch?.map((product: any) => <ProductCard key={product.id} product={product.attributes} />)
        }
      </div>
    </div>
  );
};

export default Merch;
