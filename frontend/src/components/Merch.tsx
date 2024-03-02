// Merch.tsx
import React from 'react';
import Strapi from 'strapi-sdk-js';

const ProductCard: React.FC<{ product: any }> = ({ product }) => (
  <div className="border bg-white border-gray-200 p-4 rounded-md">
    <img src={product.image} alt={product.name} className="w-full h-32 object-cover mb-2" />
    <h3 className="text-lg font-bold">{product.name}</h3>
    <p className="text-gray-600">${product.cost}</p>
  </div>
);

async function Merch() {
  const strapi = new Strapi({
    url: process.env.BACKEND_URL,
    prefix: "/api",
    store: {
      key: "strapi_jwt",
      useLocalStorage: false,
      cookieOptions: { path: "/" },
    },
    axiosOptions: {},
  })


  const {data: products}: any = await strapi.find("merches");
  console.log(products)

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4 text-yellow-400">Shop Merchandise</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        { products.map((product: any) => <ProductCard key={product.id} product={product.attributes} />)
        }
      </div>
    </div>
  );
};

export default Merch;
