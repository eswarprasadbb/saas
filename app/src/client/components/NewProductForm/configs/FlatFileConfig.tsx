import React from 'react';
import { Grid, TextField } from '@mui/material';
import { ProductFormData } from '../../../../types/productTypes';

interface Props {
  formData: ProductFormData;
  onChange: (data: Partial<ProductFormData>) => void;
}

const FlatFileConfig: React.FC<Props> = ({ formData, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <TextField fullWidth label="Format" name="format" value={formData.format} onChange={handleChange} />
      </Grid>
      <Grid item xs={6}>
        <TextField fullWidth label="Compression" name="compression" value={formData.compression} onChange={handleChange} />
      </Grid>
      <Grid item xs={6}>
        <TextField fullWidth label="Encoding" name="encoding" value={formData.encoding} onChange={handleChange} />
      </Grid>
      <Grid item xs={6}>
        <TextField fullWidth label="Schema" name="schema" value={formData.schema} onChange={handleChange} />
      </Grid>
      <Grid item xs={6}>
        <TextField fullWidth label="Delivery Frequency" name="deliveryFrequency" value={formData.deliveryFrequency} onChange={handleChange} />
      </Grid>
      <Grid item xs={6}>
        <TextField fullWidth label="Access Method" name="accessMethod" value={formData.accessMethod} onChange={handleChange} />
      </Grid>
      <Grid item xs={6}>
        <TextField fullWidth label="Retention Policy" name="retentionPolicy" value={formData.retentionPolicy} onChange={handleChange} />
      </Grid>
      <Grid item xs={6}>
        <TextField fullWidth label="File Naming Convention" name="fileNamingConvention" value={formData.fileNamingConvention} onChange={handleChange} />
      </Grid>
    </Grid>
  );
};

export default FlatFileConfig;
