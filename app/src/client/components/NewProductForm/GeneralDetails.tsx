import React, { useState } from 'react';
import styles from './GeneralDetails.module.css';

import {
  TextField,
  Button,
  Typography,
  FormControlLabel,
  Switch,
  IconButton,
  Box,
  MenuItem,
} from '@mui/material';

interface FormLabel {
  productName: string;
  productType: string;
  category: string;
  tags: string;
  description: string;
  version: string;
  status: string;
  internalSkuCode: string;
  visibility: string;
}

const formLabels: FormLabel = {
  productName: 'Product Name',
  productType: 'Product Type',
  category: 'Category',
  tags: 'Tags',
  description: 'Description',
  version: 'Version',
  status: 'Status',
  internalSkuCode: 'Internal SKU Code',
  visibility: 'Visibility'
};
import { Add, Close } from '@mui/icons-material';

interface GeneralDetailsProps {
  formData: {
    productName: string;
    productType: string;
    version: string;
    description: string;
    category: string;
    status: string;
    tags: { key: string; value: string }[];
    visibility: boolean;
  };
  onChange: (data: Partial<GeneralDetailsProps['formData']>) => void;
  onNext: () => void;
  onBack: () => void;
  categoryOptions: string[];
  addTag: (key: string, value: string) => void;
  removeTag: (key: string) => void;
  tagKey: string;
  tagValue: string;
  setTagKey: (key: string) => void;
  setTagValue: (value: string) => void;
}

const productTypeOptions = ['API', 'FlatFile', 'SQLResult', 'LLMToken'];
const categoryOptions = ['INTERNAL', 'EXTERNAL', 'PARTNER'];
const statusOptions = ['DRAFT', 'ACTIVE', 'INACTIVE', 'DEPRECATED'];

const GeneralDetails: React.FC<GeneralDetailsProps> = ({
  formData,
  onChange,
  onNext,
  onBack,
  categoryOptions,
  addTag,
  removeTag,
  tagKey,
  tagValue,
  setTagKey,
  setTagValue
}) => {
  const [error, setError] = useState<string | null>(null);

  const validateForm = () => {
    if (!formData.productName) {
      setError('Product Name is required');
      return false;
    }
    if (!formData.productType) {
      setError('Product Type is required');
      return false;
    }
    if (!formData.category) {
      setError('Category is required');
      return false;
    }
    if (!categoryOptions.includes(formData.category)) {
      setError(`Invalid category. Valid options are: ${categoryOptions.join(', ')}`);
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onNext();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ productName: e.target.value });
    setError(null);
  };
  const [tagKeyState, setTagKeyState] = useState('');
  const [tagValueState, setTagValueState] = useState('');

  const handleAddTag = () => {
    if (tagKeyState && tagValueState) {
      addTag(tagKeyState, tagValueState);
      setTagKeyState('');
      setTagValueState('');
    }
  };

  const handleTagKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagKeyState(e.target.value);
  };

  const handleTagValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagValueState(e.target.value);
  };

  return (
      <Box p={3} borderRadius={2} bgcolor="#fff" className={styles.formContainer}>
        <Grid container spacing={2} className={styles.formGrid}>
          <Grid item xs={12}>
            {error && (
              <div style={{ color: 'red', marginBottom: '1rem' }}>
                {error}
              </div>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <label className={styles.label}>{formLabels.productName}</label>
            <TextField
              fullWidth
              required
              name="productName"
              label="Product Name"
              value={formData.productName}
              onChange={handleInputChange}
              className={styles.formField}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <label className={styles.label}>{formLabels.productType}</label>
            <TextField
              select
              fullWidth
              required
              name="productType"
              label="Product Type"
              value={formData.productType}
              onChange={(e) => onChange({ productType: e.target.value })}
              className={styles.formField}
            >
              {productTypeOptions.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <label className={styles.label}>{formLabels.version}</label>
            <TextField
              fullWidth
              name="version"
              label="Version"
              value={formData.version}
              onChange={(e) => onChange({ version: e.target.value })}
              className={styles.formField}
            />
          </Grid>

          <Grid item xs={12}>
              <label className={styles.label}>{formLabels.description}</label>
            <TextField
              fullWidth
              multiline
              minRows={3}
              name="description"
              label={formLabels.description}
              value={formData.description}
              onChange={(e) => onChange({ description: e.target.value })}
              className={styles.formField}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <label className={styles.label}>{formLabels.category}</label>
            <TextField
              select
              fullWidth
              required
              name="category"
              label="Category"
              value={formData.category}
              onChange={(e) => {
                const selectedValue = e.target.value as string;
                if (categoryOptions.includes(selectedValue)) {
                  onChange({ category: selectedValue });
                } else {
                  console.warn('Invalid category selected:', selectedValue);
                }
              }}
              defaultValue={categoryOptions[0]}
              className={styles.formField}
            >
              {categoryOptions.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <label className={styles.label}>{formLabels.status}</label>
            <TextField
              select
              fullWidth
              name="status"
              label="Status"
              value={formData.status}
              onChange={(e) => onChange({ status: e.target.value })}
              className={styles.formField}
            >
              {statusOptions.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={5}>
              <label className={styles.label}>{formLabels.tags}</label>
            <div className={styles.tagInputContainer}>
              <TextField
                fullWidth
                label="Key"
                value={tagKey}
                onChange={(e) => setTagKey(e.target.value)}
              />
              <TextField
                fullWidth
                label="Value"
                value={tagValue}
                onChange={(e) => setTagValue(e.target.value)}
              />
              <Button
                variant="contained"
                className={styles.tagButton}
                onClick={() => addTag(tagKey, tagValue)}
                disabled={!tagKey || !tagValue}
              >
                Add Tag
              </Button>
            </div>
            <div className={styles.tagList}>
              {formData.tags.map((tag, index) => (
                <div key={index} className={styles.tagItem}>
                  <span>{tag.key}: {tag.value}</span>
                  <IconButton
                    className={styles.removeTagButton}
                    onClick={() => removeTag(tag.key)}
                    size="small"
                  >
                    <Close />
                  </IconButton>
                </div>
              ))}
            </div>
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
            <Box className={styles.buttonGroup}>
              <Button variant="outlined" color="secondary" onClick={onBack} className={styles.buttonSecondary}>Cancel</Button>
              <Button variant="contained" color="success" type="submit" className={styles.buttonPrimary}>Next</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
  );
};

export default GeneralDetails;