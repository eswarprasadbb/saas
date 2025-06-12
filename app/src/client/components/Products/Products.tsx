import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Products.css';

interface Product {
  productId: number;
  productName: string;
  productType: string;
  billable: boolean;
  status: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://13.230.194.245:8080/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return <div className="loading">Loading products...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="products-container">
      <div className="products-header">
        <h2>Products</h2>
        <div className="products-actions">
          <input type="search" placeholder="Search among your products..." className="products-search" />
          <Link to="/new-product" className="new-product-button">
            + New Product
          </Link>
        </div>
      </div>
      
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <table className="products-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Type</th>
              <th>Billable</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.productId}>
                <td>{product.productId}</td>
                <td>{product.productName}</td>
                <td>{product.productType}</td>
                <td>{product.billable ? 'Yes' : 'No'}</td>
                <td>{product.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
