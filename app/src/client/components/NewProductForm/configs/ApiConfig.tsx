import React from 'react';
import { ProductFormData } from '../../../../types/productTypes';
import styles from './ApiConfig.module.css';

interface Props {
  formData: ProductFormData;
  setFormData: (data: Partial<ProductFormData>) => void;
}

const ApiConfig: React.FC<Props> = ({ formData, setFormData }) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className={styles.formGrid}>
      <div className={styles.formGroup}>
        <label className={styles.formGroupLabel} htmlFor="endpointUrl">
          Endpoint URL <span className="text-danger">*</span>
        </label>
        <input
          id="endpointUrl"
          name="endpointUrl"
          type="url"
          value={formData.endpointUrl || ''}
          onChange={handleInputChange}
          className={styles.formGroupInput}
          required
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
          <option value="">None</option>
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
          value={formData.payloadMetric || ''}
          onChange={handleInputChange}
          className={styles.formGroupInput}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formGroupLabel} htmlFor="rateLimitPolicy">
          Rate Limit Policy
        </label>
        <input
          type="text"
          id="rateLimitPolicy"
          name="rateLimitPolicy"
          value={formData.rateLimitPolicy || ''}
          onChange={handleInputChange}
          placeholder="FIXED_WINDOW, SLIDING_WINDOW, TOKEN_BUCKET"
          className={styles.formGroupInput}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formGroupLabel} htmlFor="granularity">
          Granularity
        </label>
        <input
          type="text"
          id="granularity"
          name="granularity"
          value={formData.granularity || ''}
          onChange={handleInputChange}
          placeholder="SECOND, MINUTE, HOUR, DAY, MONTH"
          className={styles.formGroupInput}
        />
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
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formGroupLabel} htmlFor="grouping">
          Response Grouping (Optional)
        </label>
        <input
          id="grouping"
          name="grouping"
          type="text"
          value={formData.grouping || ''}
          onChange={handleInputChange}
          className={styles.formGroupInput}
          placeholder="e.g., customer_id, region"
        />
        <div className={styles.formGroupHelperText}>
          Comma-separated list of fields to group API responses by for metering
        </div>
      </div>
    </div>
  );
};

export default ApiConfig;
