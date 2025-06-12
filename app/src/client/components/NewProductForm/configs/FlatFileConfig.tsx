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

interface FlatFileConfigProps {
  formData: ProductFormData;
  setFormData: (data: Partial<ProductFormData>) => void;
}

const FlatFileConfig: React.FC<FlatFileConfigProps> = ({ formData, setFormData }) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth size="small">
          <InputLabel>Delivery Frequency</InputLabel>
          <Select
            name="deliveryFrequency"
            value={formData.deliveryFrequency || ''}
            onChange={handleSelectChange}
            label="Delivery Frequency"
          >
            <MenuItem value="">--Select--</MenuItem>
            <MenuItem value="DAILY">Daily</MenuItem>
            <MenuItem value="WEEKLY">Weekly</MenuItem>
            <MenuItem value="MONTHLY">Monthly</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormControl fullWidth size="small">
          <InputLabel>Access Method</InputLabel>
          <Select
            name="accessMethod"
            value={formData.accessMethod || ''}
            onChange={handleSelectChange}
            label="Access Method"
          >
            <MenuItem value="">--Select--</MenuItem>
            <MenuItem value="FTP">FTP</MenuItem>
            <MenuItem value="S3">S3</MenuItem>
            <MenuItem value="EMAIL">Email</MenuItem>
            <MenuItem value="API">API</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormControl fullWidth size="small">
          <InputLabel>Format</InputLabel>
          <Select
            name="format"
            value={formData.format || ''}
            onChange={handleSelectChange}
            label="Format"
          >
            <MenuItem value="">--Select--</MenuItem>
            <MenuItem value="CSV">CSV</MenuItem>
            <MenuItem value="JSON">JSON</MenuItem>
            <MenuItem value="XML">XML</MenuItem>
            <MenuItem value="PARQUET">Parquet</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          size="small"
          label="Size"
          name="size"
          value={formData.size || ''}
          onChange={handleInputChange}
          placeholder="e.g., 10MB, 1000 rows"
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          size="small"
          label="Retention Policy"
          name="retentionPolicy"
          value={formData.retentionPolicy || ''}
          onChange={handleInputChange}
          placeholder="e.g., 30 days"
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormControl fullWidth size="small">
          <InputLabel>Compression Format</InputLabel>
          <Select
            name="compressionFormat"
            value={formData.compression || ''}
            onChange={handleSelectChange}
            label="Compression Format"
          >
            <MenuItem value="">--Select--</MenuItem>
            <MenuItem value="NONE">None</MenuItem>
            <MenuItem value="GZIP">GZIP</MenuItem>
            <MenuItem value="ZIP">ZIP</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          size="small"
          label="File Naming Convention"
          name="fileNamingConvention"
          value={formData.fileNamingConvention || ''}
          onChange={handleInputChange}
          placeholder="e.g., YYYYMMDD_HHMMSS"
        />
      </Grid>
    </Grid>
  );
};

export default FlatFileConfig;
