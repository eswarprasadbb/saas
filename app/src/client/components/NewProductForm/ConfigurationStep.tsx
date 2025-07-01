import React from 'react';
import styles from './ConfigurationStep.module.css';
import { ProductFormData } from '../../../types/productTypes';
import LlmTokenConfig from './configs/LlmTokenConfig';
import FlatFileConfig from './configs/FlatFileConfig';
import SqlResultConfig from './configs/SqlResultConfig';


interface ConfigurationStepProps {
  formData: ProductFormData;
  onChange: (data: Partial<ProductFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const ConfigurationStep: React.FC<ConfigurationStepProps> = ({
  formData,
  onChange,
  onNext,
  onBack,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    onChange({ [name]: type === 'checkbox' ? checked : value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  const renderFields = () => {
    switch (formData.productType) {
      case 'API':
        return (
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.formGroupLabel} htmlFor="endpointUrl">
                Endpoint URL
              </label>
              <input
                id="endpointUrl"
                name="endpointUrl"
                type="text"
                value={formData.endpointUrl}
                onChange={handleInputChange}
                className={styles.formGroupInput}
                placeholder="Enter endpoint URL"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formGroupLabel} htmlFor="authType">
                Authentication Type
              </label>
              <select
                id="authType"
                name="authType"
                value={formData.authType || ''}
                onChange={handleSelectChange}
                className={styles.formGroupSelect}
              >
                <option value="">Select</option>
                <option value="NONE">NONE</option>
                <option value="API_KEY">API_KEY</option>
                <option value="OAUTH2">OAUTH2</option>
                <option value="BASIC_AUTH">BASIC_AUTH</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formGroupLabel} htmlFor="payloadMetric">
                Payload Metric
              </label>
              <input
                id="payloadMetric"
                name="payloadMetric"
                type="text"
                value={formData.payloadMetric}
                onChange={handleInputChange}
                className={styles.formGroupInput}
                placeholder="Enter payload metric"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formGroupLabel} htmlFor="rateLimitPolicy">
                Rate Limit Policy
              </label>
              <input
                id="rateLimitPolicy"
                name="rateLimitPolicy"
                type="text"
                value={formData.rateLimitPolicy || ''}
                onChange={handleInputChange}
                className={styles.formGroupInput}
                placeholder="FIXED_WINDOW, SLIDING_WINDOW, TOKEN_BUCKET"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formGroupLabel} htmlFor="granularity">
                Granularity
              </label>
              <input
                id="granularity"
                name="granularity"
                type="text"
                value={formData.granularity || ''}
                onChange={handleInputChange}
                className={styles.formGroupInput}
                placeholder="SECOND, MINUTE, HOUR, DAY, MONTH"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formGroupLabel} htmlFor="grouping">
                Grouping
              </label>
              <input
                id="grouping"
                name="grouping"
                type="text"
                value={formData.grouping}
                onChange={handleInputChange}
                className={styles.formGroupInput}
                placeholder="Enter grouping"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formGroupLabel} htmlFor="latencyClass">
                Latency Class
              </label>
              <select
                id="latencyClass"
                name="latencyClass"
                value={formData.latencyClass || ''}
                onChange={handleSelectChange}
                className={styles.formGroupSelect}
              >
                <option value="">Select</option>
                <option value="LOW">LOW (&lt;100ms)</option>
                <option value="MEDIUM">MEDIUM (100–500ms)</option>
                <option value="HIGH">HIGH (&gt;500ms)</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <div className={styles.checkbox}>
                <input
                  type="checkbox"
                  id="caching"
                  name="caching"
                  checked={!!formData.caching}
                  onChange={handleInputChange}
                />
                <label className={styles.checkboxLabel} htmlFor="caching">
                  Enable Caching
                </label>
              </div>
            </div>
          </div>
        );

      case 'LLMToken':
        return (
          <LlmTokenConfig
            formData={formData}
            setFormData={(data) => onChange({ ...data })}
          />
        );

     case 'FlatFile':
      return (
        <FlatFileConfig
          formData={formData}
          setFormData={(data) => onChange({ ...data })}
        />
      );
        
        
       case 'SQLResult':
      return (
        <SqlResultConfig
          formData={formData}
          setFormData={(data) => onChange({ ...data })}
        />
      );

      default:
        return <p>No configuration fields for selected product type.</p>;
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onNext();
      }}
    >
      {renderFields()}

        {/* <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <button type="button" onClick={onBack}>
            Back
          </button>
          <button type="submit">
            Next
          </button>
        </div> */}
          <div className={styles.buttonGroup}>
             <button
               onClick={onBack}
               className={styles.backButton}
             >
               Back
             </button>
             <button
               type="submit"
               className={styles.nextButton}
             >
               Next
             </button>
          </div>
        </form>
  );
};

export default ConfigurationStep;
