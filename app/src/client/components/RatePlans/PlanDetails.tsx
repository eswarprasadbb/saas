import React, { useState, useEffect } from 'react';
import './CreatePricePlan.css';
import { RatePlanApi, Product } from './RatePlanApi';

interface PlanDetailsProps {
  onPricingModelSelect: (model: string) => void;
  onNext: (data: {
    ratePlanName: string;
    productId: string;
    description: string;
    pricingModel: string;
    billingFrequency: string;
  }) => void;
}

const PlanDetails: React.FC<PlanDetailsProps> = ({ onPricingModelSelect, onNext }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [pricingModel, setPricingModel] = useState<string>('');
  const [billingFrequency, setBillingFrequency] = useState<string>('');
  const [ratePlanName, setRatePlanName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await RatePlanApi.getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handlePricingModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setPricingModel(value);
    onPricingModelSelect(value);
  };

  const handleNext = () => {
    if (selectedProduct && ratePlanName && description && pricingModel && billingFrequency) {
      onNext({
        ratePlanName,
        productId: selectedProduct,
        description,
        pricingModel,
        billingFrequency
      });
    }
  };

  return (
    <div className="price-plan-details-section">
      <div className="price-plan-form-group">
        <label style={{ display: 'block', margin: '5px', padding: 0, marginLeft: '200px' }}>Rate Plan Name</label>
        <input
          type="text"
          value={ratePlanName}
          onChange={(e) => setRatePlanName(e.target.value)}
          placeholder="Google Maps API"
          style={{ flex: 1, maxWidth: '415px', marginLeft: '200px' }}
          className="rate-plan-name-input"
        />
      </div>

      <div className="price-plan-form-group">
        <label style={{ display: 'block', margin: '5px', padding: 0, marginLeft: '200px' }}>Select Product Name</label>
        <select
          className="product-select"
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          style={{ flex: 1, maxWidth: '420px', marginLeft: '200px' }}
        >
          <option value="">--Select--</option>
          {products.map((product) => (
            <option key={product.productId} value={product.productId}>
              {product.productName}
            </option>
          ))}
        </select>
      </div>

      <div className="price-plan-form-group">
        <label style={{ display: 'block', margin: '5px', padding: 0, marginLeft: '200px' }}>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description here"
          className="description-textarea"
          style={{ flex: 1, maxWidth: '415px', minHeight: '80px', marginLeft: '200px' }}
        ></textarea>
      </div>

      <div className="price-plan-form-group">
        <label style={{ display: 'block', margin: '5px', padding: 0, marginLeft: '200px' }}>Rate Plan Model</label>
        <select
          className="pricing-model-select"
          value={pricingModel}
          onChange={handlePricingModelChange}
          style={{ flex: 1, maxWidth: '420px', marginLeft: '200px' }}
        >
          <option value="">--Select--</option>
          <option value="FLAT_FEE">FLAT_FEE</option>
          <option value="TIERED">TIERED</option>
          <option value="VOLUME_BASED">VOLUME_BASED</option>
          <option value="STAIRSTEP">STAIRSTEP</option>
          <option value="USAGE_BASED">USAGE_BASED</option>
        </select>
      </div>

      {/* ✅ New Billing Frequency Field */}
      <div className="price-plan-form-group">
        <label style={{ display: 'block', margin: '5px', padding: 0, marginLeft: '200px' }}>Billing Frequency</label>
        <select
          className="billing-frequency-select"
          value={billingFrequency}
          onChange={(e) => setBillingFrequency(e.target.value)}
          style={{ flex: 1, maxWidth: '420px', marginLeft: '200px' }}
        >
          <option value="">--Select--</option>
          <option value="MONTHLY">MONTHLY</option>
          <option value="WEEKLY">WEEKLY</option>
          <option value="YEARLY">YEARLY</option>
          <option value="DAILY">DAILY</option>
          <option value="HOURLY">HOURLY</option>
        </select>
      </div>
    </div>
  );
};

export default PlanDetails;
