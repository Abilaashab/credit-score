import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Paper,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

interface FinancialScoreForm {
  monthlySales: number;
  profitMargin: number;
  monthlyEMI: number;
  averageBankBalance: number;
  buildingOwnership: 'own' | 'rent';
  collateralProvided: boolean;
  itrFiled: boolean;
}

const FinancialScore = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<FinancialScoreForm>();

  const onSubmit = (data: FinancialScoreForm) => {
    console.log(data);
    // Here we'll implement the score calculation
  };

  const getErrorMessage = (error: any): string => {
    return error?.message?.toString() || '';
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Financial Score (35%)
        </Typography>
        <Paper sx={{ p: 4, mt: 4 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Controller
                  name="monthlySales"
                  control={control}
                  defaultValue={0}
                  rules={{ required: 'Monthly sales is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Monthly Sales"
                      type="number"
                      fullWidth
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
                  defaultValue={0}
                  rules={{ required: 'Profit margin is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Profit Margin (%)"
                      type="number"
                      fullWidth
                      error={!!errors.profitMargin}
                      helperText={getErrorMessage(errors.profitMargin)}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="monthlyEMI"
                  control={control}
                  defaultValue={0}
                  rules={{ required: 'Monthly EMI is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Monthly EMI"
                      type="number"
                      fullWidth
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
                  defaultValue={0}
                  rules={{ required: 'Average bank balance is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Average Bank Balance"
                      type="number"
                      fullWidth
                      error={!!errors.averageBankBalance}
                      helperText={getErrorMessage(errors.averageBankBalance)}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl component="fieldset">
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
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <Typography variant="subtitle1" gutterBottom>
                    Collateral Provided
                  </Typography>
                  <Controller
                    name="collateralProvided"
                    control={control}
                    defaultValue={false}
                    rules={{ required: 'Collateral information is required' }}
                    render={({ field }) => (
                      <RadioGroup {...field} value={field.value ? 'yes' : 'no'}>
                        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="no" control={<Radio />} label="No" />
                      </RadioGroup>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <Typography variant="subtitle1" gutterBottom>
                    ITR Filed
                  </Typography>
                  <Controller
                    name="itrFiled"
                    control={control}
                    defaultValue={false}
                    rules={{ required: 'ITR filing information is required' }}
                    render={({ field }) => (
                      <RadioGroup {...field} value={field.value ? 'yes' : 'no'}>
                        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="no" control={<Radio />} label="No" />
                      </RadioGroup>
                    )}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default FinancialScore; 