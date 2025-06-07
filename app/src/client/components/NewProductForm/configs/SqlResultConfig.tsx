import React from 'react';
import { Grid, TextField, Checkbox, FormControlLabel } from '@mui/material';
import { ProductFormData } from '../../../../types/productTypes';

interface Props {
  formData: ProductFormData;
  onChange: (data: Partial<ProductFormData>) => void;
}

const SqlResultConfig: React.FC<Props> = ({ formData, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    onChange({ [name]: type === 'checkbox' ? checked : value });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          multiline
          rows={3}
          label="Query Template"
          name="queryTemplate"
          value={formData.queryTemplate}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField fullWidth label="Database Type" name="dbType" value={formData.dbType} onChange={handleChange} />
      </Grid>
      <Grid item xs={6}>
        <TextField fullWidth label="Freshness" name="freshness" value={formData.freshness} onChange={handleChange} />
      </Grid>
      <Grid item xs={6}>
        <TextField fullWidth label="Execution Frequency" name="executionFrequency" value={formData.executionFrequency} onChange={handleChange} />
      </Grid>
      <Grid item xs={6}>
        <TextField fullWidth label="Expected Row Range" name="expectedRowRange" value={formData.expectedRowRange} onChange={handleChange} />
      </Grid>
      <Grid item xs={6}>
        <TextField fullWidth label="Join Complexity" name="joinComplexity" value={formData.joinComplexity} onChange={handleChange} />
      </Grid>
      <Grid item xs={6}>
        <TextField fullWidth label="Result Size" name="resultSize" value={formData.resultSize} onChange={handleChange} />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={<Checkbox checked={!!formData.cached} name="cached" onChange={handleChange} />}
          label="Cached Result"
        />
      </Grid>
    </Grid>
  );
};

export default SqlResultConfig;
