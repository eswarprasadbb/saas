import React, { useState } from 'react';
import {
  Grid,
  TextField,
  Button,
  Typography,
  FormControlLabel,
  Switch,
  IconButton,
  Box,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { ProductFormData } from '../../../types/productTypes';

interface ProductMetadataProps {
  formData: ProductFormData;
  onChange: (data: Partial<ProductFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const ProductMetadata: React.FC<ProductMetadataProps> = ({
  formData,
  onChange,
  onNext,
  onBack,
}) => {
  const [labelKey, setLabelKey] = useState('');
  const [labelValue, setLabelValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    onChange({ [name]: type === 'checkbox' ? checked : value });
  };

  const handleLabelAdd = () => {
    if (labelKey && labelValue) {
      const newLabels = { ...(formData.labels || {}), [labelKey]: labelValue };
      onChange({ labels: newLabels });
      setLabelKey('');
      setLabelValue('');
    }
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onNext(); }}>
      <Typography variant="h6" gutterBottom>
        Product Metadata
      </Typography>

      <Box p={3} borderRadius={2} bgcolor="#f9f9f9">
        <Grid container spacing={2}>
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
              label="UOM"
              name="uom"
              value={formData.uom}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Effective Start Date"
              name="effectiveStartDate"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formData.effectiveStartDate}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Effective End Date"
              name="effectiveEndDate"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formData.effectiveEndDate}
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
                />
              }
              label="Billable"
            />
          </Grid>

          <Grid item xs={12} sm={5}>
            <TextField
              fullWidth
              label="Key"
              value={labelKey}
              onChange={(e) => setLabelKey(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField
              fullWidth
              label="Value"
              value={labelValue}
              onChange={(e) => setLabelValue(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <IconButton color="primary" onClick={handleLabelAdd}>
              <Add />
            </IconButton>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Linked Rate Plans"
              name="linkedRatePlanIds"
              value={formData.linkedRatePlans}
              onChange={handleChange}
              placeholder="Enter rate plan IDs (comma-separated)"
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Audit Log ID"
              name="auditLogId"
              value={formData.auditLogId}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} display="flex" justifyContent="space-between">
            <Button variant="outlined" color="secondary" onClick={onBack}>
              Back
            </Button>
            <Button variant="contained" color="success" type="submit">
              Next
            </Button>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default ProductMetadata;
