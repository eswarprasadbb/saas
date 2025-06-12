import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  FormControlLabel,
  Switch,
  MenuItem,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { ProductFormData } from '../../../types/productTypes';

interface GeneralDetailsProps {
  formData: ProductFormData;
  onChange: (data: Partial<ProductFormData>) => void;
  onNext: () => void;
}

const productTypeOptions = ['API', 'FlatFile', 'SQLResult', 'LLMToken'];
const categoryOptions = ['INTERNAL', 'EXTERNAL', 'PARTNER'];
const statusOptions = ['DRAFT', 'ACTIVE', 'INACTIVE', 'DEPRECATED'];

const GeneralDetails: React.FC<GeneralDetailsProps> = ({ formData, onChange, onNext }) => {
  const [tagKey, setTagKey] = useState('');
  const [tagValue, setTagValue] = useState('');

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value, type } = e.target;
  const isCheckbox = (e.target as HTMLInputElement).type === 'checkbox';
  const checked = (e.target as HTMLInputElement).checked;
  onChange({ [name]: isCheckbox ? checked : value });
};

  const handleTagAdd = () => {
    if (tagKey && tagValue) {
      const newTags = { ...(formData.tags || {}), [tagKey]: tagValue };
      onChange({ tags: newTags });
      setTagKey('');
      setTagValue('');
    }
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onNext(); }}>
      <Typography variant="h6" gutterBottom>General Details</Typography>
      <Box p={3} borderRadius={2} bgcolor="#f9f9f9">
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
              select
              fullWidth
              required
              name="productType"
              label="Product Type"
              value={formData.productType}
              onChange={handleChange}
            >
              {productTypeOptions.map((type) => (
                <MenuItem key={type} value={type}>{type}</MenuItem>
              ))}
            </TextField>
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

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              minRows={3}
              name="description"
              label="Description"
              value={formData.description}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              name="category"
              label="Category"
              value={formData.category}
              onChange={handleChange}
            >
              {categoryOptions.map((cat) => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              name="status"
              label="Status"
              value={formData.status}
              onChange={handleChange}
            >
              {statusOptions.map((status) => (
                <MenuItem key={status} value={status}>{status}</MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={5}>
            <TextField
              fullWidth
              label="Key"
              value={tagKey}
              onChange={(e) => setTagKey(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField
              fullWidth
              label="Value"
              value={tagValue}
              onChange={(e) => setTagValue(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <IconButton color="primary" onClick={handleTagAdd}>
              <Add />
            </IconButton>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.visibility}
                  onChange={(e) => onChange({ visibility: e.target.checked })}
                  name="visibility"
                />
              }
              label="Visibility"
            />
          </Grid>

          <Grid item xs={12}>
            <Box display="flex" justifyContent="space-between">
              <Button variant="outlined" color="secondary">Cancel</Button>
              <Button variant="contained" color="success" type="submit">Next</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default GeneralDetails;
