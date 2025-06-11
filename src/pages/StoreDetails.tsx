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
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Grid,
  Slider,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

const steps = ['Financial Details', 'Credit History', 'Business Details', 'Operational Details', 'Risk & Support Factors'];

interface FinancialDetails {
  storeName: string;
  monthlySales: number;
  profitMargin: number;
  monthlyEMI: number;
  averageBankBalance: number;
  buildingOwnership: 'own' | 'rent';
  itrFiled: boolean;
}

// Create a store to persist form data across pages
const formDataStore = {
  financialDetails: {} as FinancialDetails,
  setFinancialDetails: (data: FinancialDetails) => {
    formDataStore.financialDetails = data;
    try {
      localStorage.setItem('financialDetails', JSON.stringify(data));
    } catch (err) {
      console.error('Unable to persist financial details', err);
    }
  },
  getFinancialDetails: () => {
    if (!Object.keys(formDataStore.financialDetails).length) {
      try {
        const stored = localStorage.getItem('financialDetails');
        if (stored) {
          formDataStore.financialDetails = JSON.parse(stored);
        }
      } catch (err) {
        console.error('Unable to read financial details', err);
      }
    }
    return formDataStore.financialDetails;
  }
};

const StoreDetails = () => {
  const navigate = useNavigate();
  
  // Get stored values or use defaults
  const storedValues = formDataStore.getFinancialDetails();
  
  // Initialize form with default values
  const defaultValues: FinancialDetails = {
    storeName: storedValues.storeName || '',
    monthlySales: storedValues.monthlySales || 0,
    profitMargin: storedValues.profitMargin || 0,
    monthlyEMI: storedValues.monthlyEMI || 0,
    averageBankBalance: storedValues.averageBankBalance || 0,
    buildingOwnership: storedValues.buildingOwnership || 'rent',
    itrFiled: storedValues.itrFiled === undefined ? false : storedValues.itrFiled
  };

  const { control, handleSubmit, formState: { errors } } = useForm<FinancialDetails>({
    defaultValues,
    mode: 'onChange'
  });

  const onSubmit = (data: FinancialDetails) => {
    // Store the form data
    formDataStore.setFinancialDetails({
      ...data,
      monthlySales: Number(data.monthlySales),
      profitMargin: Number(data.profitMargin),
      monthlyEMI: Number(data.monthlyEMI),
      averageBankBalance: Number(data.averageBankBalance),
      itrFiled: data.itrFiled === true
    });
    console.log('Stored financial details:', formDataStore.getFinancialDetails());
    navigate('/credit-history');
  };

  const getErrorMessage = (error: any): string => {
    return error?.message?.toString() || '';
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Store Details
        </Typography>
        <Paper sx={{ p: 4, mt: 4 }}>
          <Stepper activeStep={0} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Controller
                  name="storeName"
                  control={control}
                  rules={{ 
                    required: 'Store name is required',
                    minLength: { value: 2, message: 'Store name must be at least 2 characters' }
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Store Name"
                      fullWidth
                      required
                      error={!!errors.storeName}
                      helperText={getErrorMessage(errors.storeName)}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="monthlySales"
                  control={control}
                  rules={{ 
                    required: 'Monthly sales is required',
                    min: { value: 0, message: 'Monthly sales cannot be negative' }
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Monthly Sales (₹)"
                      type="number"
                      fullWidth
                      required
                      error={!!errors.monthlySales}
                      helperText={getErrorMessage(errors.monthlySales)}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="profitMargin"
                  control={control}
                  rules={{ 
                    required: 'Profit margin is required',
                    min: { value: 0, message: 'Profit margin cannot be negative' },
                    max: { value: 100, message: 'Profit margin cannot exceed 100%' }
                  }}
                  render={({ field }) => (
                    <Box>
                      <Typography gutterBottom>
                        Profit Margin: {field.value}%
                      </Typography>
                      <Slider
                        {...field}
                        valueLabelDisplay="auto"
                        step={1}
                        marks
                        min={0}
                        max={100}
                        valueLabelFormat={(value) => `${value}%`}
                        sx={{ mt: 2 }}
                      />
                    </Box>
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="monthlyEMI"
                  control={control}
                  rules={{ 
                    required: 'Monthly EMI is required',
                    min: { value: 0, message: 'Monthly EMI cannot be negative' }
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Monthly EMI (₹)"
                      type="number"
                      fullWidth
                      required
                      error={!!errors.monthlyEMI}
                      helperText={getErrorMessage(errors.monthlyEMI)}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="averageBankBalance"
                  control={control}
                  rules={{ 
                    required: 'Average bank balance is required',
                    min: { value: 0, message: 'Average bank balance cannot be negative' }
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Average Bank Balance (₹)"
                      type="number"
                      fullWidth
                      required
                      error={!!errors.averageBankBalance}
                      helperText={getErrorMessage(errors.averageBankBalance)}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl component="fieldset" required error={!!errors.buildingOwnership}>
                  <Typography variant="subtitle1" gutterBottom>
                    Building Ownership
                  </Typography>
                  <Controller
                    name="buildingOwnership"
                    control={control}
                    defaultValue="rent"
                    rules={{ required: 'Building ownership is required' }}
                    render={({ field }) => (
                      <RadioGroup {...field}>
                        <FormControlLabel value="own" control={<Radio />} label="Own" />
                        <FormControlLabel value="rent" control={<Radio />} label="Rent" />
                      </RadioGroup>
                    )}
                  />
                  {errors.buildingOwnership && (
                    <Typography color="error" variant="caption">
                      {getErrorMessage(errors.buildingOwnership)}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl component="fieldset" required error={!!errors.itrFiled}>
                  <Typography variant="subtitle1" gutterBottom>
                    ITR Filed
                  </Typography>
                  <Controller
                    name="itrFiled"
                    control={control}
                    defaultValue={false}
                    rules={{ 
                      validate: v => v === true || v === false ? true : 'ITR filing information is required'
                    }}
                    render={({ field: { onChange, value, ...field } }) => (
                      <RadioGroup 
                        {...field}
                        value={value === true ? 'yes' : 'no'}
                        onChange={(e) => {
                          const newValue = e.target.value === 'yes';
                          onChange(newValue);
                        }}
                      >
                        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="no" control={<Radio />} label="No" />
                      </RadioGroup>
                    )}
                  />
                  {errors.itrFiled && (
                    <Typography color="error" variant="caption">
                      {getErrorMessage(errors.itrFiled)}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Next
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export { formDataStore as financialStore }
export default StoreDetails; 