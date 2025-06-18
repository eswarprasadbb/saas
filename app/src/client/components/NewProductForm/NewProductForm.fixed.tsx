import React, { useState } from 'react';
import GeneralDetails from './GeneralDetails';
import ProductMetadata from './ProductMetadata';
import ConfigurationStep from './ConfigurationStep';
import ReviewStep from './ReviewStep';
import SuccessStep from './SuccessStep';
import Swal from 'sweetalert2';
import { ProductFormData } from '../../../types/productTypes';
import styles from './StepIndicator.module.css';

type Step = 0 | 1 | 2 | 3 | 4;

const steps = ['General Details', 'Product Metadata', 'Configuration', 'Review'];

interface NewProductFormProps {
  onSubmit: (formData: ProductFormData) => Promise<void>;
  onClose: () => void;
}

const NewProductForm: React.FC<NewProductFormProps> = ({ onSubmit, onClose }) => {
  const [step, setStep] = useState<Step>(0);
  const [productId, setProductId] = useState<string | null>(null);

  const [tagKey, setTagKey] = useState('');
  const [tagValue, setTagValue] = useState('');

  const categoryOptions = ['INTERNAL', 'EXTERNAL', 'PARTNER'];

  const handleAddTag = () => {
    if (tagKey && tagValue) {
      updateFormData({ tags: [...(formData.tags || []), { key: tagKey, value: tagValue }] });
      setTagKey('');
      setTagValue('');
    }
  };

  const handleRemoveTag = (key: string) => {
    updateFormData({ tags: formData.tags.filter(tag => tag.key !== key) });
  };

  const [formData, setFormData] = useState<ProductFormData>({
    productName: '',
    productType: '',
    version: '',
    description: '',
    category: 'INTERNAL', // Set a default value from categoryOptions
    visibility: false,
    status: '',
    internalSkuCode: '',
    uom: '',
    effectiveStartDate: '',
    effectiveEndDate: '',
    billable: false,
    auditLogId: '',
    linkedRatePlans: [],
    tags: [
      { key: 'key1', value: 'value1' },
      { key: 'key2', value: 'value2' }
    ],
    labels: { label1: 'A', label2: 'B' },

    endpointUrl: '',
    authType: 'NONE',
    payloadMetric: '',
    rateLimitPolicy: '',
    granularity: '',
    grouping: '',
    caching: false,
    latencyClass: 'LOW',

    size: '',
    format: '',
    compression: 'NONE',
    encoding: '',
    schema: '',
    deliveryFrequency: '',
    accessMethod: '',
    retentionPolicy: '',
    fileNamingConvention: '',

    queryTemplate: '',
    dbType: '',
    freshness: 'REALTIME',
    executionFrequency: 'ON_DEMAND',
    expectedRowRange: '',
    joinComplexity: 'LOW',
    resultSize: '',
    cached: false,

    tokenProvider: '',
    modelName: '',
    tokenUnitCost: '',
    calculationMethod: '',
    quota: '',
    promptTemplate: '',
    inferencePriority: '',
    computeTier: '',
  });

  const updateFormData = (newData: Partial<ProductFormData>) =>
    setFormData((prev) => ({ ...prev, ...newData }));

  const nextStep = async () => {
    if (step === 1) {
      try {
        const basePayload = {
          productName: formData.productName,
          productType: formData.productType as 'API' | 'FlatFile' | 'SQLResult' | 'LLMToken',
          version: formData.version,
          description: formData.description,
          category: formData.category as 'INTERNAL' | 'EXTERNAL' | 'PARTNER',
          visibility: formData.visibility,
          status: formData.status as 'DRAFT' | 'ACTIVE' | 'INACTIVE' | 'DEPRECATED',
          internalSkuCode: formData.internalSkuCode,
          uom: formData.uom,
          effectiveStartDate: formData.effectiveStartDate
            ? new Date(formData.effectiveStartDate).toISOString()
            : null,
          effectiveEndDate: formData.effectiveEndDate
            ? new Date(formData.effectiveEndDate).toISOString()
            : null,
          billable: formData.billable,
          auditLogId: formData.auditLogId,
          linkedRatePlans: formData.linkedRatePlans,
          tags: formData.tags,
          labels: formData.labels,
        };

        const res = await fetch('http://13.230.194.245:8080/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(basePayload),
        });

        const responseText = await res.text();

        if (!res.ok) {
          throw new Error(`Product creation failed: ${responseText}`);
        }

        const { productId } = JSON.parse(responseText);
        setProductId(productId);
        Swal.fire('Success', 'Base Product Created', 'success');
      } catch (err: any) {
        Swal.fire('Error', err.message, 'error');
        return;
      }
    }

    setStep((prev) => (prev < 4 ? (prev + 1) as Step : prev));
  };

  const prevStep = () => setStep((prev) => (prev > 0 ? (prev - 1) as Step : prev));

  const handleSubmit = async () => {
    if (!productId) {
      Swal.fire('Error', 'Product ID missing. Please complete earlier steps.', 'error');
      return;
    }

    try {
      let configEndpoint = '';
      let configBody: any = { productId };

      switch (formData.productType) {
        case 'API':
          configEndpoint = '/api/products/api';
          configBody = {
            ...configBody,
            endpointUrl: formData.endpointUrl,
            authType: formData.authType,
            payloadSizeMetric: formData.payloadMetric,
            rateLimitPolicy: formData.rateLimitPolicy,
            meteringGranularity: formData.granularity,
            grouping: formData.grouping,
            cachingFlag: formData.caching,
            latencyClass: formData.latencyClass,
          };
          break;

        case 'FlatFile':
          configEndpoint = '/api/products/flatfile';
          configBody = {
            ...configBody,
            size: formData.size,
            format: formData.format,
            compressionFormat: formData.compression,
            deliveryFrequency: formData.deliveryFrequency,
            accessMethod: formData.accessMethod,
            retentionPolicy: formData.retentionPolicy,
            fileNamingConvention: formData.fileNamingConvention,
          };
          break;

        case 'SQLResult':
          configEndpoint = '/api/products/sql-result';
          configBody = {
            ...configBody,
            queryTemplate: formData.queryTemplate,
            dbType: formData.dbType,
            freshness: formData.freshness,
            executionFrequency: formData.executionFrequency,
            expectedRowRange: formData.expectedRowRange,
            joinComplexity: formData.joinComplexity,
            resultSize: formData.resultSize,
            cached: formData.cached,
          };
          break;

        case 'LLMToken':
          configEndpoint = '/api/products/llm-token';
          configBody = {
            ...configBody,
            tokenProvider: formData.tokenProvider,
            modelName: formData.modelName,
            tokenUnitCost: formData.tokenUnitCost,
            calculationMethod: formData.calculationMethod,
            quota: formData.quota,
            promptTemplate: formData.promptTemplate,
            inferencePriority: formData.inferencePriority,
            computeTier: formData.computeTier,
          };
          break;

        default:
          throw new Error('Unknown product type');
      }

      const configRes = await fetch(`http://13.230.194.245:8080${configEndpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(configBody),
      });

      if (!configRes.ok) {
        throw new Error(`Configuration failed: ${await configRes.text()}`);
      }

      Swal.fire('Success', 'Product Configuration Saved', 'success');
      nextStep();
    } catch (err: any) {
      Swal.fire('Error', err.message, 'error');
    }
  };

  const renderStepTabs = () => (
    <div className={styles.stepIndicatorContainer}>
      {steps.map((label, index) => (
        <div
          key={index}
          className={`${styles.step} ${step >= index ? styles.completed : ''} ${step === index ? styles.active : ''}`}
          onClick={() => setStep(index as Step)}
        >
          <div className={styles.stepTitle}>{label}</div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="new-product-form">
      <h2 className={styles.title}>Create New Pricing Product</h2>
      <div className={styles.formContainer}>
        {renderStepTabs()}
        {step === 0 && (
          <GeneralDetails
            formData={formData}
            onChange={updateFormData}
            onNext={nextStep}
            onBack={prevStep}
            categoryOptions={categoryOptions}
            addTag={handleAddTag}
            removeTag={handleRemoveTag}
            tagKey={tagKey}
            tagValue={tagValue}
            setTagKey={setTagKey}
            setTagValue={setTagValue}
          />
        )}
        {step === 1 && (
          <ProductMetadata
            formData={formData}
            onChange={updateFormData}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}
        {step === 2 && (
          <ConfigurationStep
            formData={formData}
            onChange={updateFormData}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}
        {step === 3 && (
          <ReviewStep
            formData={formData}
            onBack={prevStep}
            onSubmit={handleSubmit}
          />
        )}
        {step === 4 && <SuccessStep />}
      </div>
    </div>
  );
};

export default NewProductForm;
