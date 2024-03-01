// MerchPreview.tsx
import React from 'react';
import Merch from './Merch'; // Import the Merch component

const MerchPreview: React.FC = () => {
  return (
    <section className="py-8">
      <h2 className="text-3xl font-bold mb-4 text-yellow-400"></h2>
      {/* Render the Merch component */}
      <Merch />
    </section>
  );
};

export default MerchPreview;
