import React from 'react';
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { ProductFormData } from '../../../../types/productTypes';

interface LlmTokenConfigProps {
  formData: ProductFormData;
  setFormData: (data: ProductFormData) => void;
}

const LlmTokenConfig: React.FC<LlmTokenConfigProps> = ({ formData, setFormData }) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth size="small">
          <InputLabel>Token Provider</InputLabel>
          <Select
            name="tokenProvider"
            value={formData.tokenProvider || ''}
            onChange={handleSelectChange}
            label="Token Provider"
          >
            <MenuItem value="">--Select--</MenuItem>
            <MenuItem value="OPENAI">OpenAI</MenuItem>
            <MenuItem value="ANTHROPIC">Anthropic</MenuItem>
            <MenuItem value="MISTRAL">Mistral</MenuItem>
            <MenuItem value="CUSTOM">Custom</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          size="small"
          label="Model Name"
          name="modelName"
          value={formData.modelName || ''}
          onChange={handleInputChange}
          placeholder="Enter model name"
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          size="small"
          label="Token Unit Cost"
          name="tokenUnitCost"
          type="number"
          value={formData.tokenUnitCost || ''}
          onChange={handleInputChange}
          placeholder="Enter cost"
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormControl fullWidth size="small">
          <InputLabel>Calculation Method</InputLabel>
          <Select
            name="calculationMethod"
            value={formData.calculationMethod || ''}
            onChange={handleSelectChange}
            label="Calculation Method"
          >
            <MenuItem value="">--Select--</MenuItem>
            <MenuItem value="FIXED">Fixed</MenuItem>
            <MenuItem value="DYNAMIC">Dynamic</MenuItem>
            <MenuItem value="HYBRID">Hybrid</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          size="small"
          label="Quota"
          name="quota"
          type="number"
          value={formData.quota || ''}
          onChange={handleInputChange}
          placeholder="Enter quota"
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          size="small"
          label="Prompt Template"
          name="promptTemplate"
          value={formData.promptTemplate || ''}
          onChange={handleInputChange}
          placeholder="Enter prompt"
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormControl fullWidth size="small">
          <InputLabel>Inference Priority</InputLabel>
          <Select
            name="inferencePriority"
            value={formData.inferencePriority || ''}
            onChange={handleSelectChange}
            label="Inference Priority"
          >
            <MenuItem value="">--Select--</MenuItem>
            <MenuItem value="LOW">Low</MenuItem>
            <MenuItem value="MEDIUM">Medium</MenuItem>
            <MenuItem value="HIGH">High</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormControl fullWidth size="small">
          <InputLabel>Compute Tier</InputLabel>
          <Select
            name="computeTier"
            value={formData.computeTier || ''}
            onChange={handleSelectChange}
            label="Compute Tier"
          >
            <MenuItem value="">--Select--</MenuItem>
            <MenuItem value="STANDARD">Standard</MenuItem>
            <MenuItem value="PREMIUM">Premium</MenuItem>
            <MenuItem value="GPU_OPTIMIZED">GPU Optimized</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default LlmTokenConfig;
