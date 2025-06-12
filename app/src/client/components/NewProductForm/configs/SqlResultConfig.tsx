import React from 'react';
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import { ProductFormData } from '../../../../types/productTypes';

interface Props {
  formData: ProductFormData;
  setFormData: (data: Partial<ProductFormData>) => void;
}

const SqlResultConfig: React.FC<Props> = ({ formData, setFormData }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({ [name]: type === 'checkbox' ? checked : value });
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          multiline
          rows={3}
          label="Query Template"
          name="queryTemplate"
          value={formData.queryTemplate || ''}
          onChange={handleInputChange}
        />
      </Grid>

      <Grid item xs={6}>
        <FormControl fullWidth size="small">
          <InputLabel>Database Type</InputLabel>
          <Select
            name="dbType"
            value={formData.dbType || ''}
            onChange={handleSelectChange}
            label="Database Type"
          >
            <MenuItem value="">--Select--</MenuItem>
            <MenuItem value="MYSQL">MySQL</MenuItem>
            <MenuItem value="POSTGRES">Postgres</MenuItem>
            <MenuItem value="SQLSERVER">SQL Server</MenuItem>
            <MenuItem value="ORACLE">Oracle</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={6}>
        <FormControl fullWidth size="small">
          <InputLabel>Freshness</InputLabel>
          <Select
            name="freshness"
            value={formData.freshness || ''}
            onChange={handleSelectChange}
            label="Freshness"
          >
            <MenuItem value="">--Select--</MenuItem>
            <MenuItem value="REALTIME">Real-time</MenuItem>
            <MenuItem value="HOURLY">Hourly</MenuItem>
            <MenuItem value="DAILY">Daily</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={6}>
        <FormControl fullWidth size="small">
          <InputLabel>Execution Frequency</InputLabel>
          <Select
            name="executionFrequency"
            value={formData.executionFrequency || ''}
            onChange={handleSelectChange}
            label="Execution Frequency"
          >
            <MenuItem value="">--Select--</MenuItem>
            <MenuItem value="ON_DEMAND">On Demand</MenuItem>
            <MenuItem value="SCHEDULED">Scheduled</MenuItem>
            <MenuItem value="EVENT_DRIVEN">Event Driven</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={6}>
        <TextField
          fullWidth
          size="small"
          label="Expected Row Range"
          name="expectedRowRange"
          value={formData.expectedRowRange || ''}
          onChange={handleInputChange}
        />
      </Grid>

      <Grid item xs={6}>
        <FormControl fullWidth size="small">
          <InputLabel>Join Complexity</InputLabel>
          <Select
            name="joinComplexity"
            value={formData.joinComplexity || ''}
            onChange={handleSelectChange}
            label="Join Complexity"
          >
            <MenuItem value="">--Select--</MenuItem>
            <MenuItem value="LOW">Low</MenuItem>
            <MenuItem value="MEDIUM">Medium</MenuItem>
            <MenuItem value="HIGH">High</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={6}>
        <TextField
          fullWidth
          size="small"
          label="Result Size"
          name="resultSize"
          value={formData.resultSize || ''}
          onChange={handleInputChange}
        />
      </Grid>

      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              checked={!!formData.cached}
              name="cached"
              onChange={handleInputChange}
            />
          }
          label="Cached Result"
        />
      </Grid>
    </Grid>
  );
};

export default SqlResultConfig;
