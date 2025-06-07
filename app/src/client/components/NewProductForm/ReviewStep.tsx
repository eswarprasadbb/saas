import React from 'react';
import { ProductFormData } from '../../../types/productTypes';
import { Grid, Typography, Button, List, ListItem, ListItemText, Divider } from '@mui/material';

interface ReviewStepProps {
  formData: ProductFormData;
  onBack: () => void;
  onSubmit: () => void;
}

const ReviewStep: React.FC<ReviewStepProps> = ({ formData, onBack, onSubmit }) => {
  const renderItem = (label: string, value?: any) => (
    <ListItem>
      <ListItemText
        primary={<strong>{label}</strong>}
        secondary={value || 'N/A'}
      />
    </ListItem>
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Review Product Details
        </Typography>
        <List dense>
          {renderItem('Product Name', formData.productName)}
          {renderItem('Product Type', formData.productType)}
          {renderItem('Version', formData.version)}
          {renderItem('Description', formData.description)}
          {renderItem('Category', formData.category)}
          {renderItem('Visibility', formData.visibility ? 'Yes' : 'No')}
          {renderItem('Status', formData.status)}
          {renderItem('Internal SKU Code', formData.internalSkuCode)}
          {renderItem('Unit of Measure', formData.uom)}
          {renderItem('Effective Start Date', formData.effectiveStartDate)}
          {renderItem('Effective End Date', formData.effectiveEndDate)}
          {renderItem('Billable', formData.billable ? 'Yes' : 'No')}
          {renderItem('Linked Rate Plans', formData.linkedRatePlans?.join(', '))}
        </List>
        <Divider style={{ margin: '1rem 0' }} />
        <Typography variant="h6" gutterBottom>
          Type-Specific Configuration
        </Typography>
        <List dense>
          {formData.productType === 'API' && (
            <>
              {renderItem('Endpoint URL', formData.endpointUrl)}
              {renderItem('Auth Type', formData.authType)}
              {renderItem('Payload Metric', formData.payloadMetric)}
              {renderItem('Rate Limit Policy', formData.rateLimitPolicy)}
              {renderItem('Granularity', formData.granularity)}
              {renderItem('Grouping', formData.grouping)}
              {renderItem('Latency Class', formData.latencyClass)}
              {renderItem('Caching Enabled', formData.caching ? 'Yes' : 'No')}
            </>
          )}
          {formData.productType === 'FlatFile' && (
            <>
              {renderItem('Format', formData.format)}
              {renderItem('Compression', formData.compression)}
              {renderItem('Encoding', formData.encoding)}
              {renderItem('Schema', formData.schema)}
              {renderItem('Delivery Frequency', formData.deliveryFrequency)}
              {renderItem('Access Method', formData.accessMethod)}
              {renderItem('Retention Policy', formData.retentionPolicy)}
              {renderItem('File Naming Convention', formData.fileNamingConvention)}
            </>
          )}
          {formData.productType === 'SQLResult' && (
            <>
              {renderItem('Query Template', formData.queryTemplate)}
              {renderItem('Database Type', formData.dbType)}
              {renderItem('Freshness', formData.freshness)}
              {renderItem('Execution Frequency', formData.executionFrequency)}
              {renderItem('Expected Row Range', formData.expectedRowRange)}
              {renderItem('Join Complexity', formData.joinComplexity)}
              {renderItem('Result Size', formData.resultSize)}
              {renderItem('Cached', formData.cached ? 'Yes' : 'No')}
            </>
          )}
          {formData.productType === 'LLMToken' && (
            <>
              {renderItem('Token Provider', formData.tokenProvider)}
              {renderItem('Model Name', formData.modelName)}
              {renderItem('Token Unit Cost', formData.tokenUnitCost)}
              {renderItem('Calculation Method', formData.calculationMethod)}
              {renderItem('Quota', formData.quota)}
              {renderItem('Prompt Template', formData.promptTemplate)}
              {renderItem('Inference Priority', formData.inferencePriority)}
              {renderItem('Compute Tier', formData.computeTier)}
            </>
          )}
        </List>
      </Grid>

      <Grid item xs={6}>
        <Button variant="outlined" onClick={onBack}>
          Back
        </Button>
      </Grid>
      <Grid item xs={6} style={{ textAlign: 'right' }}>
        <Button variant="contained" color="primary" onClick={onSubmit}>
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};

export default ReviewStep;
