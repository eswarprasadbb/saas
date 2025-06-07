import React, { useState } from 'react';
import GeneralDetails from './GeneralDetails';
import ProductMetadata from './ProductMetadata';
import ConfigurationStep from './ConfigurationStep';
import ReviewStep from './ReviewStep';
import SuccessStep from './SuccessStep';
import StepIndicator from './StepIndicator.module.css';

import { ProductFormData } from '../../../types/productTypes';

type Step = 0 | 1 | 2 | 3 | 4;


const NewProductForm: React.FC = () => {
  const [step, setStep] = useState<Step>(0);
  const [formData, setFormData] = useState<ProductFormData>({
    productName: '',
    productType: '',
    version: '',
    description: '',
    category: '',
    visibility: false,
    status: '',
    internalSkuCode: '',
    uom: '',
    billable: false,
    linkedRatePlans: [],
    tags: {},
    labels: {}
  });

  const handleNext = () => setStep((prev) => (prev < 3 ? (prev + 1) as Step : prev));
  const handleBack = () => setStep((prev) => (prev > 0 ? (prev - 1) as Step : prev));

  const updateFormData = (newData: Partial<ProductFormData>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <div className={StepIndicator.formContainer}>
      {step === 0 && <GeneralDetails formData={formData} onNext={handleNext} onChange={updateFormData} />}
      {step === 1 && <ProductMetadata formData={formData} onNext={handleNext} onBack={handleBack} onChange={updateFormData} />}
      {step === 2 && <ConfigurationStep formData={formData} onNext={handleNext} onBack={handleBack} onChange={updateFormData} />}
      {step === 3 && <ReviewStep formData={formData} onBack={handleBack} onSubmit={() => setStep(4)} />}
      {step === 4 && <SuccessStep />}
    </div>
  );
};

export default NewProductForm;
