import React from 'react';
import { ProductFormData } from '../../../../types/productTypes';

interface ApiConfigProps {
  formData: ProductFormData;
  setFormData: (data: ProductFormData) => void;
}

const ApiConfig: React.FC<ApiConfigProps> = ({ formData, setFormData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  return (
    <div className="tab-content p-4 border rounded">
      <h4 className="mb-4">API Configuration</h4>
      <div className="row g-3">
        <div className="col-12">
          <label htmlFor="endpointUrl" className="form-label">
            Endpoint URL <span className="text-danger">*</span>
          </label>
          <input
            id="endpointUrl"
            name="endpointUrl"
            type="url"
            className="form-control"
            value={formData.endpointUrl || ''}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="authType" className="form-label">
            Authentication Type
          </label>
          <select
            id="authType"
            name="authType"
            className="form-select"
            value={formData.authType || ''}
            onChange={handleChange}
          >
            <option value="">None</option>
            <option value="API_KEY">API Key</option>
            <option value="OAUTH2">OAuth 2.0</option>
            <option value="BASIC_AUTH">Basic Auth</option>
          </select>
        </div>

        <div className="col-md-6">
          <label htmlFor="payloadMetric" className="form-label">
            Payload Metric
          </label>
          <input
            id="payloadMetric"
            name="payloadMetric"
            type="text"
            className="form-control"
            value={formData.payloadMetric || ''}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="rateLimitPolicy" className="form-label">
            Rate Limit Policy
          </label>
          <select
            id="rateLimitPolicy"
            name="rateLimitPolicy"
            className="form-select"
            value={formData.rateLimitPolicy || ''}
            onChange={handleChange}
          >
            <option value="">None</option>
            <option value="FIXED_WINDOW">Fixed Window</option>
            <option value="SLIDING_WINDOW">Sliding Window</option>
            <option value="TOKEN_BUCKET">Token Bucket</option>
          </select>
        </div>

        <div className="col-md-6">
          <label htmlFor="granularity" className="form-label">
            Granularity
          </label>
          <select
            id="granularity"
            name="granularity"
            className="form-select"
            value={formData.granularity || ''}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="SECOND">Per Second</option>
            <option value="MINUTE">Per Minute</option>
            <option value="HOUR">Per Hour</option>
            <option value="DAY">Per Day</option>
            <option value="MONTH">Per Month</option>
          </select>
        </div>

        <div className="col-md-6">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="caching"
              name="caching"
              checked={formData.caching || false}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="caching">
              Enable Caching
            </label>
          </div>
        </div>

        <div className="col-md-6">
          <label htmlFor="latencyClass" className="form-label">
            Latency Class
          </label>
          <select
            id="latencyClass"
            name="latencyClass"
            className="form-select"
            value={formData.latencyClass || ''}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="LOW">Low (&lt;100ms)</option>
            <option value="MEDIUM">Medium (100-500ms)</option>
            <option value="HIGH">High (&gt;500ms)</option>
          </select>
        </div>

        <div className="col-12">
          <label htmlFor="grouping" className="form-label">
            Response Grouping (Optional)
          </label>
          <input
            id="grouping"
            name="grouping"
            type="text"
            className="form-control"
            value={formData.grouping || ''}
            onChange={handleChange}
            placeholder="e.g., customer_id, region"
          />
          <div className="form-text">
            Comma-separated list of fields to group API responses by for metering
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiConfig;
