import React, { useState } from 'react';
import './RatePlans.css';
import CreatePricePlan from './CreatePricePlan';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

interface RatePlan {
  id: number;
  name: string;
  product: string;
  status: string;
  pricing: string;
}

const ratePlans: RatePlan[] = [
  { id: 1, name: "API Call Rate", product: "API", status: "In Progress", pricing: "Tiered" },
  { id: 2, name: "Extra Storage Rate", product: "Storage", status: "In Progress", pricing: "Flat" },
  { id: 3, name: "Peak Data Rate", product: "Data Set", status: "In Progress", pricing: "Time-based" },
  { id: 4, name: "API Call Rate – Tiered", product: "API", status: "In Progress", pricing: "Tiered" },
];

const RatePlans: React.FC = () => {
  const location = useLocation();
  const [showCreatePlan, setShowCreatePlan] = useState(false);

  const handleNewPlanClick = () => {
    setShowCreatePlan(true);
  };

  const handleCloseCreatePlan = () => {
    setShowCreatePlan(false);
  };

  const renderBreadcrumb = () => {
    if (showCreatePlan) {
      return (
        <div className="breadcrumb">
          <div className="breadcrumbItem active">Rate Plans</div>
          <span className="breadcrumbSeparator">&gt;</span>
          <div className="breadcrumbItem">New Rate Plan</div>
        </div>
      );
    }
    return (
      <div className="breadcrumb">
        <div className="breadcrumbItem active">Rate Plans</div>
      </div>
    );
  };

  if (showCreatePlan) {
    return (
      <div className="rate-plan-container">
        {renderBreadcrumb()}
        <CreatePricePlan 
          onClose={() => setShowCreatePlan(false)}
        />
      </div>
    );
  }

  return (
    <div className="rate-plan-container">
      <div className="cpp-title">Rate Plans</div>

      <div className="products-actions">
        <div className="products-search">
          <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M17.5 17.5L13.8833 13.8833M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <input type="search" placeholder="Search among your rate plans..." className="products-search-input" />
        </div>

        <button className="new-button" onClick={handleNewPlanClick}>
          + New Rate Plan
        </button>
      </div>

      <table className="pp-rate-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Rate Plan Name</th>
            <th>Product Name, product type</th>
            <th>Status</th>
            <th>Pricing Model</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ratePlans.map((plan, index) => (
            <tr key={plan.id}>
              <td>{index + 1}</td>
              <td>{plan.name}</td>
              <td>
                <span className={`pp-badge ${plan.product.toLowerCase().replace(' ', '-')}`}>
                  {plan.product}
                </span>
              </td>
              <td>
                <span className="pp-status">{plan.status}</span>
              </td>
              <td>{plan.pricing}</td>
              <td>
                <button className="pp-edit-btn">Edit</button>
                <button className="pp-delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RatePlans;
