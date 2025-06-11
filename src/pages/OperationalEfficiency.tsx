import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  Paper,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

const steps = ['Financial Details', 'Credit History', 'Business Details', 'Operational Details', 'Risk & Support Factors'];

interface OperationalEfficiencyForm {
  digitalPaymentsAdoption: number;
  inventoryTurnover: 'weekly' | 'monthly' | 'quarterly' | 'slower';
  seasonalImpact: 'none' | 'low' | 'medium' | 'high';
  averageMonthlyFootfall: number;
  shopTimings: number;
  onlinePresence: {
    socialMedia: boolean;
    website: boolean;
    ecommerce: boolean;
  };
}

// Store for persisting form data
const formDataStore = {
  operationalEfficiencyDetails: {} as OperationalEfficiencyForm,
  setOperationalEfficiencyDetails: (data: OperationalEfficiencyForm) => {
    formDataStore.operationalEfficiencyDetails = data;
  },
  getOperationalEfficiencyDetails: () => {
    return formDataStore.operationalEfficiencyDetails;
  }
};

const OperationalEfficiency = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { errors } } = useForm<OperationalEfficiencyForm>({
    defaultValues: {
      digitalPaymentsAdoption: formDataStore.getOperationalEfficiencyDetails().digitalPaymentsAdoption || 0,
      inventoryTurnover: formDataStore.getOperationalEfficiencyDetails().inventoryTurnover || 'monthly',
      seasonalImpact: formDataStore.getOperationalEfficiencyDetails().seasonalImpact || 'none',
      averageMonthlyFootfall: formDataStore.getOperationalEfficiencyDetails().averageMonthlyFootfall || 0,
      shopTimings: formDataStore.getOperationalEfficiencyDetails().shopTimings || 0,
      onlinePresence: formDataStore.getOperationalEfficiencyDetails().onlinePresence || {
        socialMedia: false,
        website: false,
        ecommerce: false,
      },
    },
  });

  const onSubmit = (data: OperationalEfficiencyForm) => {
    // Convert numeric values and store
    const formattedData = {
      ...data,
      digitalPaymentsAdoption: Number(data.digitalPaymentsAdoption),
      averageMonthlyFootfall: Number(data.averageMonthlyFootfall),
      shopTimings: Number(data.shopTimings),
    };
    formDataStore.setOperationalEfficiencyDetails(formattedData);
    console.log('Stored operational efficiency data:', formattedData);
    navigate('/risk-and-support-factors');
  };

  const getErrorMessage = (error: any): string => error?.message?.toString() || '';

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Operational Efficiency
        </Typography>
        <Paper sx={{ p: 4, mt: 4 }}>
          <Stepper activeStep={3} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Controller
                  name="digitalPaymentsAdoption"
                  control={control}
                  rules={{ 
                    required: 'Digital Payments Adoption is required',
                    min: { value: 0, message: 'Percentage cannot be negative' },
                    max: { value: 100, message: 'Percentage cannot exceed 100%' }
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Digital Payments Adoption (%)"
                      type="number"
                      fullWidth
                      required
                      error={!!errors.digitalPaymentsAdoption}
                      helperText={getErrorMessage(errors.digitalPaymentsAdoption)}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required error={!!errors.inventoryTurnover}>
                  <InputLabel>Inventory Turnover Frequency</InputLabel>
                  <Controller
                    name="inventoryTurnover"
                    control={control}
                    rules={{ required: 'Inventory Turnover Frequency is required' }}
                    render={({ field }) => (
                      <Select {...field} label="Inventory Turnover Frequency">
                        <MenuItem value="weekly">Weekly</MenuItem>
                        <MenuItem value="monthly">Monthly</MenuItem>
                        <MenuItem value="quarterly">Quarterly</MenuItem>
                        <MenuItem value="slower">Slower</MenuItem>
                      </Select>
                    )}
                  />
                  {errors.inventoryTurnover && (
                    <Typography color="error" variant="caption">
                      {getErrorMessage(errors.inventoryTurnover)}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required error={!!errors.seasonalImpact}>
                  <InputLabel>Seasonal Impact</InputLabel>
                  <Controller
                    name="seasonalImpact"
                    control={control}
                    rules={{ required: 'Seasonal Impact is required' }}
                    render={({ field }) => (
                      <Select {...field} label="Seasonal Impact">
                        <MenuItem value="none">None</MenuItem>
                        <MenuItem value="low">Low</MenuItem>
                        <MenuItem value="medium">Medium</MenuItem>
                        <MenuItem value="high">High</MenuItem>
                      </Select>
                    )}
                  />
                  {errors.seasonalImpact && (
                    <Typography color="error" variant="caption">
                      {getErrorMessage(errors.seasonalImpact)}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="averageMonthlyFootfall"
                  control={control}
                  rules={{ 
                    required: 'Average Monthly Footfall is required',
                    min: { value: 0, message: 'Footfall cannot be negative' },
                    validate: (value) => Number.isInteger(Number(value)) || 'Must be a whole number'
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Average Monthly Footfall"
                      type="number"
                      fullWidth
                      required
                      error={!!errors.averageMonthlyFootfall}
                      helperText={getErrorMessage(errors.averageMonthlyFootfall)}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="shopTimings"
                  control={control}
                  rules={{ 
                    required: 'Shop Timings is required',
                    min: { value: 0, message: 'Hours cannot be negative' },
                    max: { value: 24, message: 'Hours cannot exceed 24' }
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Shop Timings (hours per day)"
                      type="number"
                      fullWidth
                      required
                      error={!!errors.shopTimings}
                      helperText={getErrorMessage(errors.shopTimings)}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <Typography variant="subtitle1" gutterBottom>
                    Online Presence (Select all that apply):
                  </Typography>
                  <Controller
                    name="onlinePresence"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <FormGroup row>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={value.socialMedia}
                              onChange={(_, checked) => onChange({ ...value, socialMedia: checked })}
                            />
                          }
                          label="Social Media Presence"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={value.website}
                              onChange={(_, checked) => onChange({ ...value, website: checked })}
                            />
                          }
                          label="Website"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={value.ecommerce}
                              onChange={(_, checked) => onChange({ ...value, ecommerce: checked })}
                            />
                          }
                          label="Listed on E-commerce Platforms"
                        />
                      </FormGroup>
                    )}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                onClick={() => navigate('/business-stability')}
                variant="outlined"
              >
                Back
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
              >
                Next
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default OperationalEfficiency;
export { formDataStore as operationalStore } 