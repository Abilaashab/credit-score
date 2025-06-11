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
  MenuItem,
  Select,
  InputLabel,
  Alert,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

interface RiskAndSupportFactorsForm {
  industryType: 'grocery' | 'pharmacy' | 'electronics' | 'clothing' | 'restaurant' | 'other';
  purposeOfLoan: 'growth' | 'stock' | 'refinance';
  distributorPaymentRegularity: boolean;
  collateralProvided: boolean;
  collateralType?: 'jewel' | 'property';
  collateralValue?: number;
  loanAmountRequested: number;
}

// Store for persisting form data
const formDataStore = {
  riskAndSupportFactorsDetails: {} as RiskAndSupportFactorsForm,
  setRiskAndSupportFactorsDetails: (data: RiskAndSupportFactorsForm) => {
    formDataStore.riskAndSupportFactorsDetails = data;
  },
  getRiskAndSupportFactorsDetails: () => {
    return formDataStore.riskAndSupportFactorsDetails;
  }
};

const steps = ['Financial Details', 'Credit History', 'Business Details', 'Operational Details', 'Risk & Support Factors'];

const RiskAndSupportFactors = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { errors }, watch } = useForm<RiskAndSupportFactorsForm>({
    defaultValues: {
      industryType: formDataStore.getRiskAndSupportFactorsDetails().industryType || 'grocery',
      purposeOfLoan: formDataStore.getRiskAndSupportFactorsDetails().purposeOfLoan || 'growth',
      distributorPaymentRegularity: formDataStore.getRiskAndSupportFactorsDetails().distributorPaymentRegularity ?? false,
      collateralProvided: formDataStore.getRiskAndSupportFactorsDetails().collateralProvided ?? false,
      collateralType: formDataStore.getRiskAndSupportFactorsDetails().collateralType,
      collateralValue: formDataStore.getRiskAndSupportFactorsDetails().collateralValue,
      loanAmountRequested: formDataStore.getRiskAndSupportFactorsDetails().loanAmountRequested || 0,
    },
  });

  const collateralProvided = watch('collateralProvided');

  const onSubmit = (data: RiskAndSupportFactorsForm) => {
    // Convert numeric values and store
    const formattedData = {
      ...data,
      collateralValue: data.collateralValue ? Number(data.collateralValue) : undefined,
      loanAmountRequested: Number(data.loanAmountRequested),
      distributorPaymentRegularity: data.distributorPaymentRegularity === true,
      collateralProvided: data.collateralProvided === true,
    };
    formDataStore.setRiskAndSupportFactorsDetails(formattedData);
    console.log('Stored risk and support factors data:', formattedData);
    navigate('/credit-report');
  };

  const getErrorMessage = (error: any): string => error?.message?.toString() || '';

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Risk & Support Factors
        </Typography>
        <Paper sx={{ p: 4, mt: 4 }}>
          <Stepper activeStep={4} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth required error={!!errors.industryType}>
                  <InputLabel>Industry Type</InputLabel>
                  <Controller
                    name="industryType"
                    control={control}
                    rules={{ required: 'Industry type is required' }}
                    render={({ field }) => (
                      <Select {...field} label="Industry Type">
                        <MenuItem value="grocery">Grocery/Kirana</MenuItem>
                        <MenuItem value="pharmacy">Pharmacy</MenuItem>
                        <MenuItem value="electronics">Electronics</MenuItem>
                        <MenuItem value="clothing">Clothing/Fashion</MenuItem>
                        <MenuItem value="restaurant">Restaurant</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                      </Select>
                    )}
                  />
                  {errors.industryType && (
                    <Typography color="error" variant="caption">
                      {getErrorMessage(errors.industryType)}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl component="fieldset" required error={!!errors.purposeOfLoan}>
                  <Typography variant="subtitle1" gutterBottom>
                    Purpose of Loan
                  </Typography>
                  <Controller
                    name="purposeOfLoan"
                    control={control}
                    rules={{ required: 'Purpose of loan is required' }}
                    render={({ field }) => (
                      <RadioGroup {...field} row>
                        <FormControlLabel value="growth" control={<Radio />} label="Growth/Expansion" />
                        <FormControlLabel value="stock" control={<Radio />} label="Stock Purchase" />
                        <FormControlLabel value="refinance" control={<Radio />} label="Debt Refinance" />
                      </RadioGroup>
                    )}
                  />
                  {errors.purposeOfLoan && (
                    <Typography color="error" variant="caption">
                      {getErrorMessage(errors.purposeOfLoan)}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl component="fieldset" required error={!!errors.distributorPaymentRegularity}>
                  <Typography variant="subtitle1" gutterBottom>
                    Distributor Payment Regularity
                  </Typography>
                  <Controller
                    name="distributorPaymentRegularity"
                    control={control}
                    rules={{
                      validate: v => v === true || v === false ? true : 'Distributor payment regularity is required'
                    }}
                    render={({ field: { value, onChange, ...field } }) => (
                      <RadioGroup 
                        {...field}
                        value={value ? 'yes' : 'no'}
                        onChange={(e) => onChange(e.target.value === 'yes')}
                      >
                        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="no" control={<Radio />} label="No" />
                      </RadioGroup>
                    )}
                  />
                  {errors.distributorPaymentRegularity && (
                    <Typography color="error" variant="caption">
                      {getErrorMessage(errors.distributorPaymentRegularity)}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl component="fieldset" required error={!!errors.collateralProvided}>
                  <Typography variant="subtitle1" gutterBottom>
                    Collateral Provided
                  </Typography>
                  <Controller
                    name="collateralProvided"
                    control={control}
                    rules={{
                      validate: v => v === true || v === false ? true : 'Collateral information is required'
                    }}
                    render={({ field: { value, onChange, ...field } }) => (
                      <RadioGroup 
                        {...field}
                        value={value ? 'yes' : 'no'}
                        onChange={(e) => onChange(e.target.value === 'yes')}
                      >
                        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="no" control={<Radio />} label="No" />
                      </RadioGroup>
                    )}
                  />
                  {errors.collateralProvided && (
                    <Typography color="error" variant="caption">
                      {getErrorMessage(errors.collateralProvided)}
                    </Typography>
                  )}
                </FormControl>

                {collateralProvided && (
                  <Box sx={{ pl: 4, mt: 2 }}>
                    <Alert severity="info" sx={{ mb: 2 }}>
                      Note: Only Jewel and Property are accepted as collateral.
                    </Alert>
                    <FormControl component="fieldset" fullWidth required error={!!errors.collateralType}>
                      <Typography variant="subtitle1" gutterBottom>
                        Type of Collateral
                      </Typography>
                      <Controller
                        name="collateralType"
                        control={control}
                        rules={{ required: 'Collateral type is required' }}
                        render={({ field }) => (
                          <RadioGroup {...field}>
                            <FormControlLabel value="jewel" control={<Radio />} label="Jewel" />
                            <FormControlLabel value="property" control={<Radio />} label="Property" />
                          </RadioGroup>
                        )}
                      />
                      {errors.collateralType && (
                        <Typography color="error" variant="caption">
                          {getErrorMessage(errors.collateralType)}
                        </Typography>
                      )}
                    </FormControl>
                    <Box sx={{ mt: 2 }}>
                      <Controller
                        name="collateralValue"
                        control={control}
                        rules={{ 
                          required: 'Market value of collateral is required',
                          min: { value: 0, message: 'Value cannot be negative' }
                        }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Market Value of the Collateral (₹)"
                            type="number"
                            fullWidth
                            required
                            error={!!errors.collateralValue}
                            helperText={getErrorMessage(errors.collateralValue)}
                          />
                        )}
                      />
                    </Box>
                  </Box>
                )}
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="loanAmountRequested"
                  control={control}
                  rules={{ 
                    required: 'Loan amount is required',
                    min: { value: 0, message: 'Loan amount cannot be negative' },
                    max: { 
                      value: 10000000, 
                      message: 'Loan amount cannot exceed ₹1 Crore' 
                    }
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Loan Amount Requested (₹)"
                      type="number"
                      fullWidth
                      required
                      error={!!errors.loanAmountRequested}
                      helperText={getErrorMessage(errors.loanAmountRequested)}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                onClick={() => navigate('/operational-efficiency')}
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

export { formDataStore as riskSupportStore }
export default RiskAndSupportFactors; 