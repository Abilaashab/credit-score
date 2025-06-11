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
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

interface BusinessStabilityDetails {
  yearsInOperation: number;
  annualRevenue: number;
  numberOfEmployees: number;
  shopSize: number;
  numberOfBranches: number;
  sellsPrivateLabel: boolean;
}

// Store for persisting form data
const formDataStore = {
  businessStabilityDetails: {} as BusinessStabilityDetails,
  setBusinessStabilityDetails: (data: BusinessStabilityDetails) => {
    formDataStore.businessStabilityDetails = data;
  },
  getBusinessStabilityDetails: () => {
    return formDataStore.businessStabilityDetails;
  }
};

const steps = ['Financial Details', 'Credit History', 'Business Details', 'Operational Details', 'Risk & Support Factors'];

const BusinessStability = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { errors } } = useForm<BusinessStabilityDetails>({
    defaultValues: formDataStore.getBusinessStabilityDetails()
  });

  const onSubmit = (data: BusinessStabilityDetails) => {
    // Convert all values to numbers and store
    const formattedData = {
      ...data,
      yearsInOperation: Number(data.yearsInOperation),
      annualRevenue: Number(data.annualRevenue),
      numberOfEmployees: Number(data.numberOfEmployees),
      shopSize: Number(data.shopSize),
      numberOfBranches: Number(data.numberOfBranches),
    };
    formDataStore.setBusinessStabilityDetails(formattedData);
    console.log('Stored business stability data:', formattedData);
    navigate('/operational-efficiency');
  };

  const getErrorMessage = (error: any): string => {
    return error?.message?.toString() || '';
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Business Stability
        </Typography>
        <Paper sx={{ p: 4, mt: 4 }}>
          <Stepper activeStep={2} sx={{ mb: 4 }}>
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
                  name="yearsInOperation"
                  control={control}
                  rules={{ 
                    required: 'Years in operation is required',
                    min: { value: 0, message: 'Years cannot be negative' },
                    max: { value: 100, message: 'Please enter a valid number of years' }
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Years in Operation"
                      type="number"
                      fullWidth
                      required
                      error={!!errors.yearsInOperation}
                      helperText={getErrorMessage(errors.yearsInOperation)}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="annualRevenue"
                  control={control}
                  rules={{ 
                    required: 'Annual revenue is required',
                    min: { value: 0, message: 'Revenue cannot be negative' }
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Annual Revenue (₹)"
                      type="number"
                      fullWidth
                      required
                      error={!!errors.annualRevenue}
                      helperText={getErrorMessage(errors.annualRevenue)}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="numberOfEmployees"
                  control={control}
                  rules={{ 
                    required: 'Number of employees is required',
                    min: { value: 0, message: 'Number of employees cannot be negative' },
                    validate: (value) => Number.isInteger(Number(value)) || 'Must be a whole number'
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Number of Employees"
                      type="number"
                      fullWidth
                      required
                      error={!!errors.numberOfEmployees}
                      helperText={getErrorMessage(errors.numberOfEmployees)}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="shopSize"
                  control={control}
                  rules={{ 
                    required: 'Shop size is required',
                    min: { value: 0, message: 'Shop size cannot be negative' }
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Shop Size (in sq.ft.)"
                      type="number"
                      fullWidth
                      required
                      error={!!errors.shopSize}
                      helperText={getErrorMessage(errors.shopSize)}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="numberOfBranches"
                  control={control}
                  rules={{ 
                    required: 'Number of branches is required',
                    min: { value: 0, message: 'Number of branches cannot be negative' },
                    validate: (value) => Number.isInteger(Number(value)) || 'Must be a whole number'
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Number of Branches"
                      type="number"
                      fullWidth
                      required
                      error={!!errors.numberOfBranches}
                      helperText={getErrorMessage(errors.numberOfBranches)}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl component="fieldset" required error={!!errors.sellsPrivateLabel}>
                  <Typography variant="subtitle1" gutterBottom>
                    Sells Private Label Products?
                  </Typography>
                  <Controller
                    name="sellsPrivateLabel"
                    control={control}
                    rules={{
                      validate: v => v === true || v === false ? true : 'This field is required'
                    }}
                    render={({ field: { onChange, value } }) => (
                      <RadioGroup
                        value={value === true ? 'yes' : value === false ? 'no' : ''}
                        onChange={(e) => onChange(e.target.value === 'yes')}
                      >
                        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="no" control={<Radio />} label="No" />
                      </RadioGroup>
                    )}
                  />
                  {errors.sellsPrivateLabel && (
                    <Typography color="error" variant="caption">
                      {getErrorMessage(errors.sellsPrivateLabel)}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                onClick={() => navigate('/credit-history')}
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

export { formDataStore as businessStabilityStore }
export default BusinessStability; 