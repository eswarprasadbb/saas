import React from 'react';
import {
  Grid,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from '@mui/material';
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

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  const renderFields = () => {
    switch (formData.productType) {
      case 'API':
        return (
          <>
            <TextField
              fullWidth
              label="Endpoint URL"
              name="endpointUrl"
              value={formData.endpointUrl}
              onChange={handleInputChange}
              margin="normal"
            />

            <FormControl fullWidth margin="normal">
              <InputLabel>Authentication Type</InputLabel>
              <Select
                name="authType"
                value={formData.authType || ''}
                onChange={handleSelectChange}
                label="Authentication Type"
              >
                <MenuItem value="NONE">None</MenuItem>
                <MenuItem value="API_KEY">API Key</MenuItem>
                <MenuItem value="OAUTH2">OAuth 2.0</MenuItem>
                <MenuItem value="JWT">JWT</MenuItem>
                <MenuItem value="BASIC_AUTH">Basic Auth</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Payload Metric"
              name="payloadMetric"
              value={formData.payloadMetric}
              onChange={handleInputChange}
              margin="normal"
            />

            <FormControl fullWidth margin="normal">
              <InputLabel>Rate Limit Policy</InputLabel>
              <Select
                name="rateLimitPolicy"
                value={formData.rateLimitPolicy || ''}
                onChange={handleSelectChange}
                label="Rate Limit Policy"
              >
                <MenuItem value="FIXED_WINDOW">Fixed Window</MenuItem>
                <MenuItem value="SLIDING_WINDOW">Sliding Window</MenuItem>
                <MenuItem value="TOKEN_BUCKET">Token Bucket</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Granularity</InputLabel>
              <Select
                name="granularity"
                value={formData.granularity || ''}
                onChange={handleSelectChange}
                label="Granularity"
              >
                <MenuItem value="SECOND">Per Second</MenuItem>
                <MenuItem value="MINUTE">Per Minute</MenuItem>
                <MenuItem value="HOUR">Per Hour</MenuItem>
                <MenuItem value="DAY">Per Day</MenuItem>
                <MenuItem value="MONTH">Per Month</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Grouping"
              name="grouping"
              value={formData.grouping}
              onChange={handleInputChange}
              margin="normal"
            />

            <FormControl fullWidth margin="normal">
              <InputLabel>Latency Class</InputLabel>
              <Select
                name="latencyClass"
                value={formData.latencyClass || ''}
                onChange={handleSelectChange}
                label="Latency Class"
              >
                <MenuItem value="LOW">Low (&lt;100ms)</MenuItem>
                <MenuItem value="MEDIUM">Medium (100–500ms)</MenuItem>
                <MenuItem value="HIGH">High (&gt;500ms)</MenuItem>
              </Select>
            </FormControl>

            <FormControlLabel
              control={
                <Checkbox
                  checked={!!formData.caching}
                  name="caching"
                  onChange={handleInputChange}
                />
              }
              label="Enable Caching"
            />
          </>
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
