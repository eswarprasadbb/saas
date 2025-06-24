import React from 'react';
import styles from './FlatFileConfig.module.css';
import { ProductFormData } from '../../../../types/productTypes';

interface FlatFileConfigProps {
  formData: ProductFormData;
  setFormData: (data: Partial<ProductFormData>) => void;
}

const FlatFileConfig: React.FC<FlatFileConfigProps> = ({ formData, setFormData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };

  const formStyles = {
    container: {
      display: 'flex' as 'flex',
      gap: '2px' as '2px',
      alignItems: 'center' as 'center',
      marginTop: '20px' as '20px'
    },
    field: {
      flex: '0 0 auto' as '0 0 auto',
      width: '206px' as '206px',
      padding: '8px 10px' as '8px 10px',
      marginLeft: '250px' as '250px'
    },
    label: {
      display: 'block' as 'block',
      margin: 0 as 0,
      padding: 0 as 0,
      marginLeft: '255px' as '255px',
      color: '#1E1A20' as '#1E1A20'
    },
    select: {
      width: '206px' as '206px',
      padding: '8px 10px' as '8px 10px'
    }
  };

  // Helper function to convert camelCase to title case
  const toTitleCase = (str: string) => {
    return str
      .split(/(?=[A-Z])/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  return (
    <div className={styles.formGrid}>
      <div className={styles.formGroup}>
        <label className={styles.formGroupLabel} htmlFor="deliveryFrequency">Delivery Frequency</label>
        <select
          id="deliveryFrequency"
          name="deliveryFrequency"
          value={formData.deliveryFrequency || ''}
          onChange={handleChange}
          className={styles.formGroupSelect}
        >
          <option value="">--Select--</option>
          <option value="DAILY">DAILY</option>
          <option value="WEEKLY">WEEKLY</option>
          <option value="MONTHLY">MONTHLY</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formGroupLabel} htmlFor="accessMethod">Access Method</label>
        <select
          id="accessMethod"
          name="accessMethod"
          value={formData.accessMethod || ''}
          onChange={handleChange}
          className={styles.formGroupSelect}
        >
          <option value="">--Select--</option>
          <option value="FTP">FTP</option>
          <option value="S3">S3</option>
          <option value="EMAIL">EMAIL</option>
          <option value="API">API</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formGroupLabel} htmlFor="format">Format</label>
        <select
          id="format"
          name="format"
          value={formData.format || ''}
          onChange={handleChange}
          className={styles.formGroupSelect}
        >
          <option value="">--Select--</option>
          <option value="CSV">CSV</option>
          <option value="JSON">JSON</option>
          <option value="XML">XML</option>
          <option value="PARQUET">PARQUET</option>
        </select>
      </div>

     
      <div className={styles.formGroup}>
            <label className={styles.formGroupLabel} htmlFor="compressionFormat">Compression Format</label>
            <select
              name="compressionFormat"
              value={formData.compression || ''}
              onChange={(e) => {
                const value = e.target.value;
                setFormData({ compression: value });
              }}
              className={styles.formGroupSelect}
            >
              <option value="">Select compression format</option>
              <option value="NONE">None</option>
              <option value="GZIP">GZIP</option>
              <option value="ZIP">ZIP</option>
            </select>
          </div>


      <div className={styles.formGroup}>
        <label className={styles.formGroupLabel} htmlFor="size">Size</label>
        <input
          type="text"
          id="size"
          name="size"
          value={formData.size || ''}
          onChange={handleChange}
          placeholder="e.g., 10MB, 1000 rows"
          className={styles.formGroupInput}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formGroupLabel} htmlFor="retentionPolicy">Retention Policy</label>
        <input
          type="text"
          id="retentionPolicy"
          name="retentionPolicy"
          value={formData.retentionPolicy || ''}
          onChange={handleChange}
          placeholder="e.g., 30 days"
          className={styles.formGroupInput}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formGroupLabel} htmlFor="fileNamingConvention">File Naming Convention</label>
        <input
          type="text"
          id="fileNamingConvention"
          name="fileNamingConvention"
          value={formData.fileNamingConvention || ''}
          onChange={handleChange}
          placeholder="e.g., YYYYMMDD_HHMMSS"
          className={styles.formGroupInput}
        />
      </div>
    </div>
  );
};

export default FlatFileConfig;
