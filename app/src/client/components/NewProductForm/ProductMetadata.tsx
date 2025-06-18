import React, { useState } from 'react';
import { Box, Grid, TextField, Button, FormControlLabel, Switch, IconButton } from '@mui/material';
import Add from '@mui/icons-material/Add';
import { ProductFormData, enums } from '../../../types/productTypes';

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
  const [error, setError] = React.useState<string | null>(null);

  const validateEnum = (fieldName: string, value: string, enumValues: string[]) => {
    if (!enumValues.includes(value)) {
      setError(`Invalid value for ${fieldName}. Valid values are: ${enumValues.join(', ')}`);
      return false;
    }
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    
    // Validate enums
    if (name === 'format' && !validateEnum('format', value.toUpperCase(), enums.formats)) return;
    if (name === 'accessMethod' && !validateEnum('accessMethod', value.toUpperCase(), enums.accessMethods)) return;
    if (name === 'compression' && !validateEnum('compression', value.toUpperCase(), enums.compressionFormats)) return;
    if (name === 'deliveryFrequency' && !validateEnum('deliveryFrequency', value.toUpperCase(), enums.deliveryFrequencies)) return;

    const data: Partial<ProductFormData> = {
      [name]: type === 'checkbox' ? target.checked : value.toUpperCase(),
    };

    onChange(data);
    setError(null);
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
    <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onNext();
    }}>
      <Box p={3} borderRadius={2} bgcolor="#fff">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {error && (
              <div style={{ color: 'red', marginBottom: '1rem' }}>
                {error}
              </div>
            )}
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onChange({ billable: e.target.checked });
                  }}
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLabelKey(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField
              fullWidth
              label="Value"
              value={labelValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLabelValue(e.target.value)}
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
 