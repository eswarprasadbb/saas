import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NewProductForm from '../NewProductForm';
import { ProductFormData } from '../../../types/productTypes';
import './Products.css';

type ProductType = 'api' | 'flatfile' | 'llmtoken' | 'sqlresult';

interface Product {
  productId: number;
  productName: string;
  productType: ProductType;
  billable: boolean;
  status: string;
  category: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isNewProductFormOpen, setIsNewProductFormOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Custom product type names with case-insensitive mapping
  const productTypeNames = {
    api: 'API',
    'API': 'API',
    flatfile: 'Flat File',
    'Flat File': 'Flat File',
    llmtoken: 'LLM Token',
    'LLM Token': 'LLM Token',
    sqlresult: 'SQL Result',
    'SQL Result': 'SQL Result'
  };

  // Helper function to get product type name
  const getProductTypeName = (type: string): string => {
    return productTypeNames[type as keyof typeof productTypeNames] || type;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://13.230.194.245:8080/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        console.log('Fetched products:', data);
        setProducts(data);
        setError(null);
      } catch (err) {
        setError('Failed to load products');
        console.error('Error fetching products:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDeleteProduct = async (productId: number) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(`http://13.230.194.245:8080/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      // Refresh products list
      const updatedProducts = products.filter(product => product.productId !== productId);
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleNewProductSubmit = async (formData: ProductFormData) => {
    try {
      const response = await fetch('http://13.230.194.245:8080/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create product');
      }

      // Refresh the products list
      const data = await response.json();
      setProducts([...products, data]);
      setIsNewProductFormOpen(false);
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Failed to create product. Please try again.');
    }
  };

  if (isLoading) {
    return <div className="loading">Loading products...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="products-container">
      {isNewProductFormOpen ? (
        <div className="products-form-container">
          <NewProductForm onSubmit={handleNewProductSubmit} onClose={() => setIsNewProductFormOpen(false)} />
        </div>
      ) : (
        <div className="products-main-content">
          <div className="products-header" style={{ marginTop: '24px' }}>
            <h2>Products</h2>
            <div className="products-actions">
              <div className="products-search">
                <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M17.5 17.5L13.8833 13.8833M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <input type="search" placeholder="Search among your products..." className="products-search-input" />
              </div>
              <button onClick={() => setIsNewProductFormOpen(true)} className="new-button">
                + New Product
              </button>
            </div>
          </div>
          {products.length === 0 ? (
            <p>No products found.</p>
          ) : (
            <table className="products-table">
              <thead>
                <tr>
                  <th>ProductID</th>
                  <th>Product Name</th>
                  <th>Product Type</th>
                  <th>Billable</th>
                  <th>Status</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.productId}>
                    <td>{product.productId}</td>
                    <td>{product.productName}</td>
                    <td>
                      <span className={`product-type-badge--${product.productType.toLowerCase()}`}>
                        {getProductTypeName(product.productType)}
                      </span>
                    </td>
                    <td>{product.billable ? 'Yes' : 'No'}</td>
                    <td>{product.status}</td>
                    <td>{product.category}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="edit-button" onClick={() => alert('Edit product ' + product.productId)}>Edit</button>
                        <button className="delete-button" onClick={() => handleDeleteProduct(product.productId)} disabled={isDeleting}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

              