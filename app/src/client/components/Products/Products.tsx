import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NewProductForm from '../NewProductForm';
import { ProductFormData } from '../../../types/productTypes';
import './Products.css';
import styles from './Products.module.css';

type ProductType = 'api' | 'flatfile' | 'llmtoken' | 'sqlresult';

interface Product {
  productId: number;
  productName: string;
  productType: ProductType;
  billable: boolean;
  status: string;
  category: string;
}

type NotificationType = 'success' | 'error';

interface NotificationState {
  type: NotificationType;
  message: string;
  productName: string;
}

export default function Products() {
  const location = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isNewProductFormOpen, setIsNewProductFormOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState<number | null>(null);
  const [deleteProductName, setDeleteProductName] = useState<string>('');
  const [notification, setNotification] = useState<NotificationState | null>(null);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 4000); // 4 seconds
  
      return () => clearTimeout(timer);
    }
  }, [notification]);
  

  const productTypeNames = {
    api: 'API',
    flatfile: 'Flat File',
    llmtoken: 'LLM Token',
    sqlresult: 'SQL Result'
  };

  const getProductTypeName = (type: string): string => {
    return productTypeNames[type.toLowerCase() as ProductType] || type;
  };

  const renderBreadcrumb = () => {
    if (isNewProductFormOpen) {
      return (
        <div className={styles.breadcrumb}>
          <Link className={styles.breadcrumbItem} to="/products">Products</Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={`${styles.breadcrumbItem} ${styles.active}`}>New Product</span>
        </div>
      );
    }

    return (
      <div className={styles.breadcrumb}>
        <span className={`${styles.breadcrumbItem} ${styles.active}`}>Products</span>
      </div>
    );
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://13.230.194.245:8080/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
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

      const data = await response.json();
      setProducts([...products, data]);
      setIsNewProductFormOpen(false);
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Failed to create product. Please try again.');
    }
  };

  const confirmDelete = async () => {
    if (deleteProductId === null) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`http://13.230.194.245:8080/api/products/${deleteProductId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) throw new Error('Delete failed');

      setProducts(products.filter(p => p.productId !== deleteProductId));
      setNotification({
        type: 'success',
        message: 'Product deleted successfully.',
        productName: deleteProductName
      });
    } catch (err) {
      console.error(err);
      setNotification({
        type: 'error',
        message: 'Failed to delete product. Please try again.',
        productName: deleteProductName
      });
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
      setDeleteProductId(null);
      setDeleteProductName('');
    }
  };

  const DeleteModal = () => (
    <div className="delete-modal-overlay">
      <div className="delete-modal-content">
        <div className="delete-modal-body">
          <h5>Are you sure you want to delete the product "{deleteProductName}"?</h5>
          <p>This action cannot be undone.</p>
        </div>
        <div className="delete-modal-footer">
          <button className="delete-modal-cancel" onClick={() => {
            setShowDeleteModal(false);
            setDeleteProductId(null);
          }}>Cancel</button>
          <button className="delete-modal-confirm" onClick={confirmDelete} disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );

  const SuccessIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path d="M20 6L9 17L4 12" stroke="#23A36D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const ErrorIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path d="M12 8V12M12 16H12.01M7.9 20C9.8 21 12 21.2 14.1 20.75C16.2 20.3 18 19.05 19.3 17.3C20.6 15.55 21.15 13.4 20.98 11.3C20.81 9.15 19.89 7.15 18.37 5.63C16.85 4.11 14.85 3.18 12.71 3.02C10.57 2.85 8.44 3.45 6.71 4.72C4.97 5.98 3.75 7.82 3.25 9.91C2.76 12 3.02 14.19 4 16.1L2 22L7.9 20Z" stroke="#E34935" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const Notification = ({ message, type, productName }: NotificationState) => {
    const Icon = type === 'success' ? SuccessIcon : ErrorIcon;
    return (
      <div className={`notification ${type === 'error' ? 'error' : ''}`}>
        <div className="notification-icon">
          <Icon />
        </div>
        <div className="notification-text">
          <h5>{type === 'success' ? 'Product Deleted' : 'Failed to Delete Product'}</h5>
          <p className="notification-details">
            {type === 'success'
              ? `The product “${productName}” was successfully deleted.`
              : `Failed to delete the product “${productName}”. Please try again.`}
          </p>
        </div>
      </div>
    );
  };

  if (isLoading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <>
      {notification && (
        <div className="notification-container">
          <Notification {...notification} />
        </div>
      )}
  
      <div>
        {renderBreadcrumb()}
        {showDeleteModal && <DeleteModal />}
  

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
                    <path d="M17.5 17.5L13.8833 13.8833M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
                          <button
                            className="delete-button"
                            onClick={() => {
                              setDeleteProductId(product.productId);
                              setDeleteProductName(product.productName);
                              setShowDeleteModal(true);
                            }}
                            disabled={isDeleting}
                          >
                            Delete
                          </button>
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
    </div>
    </>
  );
}
