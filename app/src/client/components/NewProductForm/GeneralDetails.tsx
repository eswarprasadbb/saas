import React from 'react';
import { TextField, Button, Grid, FormControlLabel, Checkbox } from '@mui/material';
import { ProductFormData } from '../../../types/productTypes';

interface GeneralDetailsProps {
  formData: ProductFormData;
  onChange: (data: Partial<ProductFormData>) => void;
  onNext: () => void;
}

const GeneralDetails: React.FC<GeneralDetailsProps> = ({ formData, onChange, onNext }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    onChange({ [name]: type === 'checkbox' ? checked : value });
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onNext(); }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            required
            name="productName"
            label="Product Name"
            value={formData.productName}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            required
            name="productType"
            label="Product Type"
            value={formData.productType}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="version"
            label="Version"
            value={formData.version}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="internalSkuCode"
            label="Internal SKU Code"
            value={formData.internalSkuCode}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            minRows={2}
            name="description"
            label="Description"
            value={formData.description}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="category"
            label="Category"
            value={formData.category}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.visibility}
                onChange={handleChange}
                name="visibility"
              />
            }
            label="Visible"
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            name="status"
            label="Status"
            value={formData.status}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit">
            Next
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default GeneralDetails;
