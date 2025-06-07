import React from 'react';
import { ProductFormData } from '../../../../types/productTypes';

interface LlmTokenConfigProps {
  formData: ProductFormData;
  setFormData: (data: ProductFormData) => void;
}

const LlmTokenConfig: React.FC<LlmTokenConfigProps> = ({ formData, setFormData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  return (
    <div className="tab-content p-4 border rounded">
      <h4 className="mb-4">LLM Token Configuration</h4>
      <div className="row g-3">
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="tokenProvider" className="form-label">
              Token Provider <span className="text-danger">*</span>
            </label>
            <select
              id="tokenProvider"
              name="tokenProvider"
              className="form-select"
              value={formData.tokenProvider || ''}
              onChange={handleChange}
              required
            >
              <option value="">Select provider</option>
              <option value="OPENAI">OpenAI</option>
              <option value="ANTHROPIC">Anthropic</option>
              <option value="GOOGLE">Google</option>
              <option value="META">Meta</option>
              <option value="COHERE">Cohere</option>
              <option value="CUSTOM">Custom Model</option>
            </select>
          </div>
        </div>

        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="modelName" className="form-label">
              Model Name <span className="text-danger">*</span>
            </label>
            <input
              id="modelName"
              name="modelName"
              type="text"
              className="form-control"
              value={formData.modelName || ''}
              onChange={handleChange}
              placeholder="e.g., gpt-4, claude-2"
              required
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="tokenUnitCost" className="form-label">
              Token Unit Cost (USD) <span className="text-danger">*</span>
            </label>
            <div className="input-group">
              <span className="input-group-text">$</span>
              <input
                id="tokenUnitCost"
                name="tokenUnitCost"
                type="number"
                step="0.0000001"
                min="0"
                className="form-control"
                value={formData.tokenUnitCost || ''}
                onChange={handleChange}
                placeholder="e.g., 0.00002"
                required
              />
              <span className="input-group-text">per 1K tokens</span>
            </div>
            <div className="form-text">
              Cost for 1,000 tokens in USD
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="calculationMethod" className="form-label">
              Calculation Method <span className="text-danger">*</span>
            </label>
            <select
              id="calculationMethod"
              name="calculationMethod"
              className="form-select"
              value={formData.calculationMethod || ''}
              onChange={handleChange}
              required
            >
              <option value="">Select method</option>
              <option value="TOKEN_COUNT">Token Count</option>
              <option value="CHARACTER_COUNT">Character Count</option>
              <option value="REQUEST">Per Request</option>
              <option value="TOKEN_PAIR">Token Pair (Input+Output)</option>
            </select>
            <div className="form-text">
              How tokens are calculated for billing
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="quota" className="form-label">
              Default Quota (optional)
            </label>
            <div className="input-group">
              <input
                id="quota"
                name="quota"
                type="number"
                min="0"
                className="form-control"
                value={formData.quota || ''}
                onChange={handleChange}
                placeholder="e.g., 1000000"
              />
              <span className="input-group-text">tokens</span>
            </div>
            <div className="form-text">
              Monthly token limit per customer (leave empty for unlimited)
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="inferencePriority" className="form-label">
              Default Inference Priority
            </label>
            <select
              id="inferencePriority"
              name="inferencePriority"
              className="form-select"
              value={formData.inferencePriority || 'STANDARD'}
              onChange={handleChange}
            >
              <option value="LOW">Low (best effort)</option>
              <option value="STANDARD">Standard</option>
              <option value="HIGH">High priority</option>
            </select>
          </div>
        </div>

        <div className="col-12">
          <div className="mb-3">
            <label htmlFor="promptTemplate" className="form-label">
              Prompt Template (optional)
            </label>
            <textarea
              id="promptTemplate"
              name="promptTemplate"
              className="form-control font-monospace"
              rows={6}
              value={formData.promptTemplate || 'You are a helpful assistant.\n\nUser: {user_input}\nAssistant:'}
              onChange={handleChange}
              placeholder="Enter your prompt template with placeholders"
            />
            <div className="form-text">
              Use {'{variable_name}'} for dynamic content. Common placeholders: {'{user_input}'}, {'{context}'}, {'{history}'}
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="computeTier" className="form-label">
              Compute Tier
            </label>
            <select
              id="computeTier"
              name="computeTier"
              className="form-select"
              value={formData.computeTier || 'STANDARD'}
              onChange={handleChange}
            >
              <option value="ECONOMY">Economy (slower, lower cost)</option>
              <option value="STANDARD">Standard</option>
              <option value="PREMIUM">Premium (faster, higher cost)</option>
            </select>
            <div className="form-text">
              Affects response time and cost
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LlmTokenConfig;
