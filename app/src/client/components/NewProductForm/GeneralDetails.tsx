import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './GeneralDetails.module.css';

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
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/get-started/products');
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ productName: e.target.value });
  };

  const handleAddTag = () => {
    if (tagKey && tagValue) {
      addTag(tagKey, tagValue);
      setTagKey('');
      setTagValue('');
    }
  };

  return (
      <Box p={3} borderRadius={2} bgcolor="#fff" className={styles.formContainer}>
        <Grid container spacing={2} className={styles.formGrid}>
          <Grid item xs={12} sm={6}>
            <label className={styles.label}>{formLabels.productName}</label>
            <input
              type="text"
              className={styles.productNameInput}
              placeholder="Enter product name"
              value={formData.productName}
              onChange={(e) => onChange({ productName: e.target.value })}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <label className={styles.label}>{formLabels.productType}</label>
            <select
              className={styles.formSelect}
              value={formData.productType}
              onChange={(e) => onChange({ productType: e.target.value })}
              required
            >
              <option value="">--Select--</option>
              {productTypeOptions.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </Grid>

          <Grid item xs={12} sm={6}>
            <label className={styles.label}>{formLabels.version}</label>
            <input
              type="text"
              className={styles.formInput}
              placeholder="Enter version"
              value={formData.version}
              onChange={(e) => onChange({ version: e.target.value })}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <label className={styles.label}>{formLabels.description}</label>
            <textarea
              className={styles.formTextarea}
              placeholder="Enter description"
              value={formData.description}
              onChange={(e) => onChange({ description: e.target.value })}
              required
              rows={3}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <label className={styles.label}>{formLabels.category}</label>
            <select
              className={styles.formSelect}
              value={formData.category}
              onChange={(e) => onChange({ category: e.target.value })}
              required
            >
              <option value="">--Select--</option>
              {categoryOptions.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </Grid>

          <Grid item xs={12} sm={6}>
            <label className={styles.label}>{formLabels.status}</label>
            <select
              className={styles.formSelect}
              value={formData.status}
              onChange={(e) => onChange({ status: e.target.value })}
              required
            >
              <option value="">--Select--</option>
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </Grid>

          <Grid item xs={12}>
            <label className={styles.label}>Tags</label>
            <div className={styles.tagInputWrapper}>
              <input
                type="text"
                id="tagKey"
                placeholder="Key"
                value={tagKey}
                onChange={(e) => setTagKey(e.target.value)}
                className={styles.tagKeyInput}
              />
              <input
                type="text"
                id="tagValue"
                placeholder="Value"
                value={tagValue}
                onChange={(e) => setTagValue(e.target.value)}
                className={styles.tagValueInput}
              />
              <button
                onClick={handleAddTag}
                disabled={!tagKey || !tagValue}
              >
                ✚ 
              </button>
            </div>
            <div className={styles.tagsContainer}>
              {formData.tags.map((tag, index) => (
                <div key={index} className={styles.tagItem}>
                  <span className={styles.tagKey}>{tag.key}</span>
                  <span className={styles.tagValue}>{tag.value}</span>
                  <button
                    onClick={() => removeTag(tag.key)}
                    className={styles.tagRemoveButton}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M2 3.99992H14M12.6667 3.99992V13.3333C12.6667 13.9999 12 14.6666 11.3333 14.6666H4.66667C4 14.6666 3.33333 13.9999 3.33333 13.3333V3.99992M5.33333 3.99992V2.66659C5.33333 1.99992 6 1.33325 6.66667 1.33325H9.33333C10 1.33325 10.6667 1.99992 10.6667 2.66659V3.99992M6.66667 7.33325V11.3333M9.33333 7.33325V11.3333" stroke="#E34935" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </Grid>
          <Grid item xs={12}>
            <label className={styles.label}>{formLabels.visibility}</label>
            <input
              type="checkbox"
              checked={formData.visibility}
              onChange={(e) => onChange({ visibility: e.target.checked })}
              className={styles.visibilityCheckbox}
            />
          </Grid>
          <Grid item xs={12}>
            <Box className={styles.buttonGroup}>
              <button type="button" onClick={handleCancel} className={styles.buttonSecondary}>Cancel</button>
              <button type="button" onClick={() => onNext()} className={styles.buttonPrimary}>Next</button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  };

export default GeneralDetails;