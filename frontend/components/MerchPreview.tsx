// MerchPreview.tsx
import React from 'react';
import Merch from './Merch'; // Import the Merch component

const MerchPreview: React.FC = () => {
  return (
    <section className="py-24 px-8 lg:px-64">
      {/* Render the Merch component */}
      <Merch />
    </section>
  );
};

export default MerchPreview;
