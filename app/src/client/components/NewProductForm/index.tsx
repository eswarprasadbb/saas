import React from 'react';
import NewProductForm from './NewProductForm.fixed';

const NewProductFormWrapper: React.FC = () => {
  return (
    <div>
      <h2>Create New Product</h2>
      <NewProductForm />
    </div>
  );
};

export default NewProductFormWrapper;
