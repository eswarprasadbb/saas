import React, { useState } from 'react';
import './CreatePricePlan.css';
import Extras from './Extras';
import PlanDetails from './PlanDetails';
import PricingModelSetup from './PricingModelSetup';

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

interface PlanDetails {
  ratePlanName: string;
  productId: string;
  description: string;
  pricingModel: string;
}

interface PricingFormData {
  flat: FlatFee;
  tiered: {
    tiers: TieredTier[];
  };
  volume: {
    tiers: VolumeTier[];
  };
  stairstep: {
    tiers: StairStepTier[];
  };
  planDetails?: PlanDetails;
}

const initialState: PricingFormData = {
  flat: {
    recurringFee: '',
    billingFrequency: '',
    currency: ''
  },
  tiered: {
    tiers: [
      { from: 0, to: 0, price: 0 },
      { from: 0, to: 0, price: 0 },
      { from: 0, to: 0, price: 0 }
    ]
  },
  volume: {
    tiers: [
      { start: '', end: '', cost: '' },
      { start: '', end: '', cost: '' },
      { start: '', end: '', cost: '' }
    ]
  },
  stairstep: {
    tiers: [
      { start: '', end: '', cost: '' },
      { start: '', end: '', cost: '' },
      { start: '', end: '', cost: '' }
    ]
  }
};

interface CreatePricePlanProps {
  onClose: () => void;
}

const CreatePricePlan: React.FC<CreatePricePlanProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<string>('details');
  const [selectedPricingModel, setSelectedPricingModel] = useState<string>('');
  const [pricingFormData, setPricingFormData] = useState<PricingFormData>(initialState);

  const handlePricingModelSelect = (model: string) => setSelectedPricingModel(model);

  const handleFlatDetailsChange = (field: keyof FlatFee, value: string) => {
    setPricingFormData(prev => ({
      ...prev,
      flat: {
        ...prev.flat,
        [field]: value
      }
    }));
  };

  const handleTierChange = (
    type: 'tiered' | 'volume' | 'stairstep',
    index: number,
    field: string,
    value: string | number
  ) => {
    setPricingFormData(prev => ({
      ...prev,
      [type]: {
        tiers: prev[type].tiers.map((tier, i) =>
          i === index ? { ...tier, [field]: value } : tier
        )
      }
    }));
  };

  const handleAddTier = (type: 'tiered' | 'volume' | 'stairstep') => {
    const newTier = type === 'tiered'
      ? { from: 0, to: 0, price: 0 }
      : { start: '', end: '', cost: '' };
    setPricingFormData(prev => ({
      ...prev,
      [type]: {
        tiers: [...prev[type].tiers, newTier]
      }
    }));
  };

  const handleRemoveTier = (type: 'tiered' | 'volume' | 'stairstep', index: number) => {
    setPricingFormData(prev => ({
      ...prev,
      [type]: {
        tiers: prev[type].tiers.filter((_, i) => i !== index)
      }
    }));
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setActiveTab(currentStep === 3 ? 'pricing' : 'details');
    } else {
      onClose();
    }
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setActiveTab(currentStep === 1 ? 'pricing' : 'extras');
      setCurrentStep(currentStep + 1);
    }
  };

  const handleTabClick = (tab: string) => setActiveTab(tab);

  return (
    <div className="price-plan-outer-container">
      <h2>Create New Rate Plan</h2>
      <div className="price-plan-container">
        <div className="price-plan-tabs">
          <div className="price-plan-tab-status">
            <div className="price-plan-progress">
              <div className="price-plan-progress-bar" style={{ width: '100%' }}></div>
            </div>
          </div>
          <div className="price-plan-tab-status">
            <div className="price-plan-progress">
              <div 
                className="price-plan-progress-bar" 
                style={{ width: activeTab === 'details' ? '0%' : activeTab === 'pricing' ? '50%' : '100%' }}
              ></div>
            </div>
          </div>
          <div className="price-plan-tab-status">
            <div className="price-plan-progress">
              <div className="price-plan-progress-bar" style={{ width: activeTab === 'extras' ? '100%' : '0%' }}></div>
            </div>
          </div>
        </div>

        <div className="price-plan-tabs">
          <button className={`price-plan-tab ${activeTab === 'details' ? 'price-plan-tab-active' : ''}`} onClick={() => handleTabClick('details')}>
            Plan Details
          </button>
          <button className={`price-plan-tab ${activeTab === 'pricing' ? 'price-plan-tab-active' : ''}`} onClick={() => handleTabClick('pricing')}>
            Pricing Model setup
          </button>
          <button className={`price-plan-tab ${activeTab === 'extras' ? 'price-plan-tab-active' : ''}`} onClick={() => handleTabClick('extras')}>
            Extras (Optional)
          </button>
        </div>

        <div className="price-plan-form-section">
          {activeTab === 'details' && (
            <div className="price-plan-details-section">
              <PlanDetails 
                onPricingModelSelect={handlePricingModelSelect}
                onNext={(data) => {
                  setPricingFormData(prev => ({
                    ...prev,
                    planDetails: data
                  }));
                  handleNext();
                }}
              />
            </div>
          )}
          {activeTab === 'pricing' && (
            <div className="price-plan-pricing-section">
              <PricingModelSetup
                selectedPricingModel={selectedPricingModel}
                pricingFormData={pricingFormData}
                handleFlatDetailsChange={handleFlatDetailsChange}
                handleTierChange={handleTierChange}
                handleAddTier={handleAddTier}
                handleRemoveTier={handleRemoveTier}
              />
            </div>
          )}
          {activeTab === 'extras' && <div className="price-plan-extras-section"><Extras /></div>}
        </div>

       
        <div className="button-group">
  <div className="button-group-left">
    <button type="button" className="aforo-button" onClick={onClose}>
      <h6>Cancel</h6>
    </button>
  </div>
  <div className="button-group-right">
    <button type="button" className="buttonSecondary" onClick={handleBack} disabled={currentStep === 1}>
      <h6>Back</h6>
    </button>
    <button type="button" className="buttonPrimary" onClick={handleNext} disabled={currentStep === 3}>
      <h6>Next</h6>
    </button>
  </div>
</div>

      </div>
    </div>
  );
};

export default CreatePricePlan;
