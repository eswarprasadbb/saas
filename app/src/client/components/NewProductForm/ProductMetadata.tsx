import React from 'react';
import { Grid, TextField, Button, Typography, FormControlLabel, Switch } from '@mui/material';
import { ProductFormData } from '../../../types/productTypes';

interface ProductMetadataProps {
  formData: ProductFormData;
  onChange: (data: Partial<ProductFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const ProductMetadata: React.FC<ProductMetadataProps> = ({ formData, onChange, onNext, onBack }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    onChange({ [name]: type === 'checkbox' ? checked : value });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6">Product Metadata</Typography>
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          label="Internal SKU Code"
          name="internalSkuCode"
          value={formData.internalSkuCode}
          onChange={handleChange}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          label="Unit of Measurement (UOM)"
          name="uom"
          value={formData.uom}
          onChange={handleChange}
          fullWidth
        />
      </Grid>

      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Switch
              checked={formData.billable}
              onChange={handleChange}
              name="billable"
              color="primary"
            />
          }
          label="Billable"
        />
      </Grid>

      <Grid item xs={12} container justifyContent="space-between">
        <Button variant="outlined" onClick={onBack}>
          Back
        </Button>
        <Button variant="contained" color="primary" onClick={onNext}>
          Next
        </Button>
      </Grid>
    </Grid>
  );
};

export default ProductMetadata;
