import React from 'react';
import StairStepPricing from './StairStepPricing';
import TieredPricingDetails from './TieredPricingDetails';
import VolumeBasedPricingDetails from './VolumeBasedPricingDetails';
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
  from: number;
  to: number;
  price: number;
}

interface StairStepTier {
  from: number;
  to: number;
  price: number;
}

interface UsageBased {
  perUnitAmount: string;
}

interface PricingFormData {
  flat: FlatFee;
  tiered: { tiers: TieredTier[] };
  volume: { tiers: VolumeTier[] };
  stairstep: { tiers: StairStepTier[] };
  usage: UsageBased;
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
  handleUsageChange: (value: string) => void;
  noUpperLimit: boolean;
  setNoUpperLimit: (val: boolean) => void;
}

const PricingModelSetup: React.FC<Props> = ({
  selectedPricingModel,
  pricingFormData,
  handleFlatDetailsChange,
  handleTierChange,
  handleAddTier,
  handleRemoveTier,
  handleUsageChange,
  noUpperLimit,
  setNoUpperLimit
}) => {
  const model = selectedPricingModel?.toLowerCase();

  if (model === 'flat_fee') {
    return (
      <div className="price-plan-form-group">
        <h6>Flat Fee</h6>
        <p>Charge a fixed monthly price for your product with a simple flat fee setup.</p>

        <label>Flat fee amount</label>
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

        <label>Usage Limit</label>
        <input
          value={pricingFormData.flat.billingFrequency}
          onChange={(e) => handleFlatDetailsChange('billingFrequency', e.target.value)}
          placeholder="Enter Usage Limit"
          className="flat-billing-frequency-select"
        />
      </div>
    );
  }

  if (model === 'tiered') {
    return (
      <TieredPricingDetails
        tiers={pricingFormData.tiered.tiers}
        onAddTier={() => handleAddTier('tiered')}
        onDeleteTier={(index) => handleRemoveTier('tiered', index)}
        onChange={(index, field, value) => {
          const parsedValue = parseFloat(value);
          handleTierChange('tiered', index, field, parsedValue);
        }}
        noUpperLimit={noUpperLimit}
        setNoUpperLimit={setNoUpperLimit}
      />
    );
  }

  if (model === 'volume_based') {
    return (
      <VolumeBasedPricingDetails
        tiers={pricingFormData.volume.tiers}
        onAddTier={() => handleAddTier('volume')}
        onDeleteTier={(index) => handleRemoveTier('volume', index)}
        onChange={(index, field, value) => {
          const parsedValue = parseFloat(value);
          handleTierChange('volume', index, field, parsedValue);
        }}
        noUpperLimit={noUpperLimit}
        setNoUpperLimit={setNoUpperLimit}
      />
    );
  }

  if (model === 'stairstep') {
    return (
      <StairStepPricing
        steps={pricingFormData.stairstep.tiers}
        onAddStep={() => handleAddTier('stairstep')}
        onDeleteStep={(index) => handleRemoveTier('stairstep', index)}
        onChange={(index, field, value) => {
          const parsedValue = parseFloat(value);
          handleTierChange('stairstep', index, field, parsedValue);
        }}
        noUpperLimit={noUpperLimit}
        setNoUpperLimit={setNoUpperLimit}
      />
    );
  }

  if (model === 'usage_based') {
    return (
      <div className="price-plan-form-group">
        <h6>Usage Based</h6>
        <p>Bill your consumers based on actual usage with flexible usage-based pricing.</p>

        <label>Per Unit Amount</label>
        <input
          value={pricingFormData.usage.perUnitAmount}
          onChange={(e) => {
            let value = e.target.value.replace(/[^\d.]/g, '');
            value = value ? `$${value}` : '';
            handleUsageChange(value);
          }}
          className="flat-recurring-fee-select"
          placeholder="$0.00"
        />
      </div>
    );
  }

  return <p>Please select a pricing model to continue.</p>;
};

export default PricingModelSetup;
