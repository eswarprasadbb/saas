import React from 'react';
import { Grid, TextField, Button, Checkbox, FormControlLabel } from '@mui/material';
import { ProductFormData } from '../../../types/productTypes';

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
  onBack
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    onChange({ [name]: type === 'checkbox' ? checked : value });
  };

  const renderFields = () => {
    switch (formData.productType) {
      case 'API':
        return (
          <>
            <TextField fullWidth label="Endpoint URL" name="endpointUrl" value={formData.endpointUrl} onChange={handleChange} />
            <TextField fullWidth label="Auth Type" name="authType" value={formData.authType} onChange={handleChange} />
            <TextField fullWidth label="Payload Metric" name="payloadMetric" value={formData.payloadMetric} onChange={handleChange} />
            <TextField fullWidth label="Rate Limit Policy" name="rateLimitPolicy" value={formData.rateLimitPolicy} onChange={handleChange} />
            <TextField fullWidth label="Granularity" name="granularity" value={formData.granularity} onChange={handleChange} />
            <TextField fullWidth label="Grouping" name="grouping" value={formData.grouping} onChange={handleChange} />
            <TextField fullWidth label="Latency Class" name="latencyClass" value={formData.latencyClass} onChange={handleChange} />
            <FormControlLabel
              control={<Checkbox checked={!!formData.caching} name="caching" onChange={handleChange} />}
              label="Caching Enabled"
            />
          </>
        );
      case 'FlatFile':
        return (
          <>
            <TextField fullWidth label="Format" name="format" value={formData.format} onChange={handleChange} />
            <TextField fullWidth label="Compression" name="compression" value={formData.compression} onChange={handleChange} />
            <TextField fullWidth label="Encoding" name="encoding" value={formData.encoding} onChange={handleChange} />
            <TextField fullWidth label="Schema" name="schema" value={formData.schema} onChange={handleChange} />
            <TextField fullWidth label="Delivery Frequency" name="deliveryFrequency" value={formData.deliveryFrequency} onChange={handleChange} />
            <TextField fullWidth label="Access Method" name="accessMethod" value={formData.accessMethod} onChange={handleChange} />
            <TextField fullWidth label="Retention Policy" name="retentionPolicy" value={formData.retentionPolicy} onChange={handleChange} />
            <TextField fullWidth label="File Naming Convention" name="fileNamingConvention" value={formData.fileNamingConvention} onChange={handleChange} />
          </>
        );
      case 'SQLResult':
        return (
          <>
            <TextField fullWidth label="Query Template" name="queryTemplate" value={formData.queryTemplate} onChange={handleChange} multiline rows={3} />
            <TextField fullWidth label="Database Type" name="dbType" value={formData.dbType} onChange={handleChange} />
            <TextField fullWidth label="Freshness" name="freshness" value={formData.freshness} onChange={handleChange} />
            <TextField fullWidth label="Execution Frequency" name="executionFrequency" value={formData.executionFrequency} onChange={handleChange} />
            <TextField fullWidth label="Expected Row Range" name="expectedRowRange" value={formData.expectedRowRange} onChange={handleChange} />
            <TextField fullWidth label="Join Complexity" name="joinComplexity" value={formData.joinComplexity} onChange={handleChange} />
            <TextField fullWidth label="Result Size" name="resultSize" value={formData.resultSize} onChange={handleChange} />
            <FormControlLabel
              control={<Checkbox checked={!!formData.cached} name="cached" onChange={handleChange} />}
              label="Cached"
            />
          </>
        );
      case 'LLMToken':
        return (
          <>
            <TextField fullWidth label="Token Provider" name="tokenProvider" value={formData.tokenProvider} onChange={handleChange} />
            <TextField fullWidth label="Model Name" name="modelName" value={formData.modelName} onChange={handleChange} />
            <TextField fullWidth label="Token Unit Cost" name="tokenUnitCost" value={formData.tokenUnitCost} onChange={handleChange} />
            <TextField fullWidth label="Calculation Method" name="calculationMethod" value={formData.calculationMethod} onChange={handleChange} />
            <TextField fullWidth label="Quota" name="quota" value={formData.quota} onChange={handleChange} />
            <TextField fullWidth label="Prompt Template" name="promptTemplate" value={formData.promptTemplate} onChange={handleChange} multiline rows={2} />
            <TextField fullWidth label="Inference Priority" name="inferencePriority" value={formData.inferencePriority} onChange={handleChange} />
            <TextField fullWidth label="Compute Tier" name="computeTier" value={formData.computeTier} onChange={handleChange} />
          </>
        );
      default:
        return <p>No configuration required for selected type.</p>;
    }
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onNext(); }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {renderFields()}
        </Grid>

        <Grid item xs={6}>
          <Button variant="outlined" onClick={onBack}>
            Back
          </Button>
        </Grid>

        <Grid item xs={6} style={{ textAlign: 'right' }}>
          <Button variant="contained" color="primary" type="submit">
            Next
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ConfigurationStep;
