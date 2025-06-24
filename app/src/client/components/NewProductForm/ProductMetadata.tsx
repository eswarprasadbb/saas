import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { ProductFormData, enums } from '../../../types/productTypes';
import styles from './ProductMetadata.module.css';
import metadataStyles from './MetadataLabels.module.css';
import FlatFileStyles from './configs/FlatFileConfig.module.css';

interface ProductMetadataProps {
  formData: ProductFormData;
  onChange: (data: Partial<ProductFormData>) => void;
  onNext: () => void;
  onBack: () => void;
  categoryOptions: string[];
  subCategoryOptions: string[];
  unitOptions: string[];
  taxOptions: string[];
  unitTypeOptions: string[];
  labelKey: string;
  labelValue: string;
  setLabelKey: React.Dispatch<React.SetStateAction<string>>;
  setLabelValue: React.Dispatch<React.SetStateAction<string>>;
  addLabel: (key: string, value: string) => void;
  removeLabel: (key: string) => void;
}

const ProductMetadata: React.FC<ProductMetadataProps> = ({
  formData,
  onChange,
  onNext,
  onBack,
  categoryOptions,
  subCategoryOptions,
  unitOptions,
  taxOptions,
  unitTypeOptions,
  labelKey,
  labelValue,
  setLabelKey,
  setLabelValue,
  addLabel,
  removeLabel,
}) => {
  const [error, setError] = React.useState<string | null>(null);

  const validateEnum = (fieldName: string, value: string, enumValues: string[]) => {
    if (!enumValues.includes(value)) {
      setError(`Invalid value for ${fieldName}. Valid values are: ${enumValues.join(', ')}`);
      return false;
    }
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value, type } = target;
    
    // Validate enums
    if (name === 'format' && !validateEnum('format', value, enums.formats)) return;
    if (name === 'accessMethod' && !validateEnum('accessMethod', value, enums.accessMethods)) return;
    if (name === 'compression' && !validateEnum('compression', value, enums.compressionFormats)) return;
    if (name === 'deliveryFrequency' && !validateEnum('deliveryFrequency', value, enums.deliveryFrequencies)) return;

    const data: Partial<ProductFormData> = {
      [name]: type === 'checkbox' ? target.checked : value,
    };

    onChange(data);
    setError(null);
  };

 

  return (
    <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onNext();
    }}>
      <div className={styles.container}>
        <Grid container spacing={2} className={styles.formGrid}>
          <Grid item xs={12}>
            {error && (
              <div className={styles.error}>
                {error}
              </div>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className={styles.formGroupLabel}>
              <label>Internal SKU Code</label>
              <input
                type="text"
                name="internalSkuCode"
                value={formData.internalSkuCode}
                onChange={handleChange}
                className={styles.inputField}
                placeholder="Enter internal SKU code"
              />
            </div>
          </Grid>


          <Grid item xs={12} sm={6}>
            <div className={styles.formGroupLabel}>
              <label>UOM</label>
              <input
                type="text"
                name="uom"
                value={formData.uom}
                onChange={handleChange}
                className={styles.inputField}
                placeholder="Enter UOM"
              />
            </div>
          </Grid>

          <Grid item xs={12} sm={6}>
            <div className={styles.formGroupLabel}>
              <label>Effective Start Date</label>
              <input
                type="date"
                name="effectiveStartDate"
                value={formData.effectiveStartDate}
                onChange={handleChange}
                className={styles.inputField}
              />
            </div>
          </Grid>

          <Grid item xs={12} sm={6}>
            <div className={styles.formGroupLabel}>
              <label>Effective End Date</label>
              <input
                type="date"
                name="effectiveEndDate"
                value={formData.effectiveEndDate}
                onChange={handleChange}
                className={styles.inputField}
              />
            </div>
          </Grid>

          <Grid item xs={12}>
            <div className={styles.formGroupLabel}>
              <label>Billable</label>
              <div className={styles.checkboxGroup}>
                <input
                  type="checkbox"
                  checked={formData.billable}
                  onChange={(e) => onChange({ billable: e.target.checked })}
                  name="billable"
                  className={styles.checkbox}
                />
              </div>
            </div>
          </Grid>
          <Grid item xs={12}>
            <label className={styles.formGroupLabel}>Labels</label>
            <div className={metadataStyles.labelInputWrapper}>
              <input
                type="text"
                id="labelKey"
                placeholder="Key"
                value={labelKey || ''}
                onChange={(e) => setLabelKey(e.target.value)}
                className={metadataStyles.labelKeyInput}
              />
              <input
                type="text"
                id="labelValue"
                placeholder="Value"
                value={labelValue || ''}
                onChange={(e) => setLabelValue(e.target.value)}
                className={metadataStyles.labelValueInput}
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  const key = labelKey.trim();
                  const value = labelValue.trim();
                  if (key && value) {
                    addLabel(key, value);
                    setLabelKey('');
                    setLabelValue('');
                  }
                }}
                disabled={!labelKey || !labelValue}
                className={styles.labelAddButton}
              >
                ✚ 
              </button>
            </div>
            <div className={styles.labelList}>
              {Object.entries(formData.labels || {}).map(([key, value], index) => (
                <div key={index} className={styles.labelItem}>
                  <span className={metadataStyles.labelKey}>{key}</span>
                  <span className={metadataStyles.labelValue}>{value}</span>
                  <button
                    onClick={() => removeLabel(key)}
                    className={styles.labelRemoveButton}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M2 3.99992H14M12.6667 3.99992V13.3333C12.6667 13.9999 12 14.6666 11.3333 14.6666H4.66667C4 14.6666 3.33333 13.9999 3.33333 13.3333V3.99992M5.33333 3.99992V2.66659C5.33333 1.99992 6 1.33325 6.66667 1.33325H9.33333C10 1.33325 10.6667 1.99992 10.6667 2.66659V3.99992M6.66667 7.33325V11.3333M9.33333 7.33325V11.3333" stroke="#E34935" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </Grid>
          

          <Grid item xs={12} sm={6}>
            <div className={styles.formGroupLabel}>
              <label>Linked Rate Plans</label>
              <input
                type="text"
                name="linkedRatePlanIds"
                value={Array.isArray(formData.linkedRatePlans) ? formData.linkedRatePlans.join(', ') : ''}
                onChange={(e) => {
                  const value = e.target.value.trim();
                  const ids = value ? [value] : [];
                  onChange({ linkedRatePlans: ids });
                }}
                placeholder="Enter rate plan name (e.g., sample, app)"
                className={styles.inputField}
              />
            </div>
          </Grid>

          <Grid item xs={12} sm={6}>
            <div className={styles.formGroupLabel}>
              <label>Audit Log ID</label>
              <input
                type="text"
                name="auditLogId"
                value={formData.auditLogId}
                onChange={handleChange}
                placeholder="Enter audit log ID"
                className={styles.inputField}
              />
            </div>
          </Grid>
          

          <Grid item xs={12} className={styles.buttonGroup}>
            <button
              onClick={onBack}
              className={styles.backButton}
            >
              Back
            </button>
            <button
              type="button"
              onClick={onNext}
              className={styles.buttonPrimary}
            >
              Next
            </button>
          </Grid>
        </Grid>
      </div>
    </form>
  );
};

export default ProductMetadata;