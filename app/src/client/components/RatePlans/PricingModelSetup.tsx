import React from 'react';
import TieredPricingDetails from './TieredPricingDetails';
import './PricingModelSetup.css';

interface FlatFee {
  recurringFee: string;
  billingFrequency: string;
  currency: string;
}

interface TieredTier {
  from: number;
  to: number;
  price: number;
}

interface VolumeTier {
  start: string;
  end: string;
  cost: string;
}

interface StairStepTier {
  start: string;
  end: string;
  cost: string;
}

interface PricingFormData {
  flat: FlatFee;
  tiered: { tiers: TieredTier[] };
  volume: { tiers: VolumeTier[] };
  stairstep: { tiers: StairStepTier[] };
}

interface Props {
  selectedPricingModel: string;
  pricingFormData: PricingFormData;
  handleFlatDetailsChange: (field: keyof FlatFee, value: string) => void;
  handleTierChange: (
    type: 'tiered' | 'volume' | 'stairstep',
    index: number,
    field: string,
    value: string | number
  ) => void;
  handleAddTier: (type: 'tiered' | 'volume' | 'stairstep') => void;
  handleRemoveTier: (type: 'tiered' | 'volume' | 'stairstep', index: number) => void;
}

const PricingModelSetup: React.FC<Props> = ({
  selectedPricingModel,
  pricingFormData,
  handleFlatDetailsChange,
  handleTierChange,
  handleAddTier,
  handleRemoveTier
}) => {
  if (selectedPricingModel === 'flat-rate') {
    return (
      <div className='cp-container'>
        <div className="price-plan-form-group">
          <h6>Flat Fee</h6>
          <p>Charge a fixed monthly price for your product with a simple flat fee setup.</p>
          <label style={{ marginLeft: '10px' }}>Flat fee amount</label>
          <input
            value={pricingFormData.flat.recurringFee}
            onChange={(e) => {
              let value = e.target.value.replace(/[^\d.]/g, '');
              value = value ? `$${value}` : '';
              handleFlatDetailsChange('recurringFee', value);
            }}
            className="flat-recurring-fee-select"
            placeholder="$0.00"
          />
        </div>
        <div className="price-plan-form-group">
          <label style={{ marginLeft: '10px' }}>Usage Limit</label>
          <input
            value={pricingFormData.flat.billingFrequency}
            onChange={(e) => handleFlatDetailsChange('billingFrequency', e.target.value)}
            placeholder="Enter Usage Limit"
          />
        </div>
      </div>
    );
  }

  if (selectedPricingModel === 'tiered') {
    return (
      <TieredPricingDetails
        tiers={pricingFormData.tiered.tiers}
        onAddTier={() => handleAddTier('tiered')}
        onDeleteTier={(index) => handleRemoveTier('tiered', index)}
        onChange={(index, field, value) => {
          const parsedValue = parseFloat(value);
          handleTierChange('tiered', index, field, parsedValue);
        }}
      />
    );
  }

  const renderTierInputs = (type: 'volume' | 'stairstep', label: string) => (
    <div>
      <div className="price-plan-model-form-header">
        <h5>{label}</h5>
        <p>Customer pays one price for all units based on total usage.</p>
      </div>
      <div className="price-plan-model-form-body">
        {pricingFormData[type].tiers.map((tier, index) => (
          <div key={index} className="price-plan-tier-row">
            <input
              type="number"
              value={tier.start}
              onChange={(e) => handleTierChange(type, index, 'start', e.target.value)}
              placeholder="Start"
            />
            <input
              type="number"
              value={tier.end}
              onChange={(e) => handleTierChange(type, index, 'end', e.target.value)}
              placeholder="End"
            />
            <input
              type="number"
              value={tier.cost}
              onChange={(e) => handleTierChange(type, index, 'cost', e.target.value)}
              placeholder="Cost"
            />
            <button onClick={() => handleRemoveTier(type, index)} className="price-plan-delete-btn">
              Delete
            </button>
          </div>
        ))}
        <button onClick={() => handleAddTier(type)} className="price-plan-add-tier-btn">
          + Add Tier
        </button>
      </div>
    </div>
  );

  if (selectedPricingModel === 'volume-based') {
    return renderTierInputs('volume', 'Volume-Based Pricing');
  }

  if (selectedPricingModel === 'stairstep') {
    return renderTierInputs('stairstep', 'Stair-Step Pricing');
  }

  return <p>Please select a pricing model to continue.</p>;
};

export default PricingModelSetup;
