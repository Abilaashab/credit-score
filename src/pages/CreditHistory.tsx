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
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

interface CreditHistoryDetails {
  cibilScore: number;
  pastLoanDefaults: number;
  bankingRelationship: number;
  returnedCheques: number;
  previousLoans: number;
  fullyRepaidLoans: number;
  loanApplications: number;
}

// Create a store to persist form data across pages
const formDataStore = {
  creditHistoryDetails: {} as CreditHistoryDetails,
  setCreditHistoryDetails: (data: CreditHistoryDetails) => {
    formDataStore.creditHistoryDetails = data;
    try {
      localStorage.setItem('creditHistoryDetails', JSON.stringify(data));
    } catch (err) {
      console.error('Unable to persist credit history', err);
    }
  },
  getCreditHistoryDetails: () => {
    if (!Object.keys(formDataStore.creditHistoryDetails).length) {
      try {
        const stored = localStorage.getItem('creditHistoryDetails');
        if (stored) {
          formDataStore.creditHistoryDetails = JSON.parse(stored);
        }
      } catch (err) {
        console.error('Unable to read credit history', err);
      }
    }
    return formDataStore.creditHistoryDetails;
  }
};

const steps = ['Financial Details', 'Credit History', 'Business Details', 'Operational Details', 'Risk & Support Factors'];

const CreditHistory = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { errors }, watch } = useForm<CreditHistoryDetails>({
    defaultValues: formDataStore.getCreditHistoryDetails()
  });

  // Watch values for validation
  const previousLoans = watch('previousLoans');
  const fullyRepaidLoans = watch('fullyRepaidLoans');

  const onSubmit = (data: CreditHistoryDetails) => {
    // Convert all values to numbers and store
    const formattedData = {
      cibilScore: Number(data.cibilScore),
      pastLoanDefaults: Number(data.pastLoanDefaults),
      bankingRelationship: Number(data.bankingRelationship),
      returnedCheques: Number(data.returnedCheques),
      previousLoans: Number(data.previousLoans),
      fullyRepaidLoans: Number(data.fullyRepaidLoans),
      loanApplications: Number(data.loanApplications),
    };
    formDataStore.setCreditHistoryDetails(formattedData);
    console.log('Stored credit history data:', formattedData);
    navigate('/business-stability');
  };

  const getErrorMessage = (error: any): string => {
    return error?.message?.toString() || '';
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Credit History
        </Typography>
        <Paper sx={{ p: 4, mt: 4 }}>
          <Stepper activeStep={1} sx={{ mb: 4 }}>
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
                  name="cibilScore"
                  control={control}
                  rules={{ 
                    required: 'CIBIL Score is required',
                    min: { value: 300, message: 'CIBIL Score must be between 300 and 900' },
                    max: { value: 900, message: 'CIBIL Score must be between 300 and 900' }
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="CIBIL Score"
                      type="number"
                      fullWidth
                      required
                      error={!!errors.cibilScore}
                      helperText={getErrorMessage(errors.cibilScore)}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="pastLoanDefaults"
                  control={control}
                  rules={{ 
                    required: 'Number of past loan defaults is required',
                    min: { value: 0, message: 'Cannot be negative' }
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Number of Past Loan Defaults"
                      type="number"
                      fullWidth
                      required
                      error={!!errors.pastLoanDefaults}
                      helperText={getErrorMessage(errors.pastLoanDefaults)}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="bankingRelationship"
                  control={control}
                  rules={{ 
                    required: 'Banking relationship duration is required',
                    min: { value: 0, message: 'Cannot be negative' }
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Banking Relationship (in years)"
                      type="number"
                      fullWidth
                      required
                      error={!!errors.bankingRelationship}
                      helperText={getErrorMessage(errors.bankingRelationship)}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="returnedCheques"
                  control={control}
                  rules={{ 
                    required: 'Number of returned cheques is required',
                    min: { value: 0, message: 'Cannot be negative' }
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Number of Returned Cheques in Last Year"
                      type="number"
                      fullWidth
                      required
                      error={!!errors.returnedCheques}
                      helperText={getErrorMessage(errors.returnedCheques)}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="previousLoans"
                  control={control}
                  rules={{ 
                    required: 'Number of previous loans is required',
                    min: { value: 0, message: 'Cannot be negative' }
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Number of Previous Loans"
                      type="number"
                      fullWidth
                      required
                      error={!!errors.previousLoans}
                      helperText={getErrorMessage(errors.previousLoans)}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="fullyRepaidLoans"
                  control={control}
                  rules={{ 
                    required: 'Number of fully repaid loans is required',
                    min: { value: 0, message: 'Cannot be negative' },
                    validate: (value) => 
                      Number(value) <= Number(previousLoans) || 
                      'Cannot be more than total previous loans'
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Number of Fully Repaid Previous Loans"
                      type="number"
                      fullWidth
                      required
                      error={!!errors.fullyRepaidLoans}
                      helperText={getErrorMessage(errors.fullyRepaidLoans)}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="loanApplications"
                  control={control}
                  rules={{ 
                    required: 'Number of loan applications is required',
                    min: { value: 0, message: 'Cannot be negative' }
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Number of Loan Applications in Last Year"
                      type="number"
                      fullWidth
                      required
                      error={!!errors.loanApplications}
                      helperText={getErrorMessage(errors.loanApplications)}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                onClick={() => navigate('/store-details')}
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

export default CreditHistory;
export { formDataStore as creditHistoryStore }; 